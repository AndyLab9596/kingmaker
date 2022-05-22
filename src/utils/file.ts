import { apiIns } from 'src/config/apiClient';

export class FileService {
  static upload = async (file: File, onProgress?: (percentage: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder_name', 'file_upload');
    return apiIns.uploadFile.upload(formData, onProgress);
  };

  static linkFile = (url: string) => {
    return url;
  };
}
