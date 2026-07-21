"""Render the curated print archive from source PDFs into web-ready WebP files."""

from __future__ import annotations

import argparse
import io
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

# The source binder includes one legitimate, unusually large production JPEG.
Image.MAX_IMAGE_PIXELS = None


ROOT = Path(__file__).resolve().parents[1]
PDFTOPPM = Path(r"C:\Users\thead\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe")
SOURCE = Path(r"D:\____CREATIVE ARCHIVE")


SINGLES = {
    "archive/advertising/1812-food-spirits.webp": ("PORTFOLIO/1812_3x4_060415 v2.pdf", 1),
    "archive/advertising/acoustic-for-autism.webp": ("PORTFOLIO/acousticForAutism_6x8_012016 v3.pdf", 1),
    "archive/advertising/catawba-garden-club.webp": ("PORTFOLIO/catawbaIslandGardenClub_3x3_042615 v3.pdf", 1),
    "archive/advertising/crows-nest-seafood.webp": ("PORTFOLIO/crowsNest_3x5_051415 v2.pdf", 1),
    "archive/advertising/db-beaute-anniversary.webp": ("PORTFOLIO/dbBeaute_3x6_031915.pdf", 1),
    "archive/advertising/erie-ottawa-airport.webp": ("PORTFOLIO/erieOttawaInternationalAirport_3x4_041615final.pdf", 1),
    "archive/advertising/fitzgerald-automotive.webp": ("PORTFOLIO/fitzgeraldAutomotiveGroup_040915.pdf", 1),
    "archive/advertising/frosty-bar-anniversary.webp": ("PORTFOLIO/frostyBar_4x8_072414.pdf", 1),
    "archive/advertising/harbor-side-open-house.webp": ("PORTFOLIO/harborsideBoatSales_3x5_050715 v2.pdf", 1),
    "archive/advertising/house-of-jerks.webp": ("PORTFOLIO/houseOfJerks_3x5_052115 v2.pdf", 1),
    "archive/advertising/joseph-wise-clocks.webp": ("PORTFOLIO/josephWise_2x4_052115.pdf", 1),
    "archive/advertising/rivalry-sports-bar.webp": ("PORTFOLIO/rivalrySportsBarAndGrill_3x3_061115 v2.pdf", 1),
    "archive/advertising/soul-to-sole.webp": ("PORTFOLIO/soulToSole_2x3_043015 (1).pdf", 1),
    "archive/advertising/tin-goose-memorial-day.webp": ("PORTFOLIO/tinGoose_3x5_052115.pdf", 1),
    "archive/best-of-best/best-of-best-seal-color.webp": ("PDFs/bestOfTheBest_lightened 2016 v3.pdf", 1),
    "archive/homes/homes-cover-2015-08.webp": ("PDFs/HOMES/01HG_HOMES_0815 ALL.pdf", 1),
    "archive/homes/homes-cover-2016-01.webp": ("PDFs/HOMES/HOMES01312016ALL.pdf", 1),
    "archive/homes/homes-cover-2016-04.webp": ("PDFs/HOMES/HOMES04312016ALL.pdf", 1),
    "archive/homes/homes-cover-2016-07.webp": ("PDFs/HOMES/HOMES07312016A01.pdf", 1),
    "archive/homes/homes-cover-2016-10.webp": ("PDFs/HOMES/HOMES1031201601.pdf", 1),
    "archive/homes/homes-cover-2016-11.webp": ("PDFs/HOMES/HOMES10312016ALL.pdf", 1),
    "archive/homes/homes-listings-jack-bradley-2015-10.webp": ("PDFs/HOMES/HOMES100115ALL.pdf", 5),
    "archive/homes/homes-listings-russell-2016-10.webp": ("PDFs/HOMES10312016A07.pdf", 1),
}

SPREADS = {
    "archive/best-of-best/best-of-best-pages-02-03.webp": ("PDFs/best of the best BoB_06052015_ALL.pdf", 2, 3),
    "archive/best-of-best/best-of-best-pages-04-05.webp": ("PDFs/best of the best BoB_06052015_ALL.pdf", 4, 5),
    "archive/best-of-best/best-of-best-pages-08-09.webp": ("PDFs/best of the best BoB_06052015_ALL.pdf", 8, 9),
}

