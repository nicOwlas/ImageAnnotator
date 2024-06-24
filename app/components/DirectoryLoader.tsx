import React from "react";

interface DirectoryLoaderProps {
  onImageSelect: (imagePath: string) => void;
  onDirectoryLoad: (fileList: FileList) => void;
  imageFiles: string[];
}

const DirectoryLoader: React.FC<DirectoryLoaderProps> = ({
  onImageSelect,
  onDirectoryLoad,
  imageFiles,
}) => {
  return (
    <div className="directory-loader">
      <input
        type="file"
        webkitdirectory="true"
        multiple
        id="directory-input"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            onDirectoryLoad(files);
          }
        }}
        style={{ display: "none" }} // Hide the default file input
      />
      <label htmlFor="directory-input" className="directory-loader-button">
        Load Images
      </label>
      <select
        className="directory-loader-select"
        size={500}
        onChange={(e) => onImageSelect(e.target.value)}
      >
        {imageFiles.map((file, index) => (
          <option key={index} value={file}>
            {file}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DirectoryLoader;
