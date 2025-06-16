Image to Base64 Converter
This is a responsive React application that allows users to upload single or multiple images, convert them to Base64 strings, and provides a suite of utility features like previewing, copying, downloading, and dark mode.

✨ Features
Image Upload: Supports uploading images via a traditional file input or intuitive drag-and-drop.

Base64 Conversion: Converts uploaded images into their Base64 string representation.

Image Previews: Displays small thumbnail previews of the uploaded images.

Copy to Clipboard: Easily copy the generated Base64 string to your clipboard with a single click.

Download Base64: Download the Base64 string as a .txt file.

File Validation: Includes built-in validation for image type (JPG, PNG, GIF, BMP, SVG) and file size (max 5MB per file).

Error Handling: Provides clear error messages for invalid file types or oversized files.

Clear/Reset: A "Clear All" button to quickly remove all uploaded images and their corresponding Base64 outputs.

Loading Indicators: Displays a loading spinner while images are being converted.

Dark Mode: A toggle for a comfortable dark mode viewing experience.

Responsive Design: Optimized for seamless use across various devices (desktops, tablets, and mobile phones).

Accessibility: Built with accessibility considerations in mind, including ARIA labels for interactive elements.

🚀 Technologies Used
React.js: A JavaScript library for building user interfaces.

Standard CSS: For all styling, including responsive layouts and theming.

🛠️ Local Setup and Run
Follow these steps to get the project up and running on your local machine:

Prerequisites
Make sure you have Node.js and npm (Node Package Manager) installed on your system.

Node.js & npm: Download and install Node.js (which includes npm)

Installation
Clone the repository:

git clone https://github.com/your-username/image-to-base64-converter.git

(Replace your-username/image-to-base64-converter.git with your actual repository URL)

Navigate to the project directory:

cd image-to-base64-converter

Install dependencies:

npm install

Running the Application
Start the development server:

npm start

This command will start the React development server. The application will automatically open in your default web browser, usually at http://localhost:3000.

💡 Usage
Upload Images:

Drag and Drop: Drag one or more image files directly onto the designated "Drag 'n' drop images here, or click to select files" area.

Click to Select: Click anywhere on the drag-and-drop area to open your file explorer and select images.

View Conversion: Once uploaded, image previews will appear along with their generated Base64 strings. A loading indicator will show during the conversion process.

Copy Base64: Click the "Copy" button next to an image's Base64 string to copy it to your clipboard.

Download Base64: Click the "Download" button next to an image's Base64 string to save it as a .txt file.

Clear All: Use the "Clear All" button at the top right to remove all uploaded images and clear the output.

Toggle Dark Mode: Use the "Dark Mode" toggle switch in the top right corner to switch between light and dark themes.

♿ Accessibility
This application aims for good accessibility:

Semantic HTML: Uses appropriate HTML elements for better structure.

ARIA Labels: Interactive elements (buttons, toggles, drag-and-drop area) include aria-label attributes for screen reader compatibility.

Keyboard Navigation: Interactive elements are reachable and operable via keyboard (e.g., using Tab and Enter keys).

Color Contrast: Colors in both light and dark modes are chosen to ensure sufficient contrast for readability.

Focus Indicators: Visual focus indicators are provided for interactive elements when navigating with a keyboard.

📄 License
This project is open-sourced under the MIT License.
