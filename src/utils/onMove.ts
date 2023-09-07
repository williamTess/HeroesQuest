import { MOOVE, ORIENTATION } from "../type/enum";
import { Hero } from "../type/type";

export const getPrevCase = (current: string, hero: Hero) => {
  let tmpHero = { ...hero };
  tmpHero.prevCase = current;
  if (current.includes("T")) {
    if (current === "T") tmpHero.prevCase = "0";
    else {
      const strNumber = current.slice(1);
      const rest = +strNumber - 1;

      tmpHero.prevCase = rest === 0 ? "0" : `T${rest}`;
    }
    tmpHero.treasure += 1;
  }

  return tmpHero;
};

export const changeOrientation = (
  move: MOOVE,
  currentOrientation: ORIENTATION
) => {
  let orientation = currentOrientation;
  if (move === MOOVE.GAUCHE) {
    if (currentOrientation === ORIENTATION.NORD)
      orientation = ORIENTATION.OUEST;
    else if (currentOrientation === ORIENTATION.SUD)
      orientation = ORIENTATION.EST;
    else if (currentOrientation === ORIENTATION.EST)
      orientation = ORIENTATION.NORD;
    else if (currentOrientation === ORIENTATION.OUEST)
      orientation = ORIENTATION.SUD;
  } else if (move === MOOVE.DROITE) {
    if (currentOrientation === ORIENTATION.NORD) orientation = ORIENTATION.EST;
    else if (currentOrientation === ORIENTATION.SUD)
      orientation = ORIENTATION.OUEST;
    else if (currentOrientation === ORIENTATION.EST)
      orientation = ORIENTATION.SUD;
    else if (currentOrientation === ORIENTATION.OUEST)
      orientation = ORIENTATION.NORD;
  }
  return orientation;
};

export const moveHero = (
  hero: Hero,
  currentMap: string[][]
): { map: string[][]; newHeroStat: Hero } => {
  let mapTmp = [...currentMap];
  const {
    position: currentPosition,
    orientation: currentOrientation,
    prevCase: currentPrevCase,
    name,
  } = hero;
  const defaultReturn = {
    map: currentMap,
    newHeroStat: hero,
  };
  let tmpHero = { ...hero };

  if (currentOrientation === ORIENTATION.NORD) {
    if (!mapTmp[currentPosition.x - 1]) return defaultReturn;
    if (
      !["0", "T"].includes(mapTmp[currentPosition.x - 1][currentPosition.y][0])
    )
      return defaultReturn;

    mapTmp[currentPosition.x][currentPosition.y] = currentPrevCase;
    tmpHero = getPrevCase(
      mapTmp[currentPosition.x - 1][currentPosition.y],
      hero
    );
    mapTmp[currentPosition.x - 1][currentPosition.y] = name;

    return {
      map: mapTmp,
      newHeroStat: {
        ...tmpHero,
        position: { x: currentPosition.x - 1, y: currentPosition.y },
      },
    };
  } else if (currentOrientation === ORIENTATION.SUD) {
    if (!mapTmp[currentPosition.x + 1]) return defaultReturn;
    if (
      !["0", "T"].includes(mapTmp[currentPosition.x + 1][currentPosition.y][0])
    )
      return defaultReturn;

    mapTmp[currentPosition.x][currentPosition.y] = currentPrevCase;
    tmpHero = getPrevCase(
      mapTmp[currentPosition.x + 1][currentPosition.y],
      hero
    );
    mapTmp[currentPosition.x + 1][currentPosition.y] = name;

    return {
      map: mapTmp,
      newHeroStat: {
        ...tmpHero,
        position: { x: currentPosition.x + 1, y: currentPosition.y },
      },
    };
  } else if (currentOrientation === ORIENTATION.EST) {
    if (!mapTmp[currentPosition.x][currentPosition.y + 1]) return defaultReturn;
    if (
      !["0", "T"].includes(mapTmp[currentPosition.x][currentPosition.y + 1][0])
    )
      return defaultReturn;

    mapTmp[currentPosition.x][currentPosition.y] = currentPrevCase;
    tmpHero = getPrevCase(
      mapTmp[currentPosition.x][currentPosition.y + 1],
      hero
    );
    mapTmp[currentPosition.x][currentPosition.y + 1] = name;

    return {
      map: mapTmp,
      newHeroStat: {
        ...tmpHero,
        position: { x: currentPosition.x, y: currentPosition.y + 1 },
      },
    };
  } else if (currentOrientation === ORIENTATION.OUEST) {
    if (!mapTmp[currentPosition.x][currentPosition.y - 1]) return defaultReturn;
    if (
      !["0", "T"].includes(mapTmp[currentPosition.x][currentPosition.y - 1][0])
    )
      return defaultReturn;

    mapTmp[currentPosition.x][currentPosition.y] = currentPrevCase;
    tmpHero = getPrevCase(
      mapTmp[currentPosition.x][currentPosition.y - 1],
      hero
    );
    mapTmp[currentPosition.x][currentPosition.y - 1] = name;

    return {
      map: mapTmp,
      newHeroStat: {
        ...tmpHero,
        position: { x: currentPosition.x, y: currentPosition.y - 1 },
      },
    };
  }

  return defaultReturn;
};

export const onMove = (
  currentMap: string[][],
  hero: Hero,
  move: MOOVE
): {
  map: string[][];
  newHeroStat: Hero;
} => {
  if (move === MOOVE.AVANCE) {
    const { map, newHeroStat } = moveHero(hero, currentMap);
    return {
      map: map,
      newHeroStat,
    };
  } else if (move === MOOVE.DROITE || move === MOOVE.GAUCHE) {
    const orientation = changeOrientation(move, hero.orientation);
    return {
      map: currentMap,
      newHeroStat: { ...hero, orientation },
    };
  }
  return {
    map: currentMap,
    newHeroStat: { ...hero },
  };
};
