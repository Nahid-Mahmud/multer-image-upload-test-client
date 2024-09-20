import axios from "axios";
import { useState } from "react";

function App() {
  // State to hold multiple files and their previews
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray); // Update the files state
      setPreviews(fileArray.map((file) => URL.createObjectURL(file))); // Generate preview URLs
    }
  };

  // Handle upload of files
  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file); // Append each file to the FormData
    });

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Files uploaded:", res.data.filepaths);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple // Allow multiple file selection
        onChange={handleFileChange}
      />
      <div>
        {previews.map((preview, index) => (
          <img key={index} src={preview} alt={`Preview ${index}`} style={{ width: "100px", margin: "5px" }} />
        ))}
      </div>
      <button onClick={handleUpload} disabled={files.length === 0}>
        Upload
      </button>
    </div>
  );
}

export default App;
