import React, { useState } from "react";

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
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            onDirectoryLoad(files);
          }
        }}
      />
      <select size={5} onChange={(e) => onImageSelect(e.target.value)}>
        {imageFiles.map((file, index) => (
          <option key={index} onClick={() => onImageSelect(file)}>
            {file}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DirectoryLoader;
