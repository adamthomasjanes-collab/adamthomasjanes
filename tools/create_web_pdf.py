"""Create a compact screen-resolution PDF from a larger print-oriented PDF.

The source is rendered with Poppler, then each JPEG page is embedded at its
original physical page size. This preserves the complete publication and its
page geometry while producing a download intended for on-screen portfolio use.
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

from pypdf import PdfReader
from reportlab.pdfgen import canvas


def natural_page_number(path: Path) -> int:
    match = re.search(r"-(\d+)\.jpe?g$", path.name, flags=re.IGNORECASE)
    return int(match.group(1)) if match else 0


def find_renderer() -> str:
    renderer = shutil.which("pdftoppm")
    if renderer and renderer.lower().endswith((".cmd", ".bat")):
        wrapper = Path(renderer).resolve()
        if len(wrapper.parents) > 2:
            bundled = wrapper.parents[2] / "native" / "poppler" / "Library" / "bin" / "pdftoppm.exe"
            if bundled.is_file():
                return str(bundled)
    return renderer or "pdftoppm"


def run_renderer(renderer: str, arguments: list[str]) -> None:
    command = [renderer, *arguments]
    if renderer.lower().endswith((".cmd", ".bat")):
        command_line = subprocess.list2cmdline(command)
        subprocess.run([os.environ.get("COMSPEC", "cmd.exe"), "/d", "/c", command_line], check=True)
    else:
        subprocess.run(command, check=True)


def create_web_pdf(source: Path, destination: Path, renderer: str, dpi: int, quality: int) -> None:
    reader = PdfReader(source)
    with tempfile.TemporaryDirectory(prefix="atj-web-pdf-") as temp_name:
        temp_dir = Path(temp_name)
        prefix = temp_dir / "page"
        run_renderer(
            renderer,
            [
                "-jpeg",
                "-r",
                str(dpi),
                "-jpegopt",
                f"quality={quality},optimize=y,progressive=y",
                str(source),
                str(prefix),
            ],
        )
        images = sorted(temp_dir.glob("page-*.jpg"), key=natural_page_number)
        if len(images) != len(reader.pages):
            raise RuntimeError(f"Rendered {len(images)} pages for a {len(reader.pages)}-page source")

        destination.parent.mkdir(parents=True, exist_ok=True)
        output = canvas.Canvas(str(destination), pageCompression=1)
        for page, image in zip(reader.pages, images, strict=True):
            width = float(page.mediabox.width)
            height = float(page.mediabox.height)
            output.setPageSize((width, height))
            output.drawImage(str(image), 0, 0, width=width, height=height, preserveAspectRatio=False)
            output.showPage()
        output.save()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--dpi", type=int, default=132)
    parser.add_argument("--quality", type=int, default=75)
    parser.add_argument("--renderer", default=find_renderer())
    args = parser.parse_args()

    create_web_pdf(args.source, args.destination, args.renderer, args.dpi, args.quality)
    before = args.source.stat().st_size
    after = args.destination.stat().st_size
    print(
        f"{args.source.as_posix()}: {before / 1024 / 1024:.1f} MB -> "
        f"{after / 1024 / 1024:.1f} MB ({(1 - after / before) * 100:.1f}% smaller)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
