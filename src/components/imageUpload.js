import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "./firebase";  // Your firebase config

const ImageUpload = () => {
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
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{ border: "2px dashed #ccc", padding: "20px", width: "300px", textAlign: "center" }}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
        />
        <button onClick={() => document.getElementById("file-input").click()}>Select Images</button>
        <p>Or drag and drop images here</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
        {images.map((file, index) => (
          <div key={index} style={{ position: "relative", width: "100px", height: "100px" }}>
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <button
              onClick={() => removeImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                padding: "5px",
              }}
            >
              X
            </button>
            <div style={{ textAlign: "center", fontSize: "12px" }}>
              {uploadProgress[index] ? `${Math.round(uploadProgress[index])}%` : "Waiting"}
            </div>
          </div>
        ))}
      </div>

      <button onClick={uploadImages} disabled={images.length === 0}>
        Upload Images
      </button>

      <div style={{ marginTop: "20px" }}>
        {uploadedUrls.length > 0 && (
          <div>
            <h3>Uploaded Images:</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {uploadedUrls.map((url, index) => (
                <div key={index} style={{ width: "100px", height: "100px" }}>
                  <img
                    src={url}
                    alt={`uploaded-${index}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
