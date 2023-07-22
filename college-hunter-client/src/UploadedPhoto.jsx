import React from 'react';

const UploadedPhoto = ({ imageUrl }) => {
  return (
    <div>
      <h2>Uploaded Photo</h2>
      <img src={imageUrl} alt="Uploaded" />
    </div>
  );
};

export default UploadedPhoto;
