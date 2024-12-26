import React, { useState } from "react";
import "../css/imageUploader.css";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const uploadImages = () => {
    const progress = {};
    images.forEach((_, index) => (progress[index] = 0));
    setUploadProgress(progress);

    images.forEach((image, index) => {
      const uploadInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          newProgress[index] = Math.min(100, newProgress[index] + 20);
          if (newProgress[index] === 100) {
            clearInterval(uploadInterval);
            setUploadedUrls((prev) => [...prev, URL.createObjectURL(image)]);
          }
          return newProgress;
        });
      }, 500);
    });
  };

  return (
    <div className="uploader-container">
      <h1>Image Uploader</h1>
      <div
        className="drag-drop-area"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          id="file-input"
          style={{ display: "none" }}
        />
        <button
          className="select-btn"
          onClick={() => document.getElementById("file-input").click()}
        >
          Select Images
        </button>
        <p>Or drag and drop images here</p>
      </div>

      {images.length > 0 && (
        <div className="preview-container">
          <h2>Selected Images</h2>
          <div className="image-grid">
            {images.map((file, index) => (
              <div className="image-card" key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="preview-img"
                />
                <button
                  className="delete-btn"
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
                {uploadProgress[index] !== undefined && (
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${uploadProgress[index]}%` }}
                    ></div>
                    <span className="progress-text">
                      {uploadProgress[index]}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            style={{ marginTop: "4rem" }}
            className="upload-btn"
            onClick={uploadImages}
          >
            Upload Images
          </button>
        </div>
      )}

      {uploadedUrls.length > 0 && (
        <div className="uploaded-container">
          <h2>Uploaded Images</h2>
          <div className="image-grid">
            {uploadedUrls.map((url, index) => (
              <div className="image-card" key={index}>
                <img
                  src={url}
                  alt={`uploaded-${index}`}
                  className="uploaded-img"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
