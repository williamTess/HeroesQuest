import { MOOVE, ORIENTATION } from "../type/enum";
import { Hero } from "../type/type";
import { changeOrientation, getPrevCase, moveHero, onMove } from "./onMove";

const mapMock: string[][] = [
  ["0", "0", "0"],
  ["0", "0", "0"],
  ["0", "0", "0"],
  ["0", "0", "0"],
];

const heroMock: Hero = {
  name: "laura",
  treasure: 2,
  orientation: ORIENTATION.SUD,
  moves: [MOOVE.AVANCE],
  position: { x: 1, y: 2 },
  prevCase: "0",
};

test("On move()", () => {
  expect(onMove(mapMock, heroMock, MOOVE.AVANCE)).toStrictEqual({
    map: [
      ["0", "0", "0"],
      ["0", "0", "0"],
      ["0", "0", "laura"],
      ["0", "0", "0"],
    ],
    newHeroStat: {
      moves: ["A"],
      name: "laura",
      orientation: "S",
      position: { x: 2, y: 2 },
      prevCase: "0",
      treasure: 2,
    },
  });

  expect(onMove(mapMock, heroMock, MOOVE.GAUCHE)).toStrictEqual({
    map: [
      ["0", "0", "0"],
      ["0", "0", "0"],
      ["0", "0", "laura"],
      ["0", "0", "0"],
    ],
    newHeroStat: {
      moves: ["A"],
      name: "laura",
      orientation: "E",
      position: { x: 1, y: 2 },
      prevCase: "0",
      treasure: 2,
    },
  });
  expect(onMove(mapMock, heroMock, "X" as MOOVE)).toStrictEqual({
    map: [
      ["0", "0", "0"],
      ["0", "0", "0"],
      ["0", "0", "laura"],
      ["0", "0", "0"],
    ],
    newHeroStat: {
      moves: ["A"],
      name: "laura",
      orientation: "S",
      position: { x: 1, y: 2 },
      prevCase: "0",
      treasure: 2,
    },
  });

  expect(changeOrientation(MOOVE.GAUCHE, ORIENTATION.SUD)).toBe(
    ORIENTATION.EST
  );
  expect(changeOrientation(MOOVE.GAUCHE, ORIENTATION.EST)).toBe(
    ORIENTATION.NORD
  );
  expect(changeOrientation(MOOVE.GAUCHE, ORIENTATION.OUEST)).toBe(
    ORIENTATION.SUD
  );
  expect(changeOrientation(MOOVE.GAUCHE, ORIENTATION.NORD)).toBe(
    ORIENTATION.OUEST
  );
  expect(changeOrientation(MOOVE.DROITE, ORIENTATION.SUD)).toBe(
    ORIENTATION.OUEST
  );
  expect(changeOrientation(MOOVE.DROITE, ORIENTATION.EST)).toBe(
    ORIENTATION.SUD
  );
  expect(changeOrientation(MOOVE.DROITE, ORIENTATION.OUEST)).toBe(
    ORIENTATION.NORD
  );
  expect(changeOrientation(MOOVE.DROITE, ORIENTATION.NORD)).toBe(
    ORIENTATION.EST
  );

  expect(getPrevCase("0", heroMock)).toStrictEqual({ ...heroMock });
  expect(getPrevCase("T", heroMock)).toStrictEqual({
    ...heroMock,
    treasure: 3,
  });
  expect(getPrevCase("T2", heroMock)).toStrictEqual({
    ...heroMock,
    treasure: 3,
    prevCase: "T1",
  });

  expect(
    moveHero({ ...heroMock, orientation: ORIENTATION.NORD }, mapMock)
  ).toStrictEqual({
    map: [
      ["0", "0", "laura"],
      ["0", "0", "0"],
      ["0", "0", "laura"],
      ["0", "0", "0"],
    ],
    newHeroStat: {
      moves: ["A"],
      name: "laura",
      orientation: "N",
      position: { x: 0, y: 2 },
      prevCase: "0",
      treasure: 2,
    },
  });

  expect(
    moveHero(
      { ...heroMock, orientation: ORIENTATION.NORD, position: { x: 1, y: 0 } },
      mapMock
    )
  ).toStrictEqual({
    map: [
      ["laura", "0", "laura"],
      ["0", "0", "0"],
      ["0", "0", "laura"],
      ["0", "0", "0"],
    ],
    newHeroStat: {
      moves: ["A"],
      name: "laura",
      orientation: "N",
      position: { x: 0, y: 0 },
      prevCase: "0",
      treasure: 2,
    },
  });
});
