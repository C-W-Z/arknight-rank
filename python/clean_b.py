import glob
import os

def remove_images_with_b(directory):
    # 支援的圖片副檔名
    image_extensions = ('*.png''*.webp')

    for ext in image_extensions:
        for file_path in glob.glob(os.path.join(directory, ext)):
            filename = os.path.basename(file_path)
            name, _ = os.path.splitext(filename)

            if name.endswith('b'):
                print(f"Removing: {file_path}")
                os.remove(file_path)

# 指定要清理的資料夾
folder_path = "src\\assets\\skin3"  # 請替換成你的資料夾路徑
remove_images_with_b(folder_path)
