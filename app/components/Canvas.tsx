import React, { useEffect } from "react";
import "ol/ol.css";
import { Map } from "@react-ol/fiber";
import { getCenter } from "ol/extent";
import Projection from "ol/proj/Projection";

export const extent = [0, 0, 1024, 968];
export const projection = new Projection({
  code: "xkcd-image",
  units: "pixels",
  extent,
});

const Canvas = ({
  imagePath,
  imageExtent,
}: {
  imagePath: string;
  imageExtent: [number, number, number, number];
}) => {
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
    </Map>
  );
};

export default Canvas;
