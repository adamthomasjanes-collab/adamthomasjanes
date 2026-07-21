"""Audit and optimize the portfolio's runtime image assets.

Run from the repository root with the bundled/installed Python environment:
    python tools/asset_health.py
    python tools/asset_health.py --optimize

The optimizer never inflates an already-small image. It converts JPEGs to WebP,
keeps the highest practical WebP quality below each delivery ceiling, and only
downscales when compression alone cannot meet that ceiling.
"""

from __future__ import annotations

import argparse
import io
import re
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
RUNTIME_FILES = (ROOT / "index.html", ROOT / "script.js", ROOT / "styles.css", ROOT / "404.html")
ASSET_RE = re.compile(r"(?:https://adamthomasjanes\.com/)?assets/[A-Za-z0-9_./()'\-]+", re.IGNORECASE)

CATEGORY_LIMITS_KB = {
    "thumbnail": (40, 80),
    "gallery": (180, 300),
    "feature cover": (150, 250),
    "center spread": (250, 450),
}


def category(path: Path) -> str | None:
    relative = path.relative_to(ASSETS).as_posix().lower()
    if path.suffix.lower() not in {".webp", ".jpg", ".jpeg"}:
        return None
    if "/thumbs/" in f"/{relative}" or relative.startswith("portfolio-print-"):
        return "thumbnail"
    if relative.startswith("features/"):
        return "feature cover"
    if "center-spreads" in relative or ("/archive/" in f"/{relative}" and "-pages-" in relative):
        return "center spread"
    if relative == "adam-thomas-janes-headshot.webp":
        return "thumbnail"
    return "gallery"


def runtime_references() -> set[str]:
    references: set[str] = set()
    for source in RUNTIME_FILES:
        text = source.read_text(encoding="utf-8")
        # Disabled legacy galleries are useful as source notes, but their asset
        # strings must not make superseded files appear active.
        text = re.sub(r"/\*.*?\*/", "", text, flags=re.DOTALL)
        text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)
        for match in ASSET_RE.findall(text):
            item = match
            if item.lower().startswith("https://adamthomasjanes.com/"):
                item = item.split(".com/", 1)[1]
            references.add(item.rstrip(".,;"))
    return references


def encode_under_limit(image: Image.Image, max_kb: int) -> tuple[bytes, int, tuple[int, int]]:
    image = ImageOps.exif_transpose(image)
    if image.mode not in {"RGB", "RGBA"}:
        image = image.convert("RGBA" if "transparency" in image.info else "RGB")

    working = image
    max_bytes = (max_kb * 1024) - 1024
    while True:
        best: tuple[bytes, int] | None = None
        low, high = 48, 92
        while low <= high:
            quality = (low + high) // 2
            output = io.BytesIO()
            working.save(output, "WEBP", quality=quality, method=6)
            payload = output.getvalue()
            if len(payload) <= max_bytes:
                best = (payload, quality)
                low = quality + 1
            else:
                high = quality - 1
        if best is not None:
            return best[0], best[1], working.size
        width, height = working.size
        working = working.resize((max(1, round(width * 0.9)), max(1, round(height * 0.9))), Image.Resampling.LANCZOS)


def optimize() -> None:
    changed = 0
    for path in sorted(ASSETS.rglob("*")):
        item_category = category(path) if path.is_file() else None
        if item_category is None:
            continue
        source_kb = path.stat().st_size / 1024
        suffix = path.suffix.lower()
        max_kb = CATEGORY_LIMITS_KB[item_category][1]
        if suffix == ".webp" and source_kb <= max_kb:
            continue
        with Image.open(path) as image:
            payload, quality, size = encode_under_limit(image, max_kb)
        destination = path.with_suffix(".webp")
        destination.write_bytes(payload)
        if destination != path:
            path.unlink()
        changed += 1
        print(f"optimized {destination.relative_to(ROOT).as_posix()} -> {len(payload) / 1024:.1f} KB, q{quality}, {size[0]}x{size[1]}")
    print(f"Optimized {changed} image(s).")


def audit() -> int:
    references = runtime_references()
    missing = sorted(ref for ref in references if not (ROOT / ref).is_file())
    files = {path.relative_to(ROOT).as_posix() for path in ASSETS.rglob("*") if path.is_file()}
    unreferenced = sorted(
        item for item in files - references
        if Path(item).suffix.lower() in {".webp", ".jpg", ".jpeg", ".png", ".gif", ".avif", ".svg", ".pdf"}
    )

    jpeg_files = sorted(path.relative_to(ROOT).as_posix() for path in ASSETS.rglob("*") if path.suffix.lower() in {".jpg", ".jpeg"})
    over: list[str] = []
    under: list[str] = []
    counts = {name: 0 for name in CATEGORY_LIMITS_KB}
    total_bytes = 0
    for path in ASSETS.rglob("*.webp"):
        item_category = category(path)
        if item_category is None:
            continue
        counts[item_category] += 1
        size_kb = path.stat().st_size / 1024
        total_bytes += path.stat().st_size
        minimum, maximum = CATEGORY_LIMITS_KB[item_category]
        relative = path.relative_to(ROOT).as_posix()
        if size_kb > maximum:
            over.append(f"{relative} ({size_kb:.1f} KB > {maximum} KB)")
        elif size_kb < minimum:
            under.append(f"{relative} ({size_kb:.1f} KB < {minimum} KB)")

    print("Asset health")
    print(f"  WebP images: {sum(counts.values())} ({total_bytes / 1024 / 1024:.1f} MB)")
    for name, count in counts.items():
        print(f"  {name}: {count}")
    print(f"  JPEG files: {len(jpeg_files)}")
    print(f"  Missing runtime references: {len(missing)}")
    print(f"  Unreferenced runtime assets: {len(unreferenced)}")
    print(f"  Above delivery ceiling: {len(over)}")
    print(f"  Already below target range (kept small): {len(under)}")
    for heading, items in (("MISSING", missing), ("UNREFERENCED", unreferenced), ("JPEG", jpeg_files), ("OVER", over)):
        if items:
            print(f"\n{heading}")
            print("\n".join(f"  {item}" for item in items))
    return 1 if missing or jpeg_files or over else 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--optimize", action="store_true")
    args = parser.parse_args()
    if args.optimize:
        optimize()
    return audit()


if __name__ == "__main__":
    raise SystemExit(main())
