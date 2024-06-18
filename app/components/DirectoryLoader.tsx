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
      <ul>
        {imageFiles.map((file, index) => (
          <li key={index} onClick={() => onImageSelect(file)}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectoryLoader;
