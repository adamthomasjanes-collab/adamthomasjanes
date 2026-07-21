"""Create smaller, visually faithful copies of the site's PDF downloads.

The script preserves document structure, recompresses only large embedded JPEG
images, and applies lossless compression to page content streams. Outputs are
written to a separate directory so they can be rendered and reviewed before the
live files are replaced.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image
from pypdf import PdfWriter


def optimize_pdf(source: Path, destination: Path, quality: int, max_dimension: int) -> tuple[int, int]:
    writer = PdfWriter(clone_from=source)
    seen: set[tuple[int, int]] = set()
    replaced = 0

    for page_number, page in enumerate(writer.pages, start=1):
        for embedded in page.images:
            reference = embedded.indirect_reference
            if reference is None:
                continue
            key = (reference.idnum, reference.generation)
            if key in seen:
                continue
            seen.add(key)

            filters = reference.get("/Filter")
            filter_names = [str(item) for item in filters] if isinstance(filters, list) else [str(filters)]
            if "/DCTDecode" not in filter_names or len(embedded.data) < 60 * 1024:
                continue

            try:
                image = embedded.image
                if image.mode not in {"RGB", "L"}:
                    image = image.convert("RGB")
                width, height = image.size
                largest = max(width, height)
                if largest > max_dimension:
                    scale = max_dimension / largest
                    image = image.resize(
                        (max(1, round(width * scale)), max(1, round(height * scale))),
                        Image.Resampling.LANCZOS,
                    )
                embedded.replace(image, quality=quality, optimize=True)
                replaced += 1
            except Exception as exc:  # Keep unusual PDF image objects untouched.
                print(f"warning: page {page_number}, {embedded.name}: {exc}")

        page.compress_content_streams(level=9)

    destination.parent.mkdir(parents=True, exist_ok=True)
    writer.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
    with destination.open("wb") as output:
        writer.write(output)
    return len(writer.pages), replaced


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--quality", type=int, default=75)
    parser.add_argument("--max-dimension", type=int, default=2400)
    args = parser.parse_args()

    pages, images = optimize_pdf(args.source, args.destination, args.quality, args.max_dimension)
    before = args.source.stat().st_size
    after = args.destination.stat().st_size
    print(
        f"{args.source.as_posix()}: {pages} pages, {images} images recompressed, "
        f"{before / 1024 / 1024:.1f} MB -> {after / 1024 / 1024:.1f} MB "
        f"({(1 - after / before) * 100:.1f}% smaller)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
