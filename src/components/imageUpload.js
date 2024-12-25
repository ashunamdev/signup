import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "./firebase";  // Your firebase config
import '../imageUploader.css'

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  // Handle drag-and-drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Upload images to Firebase Storage
  const uploadImages = async () => {
    const newUploadProgress = [];
    const newUploadedUrls = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Track upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          newUploadProgress[i] = progress;
          setUploadProgress([...newUploadProgress]);
        },
        (error) => {
          console.error("Upload error: ", error);
        },
        () => {
          // Get download URL after successful upload
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            newUploadedUrls[i] = url;
            setUploadedUrls([...newUploadedUrls]);

            // Save image URLs to Firestore
            addDoc(collection(db, "images"), {
              url,
              name: file.name,
            });
          });
        }
      );
    }
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
          <button className="upload-btn" onClick={uploadImages}>
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
