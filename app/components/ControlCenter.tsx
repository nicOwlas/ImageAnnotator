import React from "react";

interface ControlCenterProps {
  onImageLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExportFeatures: () => void;
}

const ControlCenter: React.FC<ControlCenterProps> = ({
  onImageLoad,
  onExportFeatures,
}) => {
  return (
    <div className="control-center">
      <input type="file" accept="image/*" onChange={onImageLoad} />
      <button onClick={onExportFeatures}>Export Features</button>
    </div>
  );
};

export default ControlCenter;
