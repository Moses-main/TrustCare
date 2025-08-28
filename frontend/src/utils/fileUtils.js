/**
 * File utility functions for handling file uploads and downloads
 */

/**
 * Converts a file to base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} Base64 string representation of the file
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Downloads a file from a blob
 * @param {Blob} blob - The file blob to download
 * @param {string} filename - The name to save the file as
 */
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

/**
 * Validates a file against size and type constraints
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {number} options.maxSize - Maximum file size in MB
 * @param {string[]} options.allowedTypes - Allowed MIME types
 * @returns {{valid: boolean, error: string|null}} Validation result
 */
export const validateFile = (file, { maxSize = 10, allowedTypes = [] } = {}) => {
  // Check file size (convert MB to bytes)
  if (file.size > maxSize * 1024 * 1024) {
    return { 
      valid: false, 
      error: `File size must be less than ${maxSize}MB` 
    };
  }

  // Check file type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }

  return { valid: true, error: null };
};

/**
 * Formats file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Gets file extension from filename or MIME type
 * @param {string} filename - The filename or MIME type
 * @returns {string} File extension without dot
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  
  // If it's a MIME type (e.g., 'image/jpeg')
  if (filename.includes('/')) {
    const parts = filename.split('/');
    if (parts.length > 1) {
      return parts[1].toLowerCase();
    }
  }
  
  // If it's a filename (e.g., 'document.pdf')
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
};
