import sys
from PIL import Image

def process_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # We will create a circular mask to hide anything outside the circle
    # And we can fill the background with a dark blue color
    
    # Create a new image with dark navy blue background
    bg = Image.new("RGBA", (width, height), (11, 20, 55, 255))
    
    # Mask for the circle
    mask = Image.new("L", (width, height), 0)
    from PIL import ImageDraw
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, width, height), fill=255)
    
    # Paste the original image over the background using the circular mask
    bg.paste(img, (0, 0), mask=mask)
    
    bg.save(output_path)
    print("Image processed successfully!")

if __name__ == "__main__":
    process_logo(sys.argv[1], sys.argv[2])
