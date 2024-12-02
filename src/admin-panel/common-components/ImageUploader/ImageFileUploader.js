import React, { useState } from 'react';
import './ImageFileUploader.scss'

const FileDropzone = ({ onFileSelect,inputId,errors, setErrors,showPreview,disabled,imagePreview }) => {
  const [imageURL, setImageURL] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const [imagePreviewURL, setImagePreviewURL] = useState(imagePreview);
  const allowedTypes = ['image/jpeg', 'image/png'];

  const handleFileSize = (file) => {
    if (file.size > 1048576) {
      setError('File size exceeds 1MB.');
      return;
    }
    setError(''); // Clear the error message
    const imageURL = URL.createObjectURL(file);
    onFileSelect(file);
    setImageURL(file);
    setImagePreviewURL(imageURL);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = Array.from(e.dataTransfer.files).find(file => allowedTypes.includes(file.type));
    file ? handleFileSize(file) : setError('Only JPEG and PNG images are allowed.');
  };

  const handleSelectFile = () => {
    document.getElementById(inputId).click();
  };

  const handleFileChange = (e) => {
    const file = Array.from(e.target.files).find(file => allowedTypes.includes(file.type));
    file ? handleFileSize(file) : setError('Only JPEG and PNG images are allowed.');
  };

  return (
    <div className='file-upload-container'>
        <div
            className={`drag-and-drop ${dragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleSelectFile}>
            <input
                type="file"
                id={inputId}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
                disabled={disabled}
            />
            {showPreview && imagePreviewURL ? <img src={imagePreviewURL} alt="Uploaded" /> : (
                  <>
                    <div>
                        <svg width="66" height="52" viewBox="0 0 66 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1790_17768)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M31.8619 51.5H4.53846C2.04903 51.5 0 49.4317 0 46.8864V21.3675H66V46.8769C66 49.4317 63.9695 51.5 61.4615 51.5H34.1381V30.6372L41.5322 38.1692L43.2382 36.4314L32.9977 26L22.7572 36.4314L24.4632 38.1692L31.8573 30.6372V51.5H31.8619ZM0 19.0442V5.11361C0 2.56361 2.03976 0.5 4.557 0.5H29.5857L34.1381 9.77444H61.4337C63.9556 9.77444 66 11.8475 66 14.3975V19.0442H0Z" fill="#648197"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1790_17768">
                        <rect width="66" height="51" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </div>
                    <span className="drag-text">Drag & Drop your <br/>image here</span>
                  </>
                )}
            
        </div>
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
    
  );
};

export default FileDropzone;
