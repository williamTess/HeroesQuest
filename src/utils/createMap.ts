import { MOOVE, ORIENTATION } from "../type/enum";
import { regex } from "../type/regex";
import { Hero, Pos } from "../type/type";
import { isEnum } from "./isEnum";
import { isNumeric } from "./isNumeric";

const checkLine = (line: string[]) => {
  console.log(line);
  if (line[0].localeCompare("C") === 0) {
    if (line.length !== 3) return "error map lenght";
    if (!isNumeric(line[1]) || !isNumeric(line[2])) return "error map number";
    if (+line[1] <= 0 || +line[2] <= 0) return "map size not valid";
  } else if (line[0].localeCompare("T") === 0) {
    if (line.length !== 4) return "error treasure lenght";
    if (!isNumeric(line[1]) || !isNumeric(line[2]) || !isNumeric(line[3]))
      return "error treasure number";
  } else if (line[0].localeCompare("M") === 0) {
    if (line.length !== 3) return "error mountain lenght";
    if (!isNumeric(line[1]) || !isNumeric(line[2]))
      return "error mountain number";
  } else if (line[0].localeCompare("A") === 0) {
    if (line.length !== 6) return "error heroes lenght";
    if (!isNumeric(line[2]) || !isNumeric(line[3]))
      return "error heroes number";
    if (!isEnum(ORIENTATION, line[4])) return "error heroes orientation";
    if (!regex.isMove.test(line[5])) return "error hero move";
  }
  return "";
};

export const createMap = (content: string[]) => {
  const mountain: Pos[] = [];
  const treasure: Pos[] = [];
  const heroes: Hero[] = [];
  let map: string[][] = [];
  let error: string = "";

  content.some((c) => {
    const lineSorted = c.split(" ").join("").split("-");

    error = checkLine(lineSorted);
    if (error) return true;

    if (lineSorted[0].localeCompare("C") === 0) {
      for (let i = 0; i < +lineSorted[2]; i++) {
        const tmp: string[] = [];
        for (let j = 0; j < +lineSorted[1]; j++) {
          tmp.push("0");
        }
        map.push(tmp);
      }
    } else if (lineSorted[0].localeCompare("T") === 0) {
      treasure.push({
        x: +lineSorted[1],
        y: +lineSorted[2],
        amount: +lineSorted[3],
      });
    } else if (lineSorted[0].localeCompare("M") === 0) {
      mountain.push({ x: +lineSorted[1], y: +lineSorted[2] });
    } else if (lineSorted[0].localeCompare("A") === 0) {
      heroes.push({
        name: lineSorted[1],
        moves: lineSorted[5].split("") as MOOVE[],
        orientation: lineSorted[4] as ORIENTATION,
        position: { x: +lineSorted[2], y: +lineSorted[3] },
        prevCase: "0",
        treasure: 0,
      });
    }
    return false;
  });

  !error &&
    mountain.forEach((pos) => {
      if (map[pos.y][pos.x] !== "0") error = "overlap mountain";
      map[pos.y][pos.x] = "M";
    });
  !error &&
    treasure.forEach((pos) => {
      if (map[pos.y][pos.x] !== "0") error = "overlap treasure";
      map[pos.y][pos.x] = `T${pos.amount}`;
    });
  !error &&
    heroes.forEach((hero) => {
      if (map[hero.position.y][hero.position.x] !== "0")
        error = "overlap heroes";
      map[hero.position.y][hero.position.x] = `${hero.name}`;
    });

  return { map: map, heroes: heroes, error: error };
};
