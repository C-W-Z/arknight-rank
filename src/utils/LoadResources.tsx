// import { readBinaryFile } from '@tauri-apps/api/fs';
import { resolveResource } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';

export const loadImage = async (name: string): Promise<string | undefined> => {
    try {
        // const image = await import(/* @vite-ignore */imagePath);
        // return image.default;
        const imagePath = await resolveResource(name);
        return convertFileSrc(imagePath);
        // const fileBinary = await readBinaryFile(imagePath);
        // const blob = new Blob([fileBinary], { type: 'image/png' });
        // return URL.createObjectURL(blob);
    } catch (error) {
        console.error(`Error loading image: ${name}`, error);
        return undefined;
    }
};
