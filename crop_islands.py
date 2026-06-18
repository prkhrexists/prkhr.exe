import cv2
import numpy as np
from PIL import Image

# Read image with alpha channel
img = cv2.imread('public/5levels.png', cv2.IMREAD_UNCHANGED)

if img is None:
    print("Could not read image")
    exit(1)

# Extract alpha channel
if img.shape[2] == 4:
    alpha = img[:, :, 3]
else:
    print("Image has no alpha channel. Need to threshold based on background color.")
    # Assuming black background
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, alpha = cv2.threshold(gray, 10, 255, cv2.THRESH_BINARY)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    img[:, :, 3] = alpha

# Find contours of the non-transparent regions
contours, _ = cv2.findContours(alpha, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Filter out very small noise contours and sort by x-coordinate (left to right)
boxes = []
for c in contours:
    x, y, w, h = cv2.boundingRect(c)
    if w > 50 and h > 50:
        boxes.append((x, y, w, h))

# Sort boxes from left to right to roughly order them 1 to 5 (or we can just sort by size/position later)
boxes = sorted(boxes, key=lambda b: b[0])

print(f"Found {len(boxes)} distinct objects.")

for i, (x, y, w, h) in enumerate(boxes):
    # Add a little padding
    pad = 10
    x1 = max(0, x - pad)
    y1 = max(0, y - pad)
    x2 = min(img.shape[1], x + w + pad)
    y2 = min(img.shape[0], y + h + pad)
    
    crop = img[y1:y2, x1:x2]
    # Save with 1-based index (will match roughly, though we may need to manually map to zone IDs later)
    out_path = f'public/crop_island_{i+1}.png'
    cv2.imwrite(out_path, crop)
    print(f"Saved {out_path} ({w}x{h})")