SOURCE_IMAGES = {
    "archive/campaign-work/beer-thirty-st-patricks.webp": "Advertising/adsBinder_112917_Page_019.jpg",
    "archive/campaign-work/fremont-toy-show.webp": "Advertising/adsBinder_112917_Page_021.jpg",
    "archive/campaign-work/north-coast-parent-market.webp": "Advertising/adsBinder_112917_Page_037.jpg",
    "archive/campaign-work/pets-on-parade.webp": "Advertising/adsBinder_112917_Page_074.png",
    "archive/campaign-work/jet-express-spring.webp": "Advertising/adsBinder_112917_Page_078.png",
    "archive/campaign-work/marblehead-easter-egg-hunt.webp": "Advertising/adsBinder_112917_Page_087.png",
    "archive/campaign-work/mccarthys-st-paddys-day.webp": "Advertising/adsBinder_112917_Page_101.jpg",
    "archive/campaign-work/waldo-peppers-new-years-eve.webp": "Advertising/adsBinder_112917_Page_153.jpg",
}


def render_page(pdf: Path, page: int, temp: Path, width: int = 1800) -> Image.Image:
    output = temp / f"page-{page}"
    subprocess.run([
        str(PDFTOPPM), "-png", "-f", str(page), "-l", str(page), "-singlefile",
        "-scale-to-x", str(width), "-scale-to-y", "-1", str(pdf), str(output)
    ], check=True)
    return Image.open(output.with_suffix(".png")).convert("RGB")


def encode_webp(image: Image.Image, minimum_kb: int, maximum_kb: int) -> bytes:
    image = ImageOps.exif_transpose(image).convert("RGB")
    minimum = minimum_kb * 1024
    maximum = maximum_kb * 1024
    best = b""
    for quality in range(96, 45, -1):
        stream = io.BytesIO()
        image.save(stream, "WEBP", quality=quality, method=6)
        payload = stream.getvalue()
        if len(payload) <= maximum:
            best = payload
            break
    if not best:
        resized = image.resize((round(image.width * .9), round(image.height * .9)), Image.Resampling.LANCZOS)
        return encode_webp(resized, minimum_kb, maximum_kb)
    if len(best) < minimum:
        enlarged = image.resize((round(image.width * 1.08), round(image.height * 1.08)), Image.Resampling.LANCZOS)
        return encode_webp(enlarged, minimum_kb, maximum_kb)
    return best


def save(image: Image.Image, relative: str, spread: bool = False) -> None:
    destination = ROOT / "assets" / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    minimum, maximum = ((250, 450) if spread else (180, 300))
    payload = encode_webp(image, minimum, maximum)
    destination.write_bytes(payload)
    print(f"{destination.relative_to(ROOT)}: {len(payload) / 1024:.1f} KB")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-images-only", action="store_true")
    args = parser.parse_args()
    if not PDFTOPPM.is_file():
        raise FileNotFoundError(PDFTOPPM)
    with tempfile.TemporaryDirectory(prefix="atj-archive-") as folder:
        temp = Path(folder)
        if not args.source_images_only:
            for destination, (source, page) in SINGLES.items():
                save(render_page(SOURCE / source, page, temp), destination)
            for destination, (source, left_page, right_page) in SPREADS.items():
                left = render_page(SOURCE / source, left_page, temp, 1450)
                right = render_page(SOURCE / source, right_page, temp, 1450)
                height = min(left.height, right.height)
                spread = Image.new("RGB", (left.width + right.width, height), "white")
                spread.paste(left.crop((0, 0, left.width, height)), (0, 0))
                spread.paste(right.crop((0, 0, right.width, height)), (left.width, 0))
                save(spread, destination, spread=True)
        for destination, source in SOURCE_IMAGES.items():
            with Image.open(SOURCE / source) as image:
                source_image = ImageOps.exif_transpose(image).convert("RGB")
                if max(source_image.size) > 1800:
                    source_image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
                save(source_image, destination)


if __name__ == "__main__":
    main()
