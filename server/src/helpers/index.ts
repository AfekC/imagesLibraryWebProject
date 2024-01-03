import fs from 'fs';

export const writeFile = (file: Buffer, name: string, basePath: string): string => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const path:string = basePath + name.split(' ').join('') +'-' + uniqueSuffix;
    fs.writeFileSync(path, file);
    return path;
}

export const deleteFile = (filePath: string): void => {
    fs.rmSync(filePath);
}
