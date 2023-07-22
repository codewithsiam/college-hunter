import React, { useState } from 'react';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Perform the file upload here, e.g., using an API or a service like AWS S3

    // Reset the selected file
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
