// /app/page.tsx

"use client";

import React, { useState } from "react";
import Canvas from "./components/Canvas";
import ControlCenter from "./components/ControlCenter";

const Home = () => {
  const [imagePath, setImagePath] = useState<string>("");
  const [imageExtent, setImageExtent] = useState<
    [number, number, number, number]
  >([0, 0, 1024, 968]);

  const handleImageLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          setImageExtent([0, 0, width, height]);
          setImagePath(imageUrl);
        };
        img.src = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <ControlCenter onImageLoad={handleImageLoad} />
      <Canvas key={imagePath} imagePath={imagePath} imageExtent={imageExtent} />
    </div>
  );
};

export default Home;
