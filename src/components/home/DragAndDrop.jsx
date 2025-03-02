import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/getCroppedImg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DragAndDrop = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isImageDropped, setIsImageDropped] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropped, setIsCropped] = useState(false);
  const navigate = useNavigate();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile);
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
    setIsImageDropped(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    console.log("Dropped file:", droppedFile);
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setImage(URL.createObjectURL(droppedFile));
      setIsImageDropped(true);
    } else {
      alert("Please drop an image file!");
    }
  };

  const handleCrop = useCallback(async () => {
    if (!image || !croppedAreaPixels) {
      console.error("Image or croppedAreaPixels is missing.");
      return;
    }
    try {
      console.log("Cropping with:", croppedAreaPixels);
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      console.log("Cropped Image Result:", croppedImg);
      if (croppedImg) {
        setCroppedImage(croppedImg);
        setIsCropped(true);
      } else {
        console.error("Cropped image is null");
      }
    } catch (err) {
      console.error("Error cropping image:", err);
    }
  }, [image, croppedAreaPixels]);

  const handleUpload = async () => {
    if (!croppedImage) {
      alert("Please crop the image first!");
      return;
    }
    try {
      const blob = await fetch(croppedImage).then((res) => res.blob());
      const file = new File([blob], "cropped-image.jpg", { type: "image/jpg" });
      const formData = new FormData();
      formData.append("croppedImage", file);

      console.log("Uploading image to server...");
      const response = await axios.post(
        "http://localhost:3000/api/images/upload", // Updated port
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Upload successful, response:", response.data);
      navigate("/chess-game");
    } catch (error) {
      console.error("Error uploading image:", error.message);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("Upload failed. Check console for details.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg h-full w-full mx-auto">
      <h2 className="text-lg font-semibold mb-2">Preview</h2>
      {image && !isCropped && (
        <svg
        className="mb-2"
        width="20"
        height="20"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.26 2L12 32C12 33.0609 12.4214 34.0783 13.1716 34.8284C13.9217 35.5786 14.9391 36 16 36H46M2 12.26L32 12C33.0609 12 34.0783 12.4214 34.8284 13.1716C35.5786 13.9217 36 14.9391 36 16V46"
          stroke="#1E1E1E"
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    )}

      {!isImageDropped && (
        <div
          className="w-full sm:w-96 h-64 sm:h-80 border-2 border-gray-300 border-dashed rounded-lg p-6 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex items-center justify-center mt-16" onClick={handleClick}>
            <svg
              className="w-20 h-20 text-gray-500"
              viewBox="0 0 200 200"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M41.6667 25H25V41.6667H41.6667V25ZM158.333 58.3333H175V108.333H158.333V75H75V158.333H108.333V175H58.3333V58.3333H158.333ZM58.3333 25H75V41.6667H58.3333V25ZM41.6667 58.3333H25V75H41.6667V58.3333ZM25 91.6667H41.6667V108.333H25V91.6667ZM41.6667 125H25V141.667H41.6667V125ZM91.6667 25H108.333V41.6667H91.6667V25ZM141.667 25H125V41.6667H141.667V25ZM125 141.667V125H175V141.667H158.333V158.333H141.667V175H125V141.667ZM158.333 158.333V175H175V158.333H158.333Z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm mt-2">Drag & drop here!</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {image && !isCropped && (
        <div className="relative w-full sm:w-1/2 h-96 flex flex-col items-center p-6 bg-white shadow-lg rounded-lg mx-auto">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {croppedImage && (
        <div className="w-full sm:w-96 h-auto flex flex-col items-center p-6 bg-white shadow-lg rounded-lg mx-auto">
          <p className="text-gray-600">Cropped Image:</p>
          <img
            src={croppedImage}
            alt="Cropped"
            className="max-w-full border border-gray-300"
          />
        </div>
      )}

      <div className="justify-items-center">
        {!isCropped && image && (
          <button
            onClick={handleCrop}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
          >
            Crop
          </button>
        )}
        {isCropped && (
          <button
            onClick={handleUpload}
            className="mt-4 ml-5 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;