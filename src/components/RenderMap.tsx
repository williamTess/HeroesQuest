import React from "react";

interface Props {
  map: string[][];
}

const RenderMap = (props: Props) => {
  const { map } = props;
  return (
    <div style={{ overflow: "scroll" }}>
      {map[0].length <= 50 && map.length <= 50
        ? map.map((linex, idx) => {
            const tmpy = linex.map((liney, idy) => (
              <div key={idy}>{liney}</div>
            ));
            return (
              <div key={idx} style={{ display: "flex", gap: 10 }}>
                {tmpy}
              </div>
            );
          })
        : "Too big to be render"}
    </div>
  );
};

export default RenderMap;
