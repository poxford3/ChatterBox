import * as FileSystem from 'expo-file-system';


export const convertImageToBase64 = async (fileUri: string) => {
    try {
        const base64Data = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64Data;
    } catch (error) {
        console.error('Error converting image to base64:', error);
        return null;
    }
};