import React, { useEffect, useState } from "react";
import "ol/ol.css";
import { Map } from "@react-ol/fiber";
import { Stroke, Fill } from "ol/style";
import { getCenter } from "ol/extent";
import Projection from "ol/proj/Projection";

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

const Canvas = ({
  imagePath,
  imageExtent,
}: {
  imagePath: string;
  imageExtent: [number, number, number, number];
}) => {
  const [vectorSource, setVectorSource] = useState();
  return (
    <Map style={{ width: "100%", height: "100%", position: "fixed" }}>
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
            args={{
              type: "LineString",
              source: vectorSource,
              snapTolerance: 30,
            }}
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
