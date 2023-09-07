import { MOOVE, ORIENTATION } from "./enum";

export interface Pos {
  x: number;
  y: number;
  amount?: number;
}

export interface Hero {
  name: string;
  moves: MOOVE[];
  orientation: ORIENTATION;
  position: Pos;
  prevCase: string;
  treasure: number;
}
