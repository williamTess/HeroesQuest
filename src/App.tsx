import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import logo from "./logo.svg";
import "./App.css";
import readFile from "./utils/readFile";
import { createMap } from "./utils/createMap";
import RenderMap from "./utils/RenderMap";
import { Hero } from "./type/type";
import { onMove } from "./utils/onMove";
import { RenderResults } from "./utils/RenderResults";

const App = () => {
  const [content, setContent] = useState<string[]>([]);
  const [map, setMap] = useState<string[][]>([]);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [error, setError] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (content.length > 0) {
      const { map, heroes, error } = createMap(content);
      setError(error);
      setMap(map);
      setHeroes(heroes);
    }
  }, [content]);

  const onSubmitFile = (file: any) => {
    const reader = readFile(file);
    if (reader) {
      reader.onload = () => {
        const tmp = reader.result as string;
        setContent(tmp.split("\n"));
      };
    } else {
      alert("error read file");
    }
  };

  const onClickStart = () => {
    let tmpMap = [...map];
    const newHeroes: Hero[] = [];
    heroes.forEach((hero) => {
      let currentStateHero = { ...hero };
      hero.moves.forEach((move) => {
        const { map, newHeroStat } = onMove(tmpMap, currentStateHero, move);
        tmpMap = map;
        currentStateHero = { ...newHeroStat };
      });
      newHeroes.push(currentStateHero);
    });
    setHeroes(newHeroes);
    setMap(tmpMap);
    setIsDone(true);
  };

  if (isDone)
    return (
      <div className="App">
        <RenderResults map={map} heroes={heroes} />
      </div>
    );

  return (
    <div className="App">
      {map.length > 0 && !error ? (
        <>
          <RenderMap map={map} />
          <button onClick={onClickStart}>start</button>
        </>
      ) : (
        <>
          <img src={logo} className="App-logo" alt="logo" />

          <FileUploader
            handleChange={onSubmitFile}
            name="file"
            types={["TXT"]}
          />
          {error}
        </>
      )}
    </div>
  );
};

export default App;
