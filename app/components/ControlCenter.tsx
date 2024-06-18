import React from "react";
import DirectoryLoader from "./DirectoryLoader";

interface ControlCenterProps {
  onDirectoryLoad: (fileList: FileList) => void;
  onImageSelect: (imagePath: string) => void;
  onExportFeatures: () => void;
  imageFiles: string[];
  selectedImage: string;
}

const ControlCenter: React.FC<ControlCenterProps> = ({
  onDirectoryLoad,
  onImageSelect,
  onExportFeatures,
  imageFiles,
  selectedImage,
}) => {
  return (
    <div className="control-center">
      {/* <DirectoryLoader
        onDirectoryLoad={onDirectoryLoad}
        onImageSelect={onImageSelect}
        imageFiles={imageFiles}
        selectedImage={selectedImage}
      /> */}
      <button onClick={onExportFeatures}>Export Features</button>
    </div>
  );
};

export default ControlCenter;
