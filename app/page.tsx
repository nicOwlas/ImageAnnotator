// /app/page.tsx

"use client";

import React, { useState } from "react";
import Canvas from "./components/Canvas";
import ControlCenter from "./components/ControlCenter";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { GeoJSON } from "ol/format";

const Home = () => {
  const [imagePath, setImagePath] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [imageExtent, setImageExtent] = useState<
    [number, number, number, number]
  >([0, 0, 1024, 968]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [vectorSource, setVectorSource] = useState();

  const handleDirectoryLoad = (fileList: FileList) => {
    const files = Array.from(fileList).filter(
      (file) => file.type === "image/jpeg"
    );
    const fileNames = files.map((file) => file.name);
    setImageFiles(files);

    if (files.length > 0) {
      loadAndSetImage(files[0]);
    }
  };

  const loadAndSetImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        setImageExtent([0, 0, width, height]);
        setImagePath(imageUrl);
        setImageName(file.name); // Set the image name
      };
      img.src = imageUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleImageSelect = (fileName: string) => {
    const file = imageFiles.find((file) => file.name === fileName);
    if (file) {
      loadAndSetImage(file);
    }
  };

  // const handleImageLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const imageUrl = e.target?.result as string;
  //       const img = new Image();
  //       img.onload = () => {
  //         const width = img.width;
  //         const height = img.height;
  //         setImageExtent([0, 0, width, height]);
  //         setImagePath(imageUrl);
  //         setImageName(file.name);
  //         console.log("image name", file.name);
  //       };
  //       img.src = imageUrl;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleExportFeatures = () => {
    const features = vectorSource.getFeatures();
    const geoJsonFormat = new GeoJSON();
    const featuresJson = geoJsonFormat.writeFeaturesObject(features);

    // Apply transformation to each feature
    const transformedFeatures = featuresJson.features.map((feature) => {
      const transformedCoordinates = feature.geometry.coordinates.map(
        (coord) => {
          return [coord[0], imageExtent[3] - coord[1]];
        }
      );
      feature.geometry.coordinates = transformedCoordinates;
      return feature;
    });

    featuresJson.features = transformedFeatures;
    const formattedJson = JSON.stringify(featuresJson, null, 4);
    const blob = new Blob([formattedJson], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${imageName.split(".")[0]}.json`;
    link.click();
  };

  return (
    <div className="container">
      <ControlCenter
        onDirectoryLoad={handleDirectoryLoad}
        onImageSelect={handleImageSelect}
        onExportFeatures={handleExportFeatures}
        imageFiles={imageFiles.map((file) => file.name)}
      />
      <Canvas
        key={imagePath}
        imagePath={imagePath}
        imageExtent={imageExtent}
        vectorSource={vectorSource}
        setVectorSource={setVectorSource}
      />
    </div>
  );
};

export default Home;
