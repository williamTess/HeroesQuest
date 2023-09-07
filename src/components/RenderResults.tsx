import React from "react";
import { Hero, Pos } from "../type/type";

interface Props {
  map: string[][];
  heroes: Hero[];
}

const getInfos = (map: string[][]): { mountains: Pos[]; treasures: Pos[] } => {
  const mountains: Pos[] = [];
  const treasures: Pos[] = [];

  map.forEach((line, indexLine) => {
    line.forEach((col, indexCol) => {
      if (col[0] === "T") {
        const rest = col.slice(1);
        treasures.push({ x: indexCol, y: indexLine, amount: rest ? +rest : 1 });
      } else if (col[0] === "M") {
        mountains.push({ x: indexCol, y: indexLine });
      }
    });
  });
  return { mountains, treasures };
};

export const RenderResults = (props: Props) => {
  const { map, heroes } = props;
  const { mountains, treasures } = getInfos(map);
  return (
    <>
      <div>{`C - ${map[0].length} - ${map.length}`}</div>

      {mountains.map((mountain) => (
        <div
          key={`${mountain.x}${mountain.y}`}
        >{`M - ${mountain.x} - ${mountain.y}`}</div>
      ))}

      {treasures.map((treasure) => (
        <div
          key={`${treasure.x}${treasure.y}`}
        >{`T - ${treasure.x} - ${treasure.y} - ${treasure.amount}`}</div>
      ))}

      {heroes.map((hero) => (
        <div
          key={`${hero.position.x}${hero.position.y}`}
        >{`A - ${hero.name} - ${hero.position.x} - ${hero.position.y} - ${hero.orientation} - ${hero.treasure}`}</div>
      ))}
    </>
  );
};
