import React, { useEffect, useState, useRef } from "react";
import "ol/ol.css";
import { Map } from "@react-ol/fiber";
import { Stroke, Fill } from "ol/style";
import { getCenter } from "ol/extent";
import Projection from "ol/proj/Projection";

interface CanvasProps {
  imagePath: string;
  imageExtent: [number, number, number, number];
  vectorSource: any;
  setVectorSource: any;
}

export const extent = [0, 0, 1024, 968];
export const projection = new Projection({
  code: "xkcd-image",
  units: "pixels",
  extent,
});

export const fill = new Fill({
  color: "rgba(255, 255, 255, 0.2)",
});
export const stroke = new Stroke({
  color: "#ffcc33",
  width: 2,
});
export const circleFill = new Fill({
  color: "#ffcc33",
});

const Canvas: React.FC<CanvasProps> = ({
  imagePath,
  imageExtent,
  vectorSource,
  setVectorSource,
}) => {
  // const [vectorSource, setVectorSource] = useState();
  const undoStack = useRef<Array<any>>([]); // Stack to hold the features for undo
  const drawInteractionRef = useRef<Draw | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        const lastFeature = undoStack.current.pop();
        if (lastFeature && vectorSource) {
          vectorSource.removeFeature(lastFeature);
        }
      } else if (event.key === "Escape" && drawInteractionRef.current) {
        drawInteractionRef.current.abortDrawing();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [vectorSource]);

  const handleDrawEnd = (event: any) => {
    undoStack.current.push(event.feature); // Add the drawn feature to the undo stack
  };

  return (
    <Map
      style={{ width: "100%", height: "100%", position: "relative" }}
      className="canvas"
    >
      <olView
        initialCenter={getCenter(imageExtent)}
        initialZoom={0}
        maxZoom={8}
        initialProjection={projection}
        showFullExtent={true}
      />
      <olLayerImage>
        <olSourceImageStatic
          initialProjection={projection}
          initialUrl={imagePath}
          imageExtent={imageExtent}
        />
      </olLayerImage>
      <olLayerVector>
        <olSourceVector ref={setVectorSource} />
        <olStyleStyle attach="style" fill={fill} stroke={stroke}>
          <olStyleCircle
            attach="image"
            args={{ radius: 7, fill: circleFill }}
          />
        </olStyleStyle>
      </olLayerVector>
      {vectorSource ? (
        <>
          <olInteractionModify source={vectorSource} />
          <olInteractionDraw
            ref={drawInteractionRef}
            args={{
              type: "LineString",
              source: vectorSource,
              snapTolerance: 30,
            }}
            onDrawend={handleDrawEnd}
          />
          <olInteractionSnap
            source={vectorSource}
            args={{ pixelTolerance: 30 }}
          />
        </>
      ) : null}
    </Map>
  );
};

export default Canvas;
