// Client-side file upload to local directory using File System Access API
const uploadFileToLocalDirectory = async (file: File) => {
  try {
    // Check if File System Access API is supported
    if (!('showDirectoryPicker' in window)) {
      throw new Error('File System Access API not supported in this browser');
    }

    // Let user select a directory
    const directoryHandle = await window.showDirectoryPicker();

    // Create a unique filename to avoid conflicts
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `upload_${timestamp}.${fileExtension}`;

    // Create a new file in the selected directory
    const fileHandle = await directoryHandle.getFileHandle(uniqueFileName, {
      create: true,
    });

    // Create a writable stream
    const writable = await fileHandle.createWritable();

    // Write the file data
    await writable.write(file);
    await writable.close();

    console.log(`File uploaded successfully as ${uniqueFileName}`);
    return { success: true, fileName: uniqueFileName };
  } catch (error: unknown) {
    console.error('Error uploading file:', error);
    return { success: false, error: (error as Error).message };
  }
};

export default uploadFileToLocalDirectory;
