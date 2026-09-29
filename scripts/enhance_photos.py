import cv2
from PIL import Image, ImageFilter, ImageEnhance
import os
import json

src_dir = r"C:\Users\gusta\.gemini\antigravity-ide\scratch\fotos_perfil"
dst_dir = r"C:\Users\gusta\.gemini\antigravity-ide\scratch\fotos_perfil\scrapbook-senhas\public\fotos"

# Read active files from public/fotos
files = [f for f in os.listdir(dst_dir) if f.endswith('.jpg')]
print(f"Enhancing {len(files)} photos...")

count = 0
for f in files:
    src_path = os.path.join(src_dir, f)
    dst_path = os.path.join(dst_dir, f)
    
    # Read from original if available, else from dst
    input_path = src_path if os.path.exists(src_path) else dst_path
    img = cv2.imread(input_path)
    if img is None:
        continue
    
    h, w = img.shape[:2]
    # Denoise compression artifacts
    denoised = cv2.fastNlMeansDenoisingColored(img, None, 3, 3, 7, 21)
    
    # Upscale using Lanczos
    target_size = max(400, max(w, h))
    upscaled = cv2.resize(denoised, (target_size, target_size), interpolation=cv2.INTER_LANCZOS4)
    
    # Convert to PIL
    pil_img = Image.fromarray(cv2.cvtColor(upscaled, cv2.COLOR_BGR2RGB))
    
    # Unsharp mask to sharpen facial features and details
    sharpened = pil_img.filter(ImageFilter.UnsharpMask(radius=1.3, percent=125, threshold=2))
    
    # Subtle contrast and color touchup
    final = ImageEnhance.Contrast(sharpened).enhance(1.05)
    final = ImageEnhance.Color(final).enhance(1.04)
    
    final.save(dst_path, 'JPEG', quality=96)
    count += 1
    if count % 20 == 0 or count == len(files):
        print(f"Processed {count}/{len(files)}...")

print("All photos enhanced successfully!")
