import React, { useState, useRef, useEffect } from 'react';
import './App.css'



// Main App component
function App() {
  // State to store uploaded files and their Base64 data
  const [images, setImages] = useState([]);
  // State for drag-and-drop highlight
  const [isDragging, setIsDragging] = useState(false);
  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);
  // State for error messages
  const [error, setError] = useState('');

  // Ref for the file input element to programmatically click it
  const fileInputRef = useRef(null);

  // Effect to apply dark mode class to body and ensure font-inter is loaded
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }

    // Load Inter font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [darkMode]);


  // Function to handle file selection (from input or drag-and-drop)
  const handleFiles = (files) => {
    setError(''); // Clear any previous errors
    const newImages = [];

    // Loop through each selected file
    Array.from(files).forEach((file) => {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Only JPG, PNG, GIF, BMP, SVG are allowed.`);
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}. Maximum size is 5MB.`);
        return;
      }

      // Create a FileReader to read the file content
      const reader = new FileReader();

      // Set up a loading state for the current file
      const newImage = {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: URL.createObjectURL(file), // Create object URL for preview
        base64: '',
        loading: true,
      };
      newImages.push(newImage);

      // Event handler for when the file is finished loading
      reader.onloadend = () => {
        setImages((prevImages) =>
          prevImages.map((img) =>
            img.name === file.name && img.size === file.size
              ? { ...img, base64: reader.result, loading: false }
              : img
          )
        );
      };

      // Read the file as a Data URL (Base64)
      reader.readAsDataURL(file);
    });

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Handler for direct file input change
  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  // Handler for drag over event
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
    setIsDragging(true); // Add visual feedback for dragging
  };

  // Handler for drag leave event
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false); // Remove visual feedback
  };

  // Handler for drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false); // Remove visual feedback
    handleFiles(e.dataTransfer.files); // Process dropped files
  };

  // Function to copy Base64 string to clipboard
  const copyToClipboard = (text) => {
    // Fallback for document.execCommand('copy') which is deprecated but works in iframes
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Avoid scrolling to bottom
    textarea.style.opacity = 0; // Hide the textarea
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      alert('Copied to clipboard!'); // Simple feedback
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy. Please try again.');
    } finally {
      document.body.removeChild(textarea);
    }
  };

  // Function to download Base64 string as a .txt file
  const downloadBase64 = (base64String, fileName) => {
    const element = document.createElement('a');
    const file = new Blob([base64String], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName.split('.')[0]}.txt`;
    document.body.appendChild(element); // Required for Firefox
    element.click();
    document.body.removeChild(element); // Clean up
  };

  // Function to clear all uploaded images and data
  const clearAll = () => {
    setImages([]);
    setError('');
    // Revoke object URLs to free up memory
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
  };

  return (
    <div className="app-container">
      {/* Inline styles for the application */}
 

      <div className="max-w-4xl-centered">
        <h1 className="title">Image to Base64 Converter</h1>

        {/* Dark Mode Toggle */}
        <div className="dark-mode-toggle-container">
          <label htmlFor="darkModeToggle" className="toggle-label">
            <input
              type="checkbox"
              id="darkModeToggle"
              className="toggle-input"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            />
            <div className="toggle-slider"></div>
            <span className="toggle-text">Dark Mode</span>
          </label>
        </div>

        {/* Drag and Drop Area */}
        <div
          className={`drag-drop-area ${isDragging ? 'is-dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()} // Click to open file dialog
          role="button"
          tabIndex="0"
          aria-label="Upload images by dragging and dropping or clicking"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            multiple
            accept="image/jpeg, image/png, image/gif, image/bmp, image/svg+xml"
            className="file-input"
          />
          <svg className="upload-icon" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l.586.586M20 12h4m-4 8h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="drag-drop-text">
            Drag 'n' drop images here, or <span className="highlight">click to select files</span>
          </p>
          <p className="drag-drop-info">
            JPG, PNG, GIF, BMP, SVG (Max 5MB per file)
          </p>
        </div>

        {error && (
          <div className="error-message" role="alert">
            <strong>Error!</strong>
            <span>{error}</span>
          </div>
        )}

        {images.length > 0 && (
          <div className="clear-all-button-container">
            <button
              onClick={clearAll}
              className="clear-all-button"
              aria-label="Clear all uploaded images and outputs"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Image Previews and Base64 Output */}
        <div className="image-previews-container">
          {images.map((image, index) => (
            <div
              key={index}
              className="image-card"
            >
              {/* Image Thumbnail */}
              <div className="thumbnail-container">
                {image.loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <img src={image.previewUrl} alt={`Preview of ${image.name}`} className="thumbnail-image" />
                )}
              </div>

              {/* Image Info and Base64 String */}
              <div className="image-info-section">
                <h3 className="image-name" title={image.name}>{image.name}</h3>
                <p className="image-meta">
                  Size: {(image.size / 1024).toFixed(2)} KB | Type: {image.type}
                </p>
                {image.loading ? (
                  <p className="conversion-status">Converting...</p>
                ) : (
                  <div className="base64-output-area">
                    <textarea
                      readOnly
                      value={image.base64}
                      className="base64-textarea"
                      rows="6"
                      aria-label={`Base64 string for ${image.name}`}
                    ></textarea>
                    <div className="action-buttons">
                      <button
                        onClick={() => copyToClipboard(image.base64)}
                        className="action-button copy-button"
                        aria-label={`Copy Base64 string for ${image.name} to clipboard`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Copy
                      </button>
                      <button
                        onClick={() => downloadBase64(image.base64, image.name)}
                        className="action-button download-button"
                        aria-label={`Download Base64 string for ${image.name} as text file`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default App