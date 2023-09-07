import { render, screen } from "@testing-library/react";
import RenderMap from "./RenderMap";
import { RenderResults } from "./RenderResults";
import { Hero } from "../type/type";
import { MOOVE, ORIENTATION } from "../type/enum";

const emptyMapMock: string[][] = [
  ["0", "0", "0"],
  ["0", "0", "0"],
  ["0", "0", "0"],
  ["0", "0", "0"],
];

const mapMock: string[][] = [
  ["0", "L", "0"],
  ["0", "0", "M"],
  ["0", "T1", "0"],
  ["0", "M", "0"],
];

const heroesMock: Hero[] = [
  {
    name: "laura",
    treasure: 2,
    orientation: ORIENTATION.SUD,
    moves: [MOOVE.AVANCE],
    position: { x: 1, y: 2 },
    prevCase: "0",
  },
];

test("Render the map", () => {
  render(<RenderMap map={emptyMapMock} />);

  const element = screen.getAllByText("0");

  expect(element[0]).toBeInTheDocument();
});

test("Render the Results", () => {
  render(<RenderResults map={mapMock} heroes={heroesMock} />);

  const elementM = screen.getAllByText("M - 1 - 3");
  const elementT = screen.getAllByText("T - 1 - 2 - 1");
  const elementA = screen.getByText("A - laura - 1 - 2 - S - 2");

  expect(elementM[0]).toBeInTheDocument();
  expect(elementT[0]).toBeInTheDocument();
  expect(elementA).toBeInTheDocument();
});
