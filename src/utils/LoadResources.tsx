// import { readBinaryFile } from '@tauri-apps/api/fs';
import { resolveResource } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';

const urlMap = new Map<string, string>();

export const loadImage = async (name: string): Promise<string | undefined> => {
    try {
        let url = urlMap.get(name);
        if (url === undefined) {
            const imagePath = await resolveResource(name);
            url = convertFileSrc(imagePath);
            urlMap.set(name, url);
        }
        return url;
    } catch (error) {
        console.error(`Error loading image: ${name}`, error);
        return undefined;
    }
};
