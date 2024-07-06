import os
import shutil
from PIL import Image

# all
# compress lossless to webp
# width > 2000 or height > 2000 or size > 1MB:
# compress 90%


source_folder = 'src-tauri\\assets\\skin2'
target_folder = 'src-tauri\\assets\\skin3'
other_folder = 'src-tauri\\assets\\skin4'

os.makedirs(target_folder, exist_ok=True)
os.makedirs(other_folder, exist_ok=True)

for filename in os.listdir(source_folder):
    source_file = os.path.join(source_folder, filename)

    if os.path.isfile(source_file) and filename.lower().endswith(('png', 'webp')):
        try:
            with Image.open(source_file) as img:
                width, height = img.size
                size = os.path.getsize(source_file)
                if (width > 2000 or height > 2000) or size > 1024 * 1024:
                    target_file = os.path.join(target_folder, filename)
                    shutil.copy(source_file, target_file)
                else:
                    other_file = os.path.join(other_folder, filename)
                    shutil.copy(source_file, other_file)

        except Exception as e:
            print(f"Error {filename}: {e}")

print("Complete")
