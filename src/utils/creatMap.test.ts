import { checkLine, createMap } from "./createMap";

const contentMock: string[] = [
  "C - 3 - 4",
  "M - 1 - 0",
  "M - 2 - 1",
  "T - 0 - 3 - 2",
  "T - 1 - 3-3",
  "A -Lara-1-1-S-AADADAGGA",
];

const contentMockError: string[] = [
  "C - 3 - 0",
  "M - 1 - 0",
  "M - 2 - 1",
  "T - 0 - 3 - 2",
  "T - 1 - 3-3",
  "A -Lara-1-1-S-AADADAGGA",
];

const contentMockOverlapMountain: string[] = [
  "C - 3 - 4",
  "M - 1 - 0",
  "M - 1 - 0",
  "T - 0 - 3 - 2",
  "T - 1 - 3-3",
  "A -Lara-1-1-S-AADADAGGA",
];
const contentMockOverlapTreasure: string[] = [
  "C - 3 - 4",
  "M - 1 - 2",
  "M - 1 - 0",
  "T - 1 - 2 - 2",
  "T - 1 - 3-3",
  "A -Lara-1-1-S-AADADAGGA",
];
const contentMockOverlapHero: string[] = [
  "C - 3 - 4",
  "M - 1 - 1",
  "M - 1 - 0",
  "T - 0 - 3 - 2",
  "T - 1 - 3-3",
  "A -Lara-1-1-S-AADADAGGA",
];

test("Testing createMap()", () => {
  expect(createMap(contentMock)).toStrictEqual({
    error: "",
    heroes: [
      {
        moves: ["A", "A", "D", "A", "D", "A", "G", "G", "A"],
        name: "Lara",
        orientation: "S",
        position: { x: 1, y: 1 },
        prevCase: "0",
        treasure: 0,
      },
    ],
    map: [
      ["0", "M", "0"],
      ["0", "Lara", "M"],
      ["0", "0", "0"],
      ["T2", "T3", "0"],
    ],
  });
  expect(createMap(contentMockError)).toStrictEqual({
    error: "map size not valid",
    heroes: [],
    map: [],
  });
  expect(createMap(contentMockOverlapMountain)).toStrictEqual({
    error: "overlap mountain",
    heroes: [
      {
        moves: ["A", "A", "D", "A", "D", "A", "G", "G", "A"],
        name: "Lara",
        orientation: "S",
        position: { x: 1, y: 1 },
        prevCase: "0",
        treasure: 0,
      },
    ],
    map: [
      ["0", "M", "0"],
      ["0", "0", "0"],
      ["0", "0", "0"],
      ["0", "0", "0"],
    ],
  });
  expect(createMap(contentMockOverlapTreasure)).toStrictEqual({
    error: "overlap treasure",
    heroes: [
      {
        moves: ["A", "A", "D", "A", "D", "A", "G", "G", "A"],
        name: "Lara",
        orientation: "S",
        position: { x: 1, y: 1 },
        prevCase: "0",
        treasure: 0,
      },
    ],
    map: [
      ["0", "M", "0"],
      ["0", "0", "0"],
      ["0", "T2", "0"],
      ["0", "T3", "0"],
    ],
  });
  expect(createMap(contentMockOverlapHero)).toStrictEqual({
    error: "overlap heroes",
    heroes: [
      {
        moves: ["A", "A", "D", "A", "D", "A", "G", "G", "A"],
        name: "Lara",
        orientation: "S",
        position: { x: 1, y: 1 },
        prevCase: "0",
        treasure: 0,
      },
    ],
    map: [
      ["0", "M", "0"],
      ["0", "Lara", "0"],
      ["0", "0", "0"],
      ["T2", "T3", "0"],
    ],
  });

  expect(checkLine(["C", "1", "2"])).toBe("");
  expect(checkLine(["C", "-1", "A"])).toBe("error map number");
  expect(checkLine(["C", "2", "2", "2"])).toBe("error map lenght");
  expect(checkLine(["C", "1", "0"])).toBe("map size not valid");
  expect(checkLine(["T", "1", "2"])).toBe("error treasure lenght");
  expect(checkLine(["T", "1", "A", "2"])).toBe("error treasure number");
  expect(checkLine(["M", "1"])).toBe("error mountain lenght");
  expect(checkLine(["M", "1", "A"])).toBe("error mountain number");
  expect(checkLine(["A", "Paul", "1", "2"])).toBe("error heroes lenght");
  expect(checkLine(["A", "Paul", "1", "A", "S", "ADGA"])).toBe(
    "error heroes number"
  );
  expect(checkLine(["A", "Paul", "1", "2", "W", "ADGA"])).toBe(
    "error heroes orientation"
  );
  expect(checkLine(["A", "Paul", "1", "2", "S", "ADFA"])).toBe(
    "error hero move"
  );
});
