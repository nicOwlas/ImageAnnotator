import React from "react";

interface ControlCenterProps {
  onImageLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ControlCenter: React.FC<ControlCenterProps> = ({ onImageLoad }) => {
  return (
    <div className="control-center">
      <input type="file" accept="image/*" onChange={onImageLoad} />
    </div>
  );
};

export default ControlCenter;
