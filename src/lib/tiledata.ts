import type { TileData } from "./types";
import { shortId } from "./utils/helpers";

export function generateTiles(types: string[]) {
  const tiles: TileData[] = [];
  for (let i = 0; i < types.length * 2; i++) {
    let type = chooseRandom(types);
    let typeOccurencies = checkOccurence(tiles, "title", type);

    while (typeOccurencies == 2) {
      type = chooseRandom(types);
      typeOccurencies = checkOccurence(tiles, "title", type);
    }

    tiles.push({
      id: shortId(),
      title: type,
      matched: false
    });
  }
  return tiles;
}

function chooseRandom<T>(array: T[]) {
  const type = array[Math.floor(Math.random() * array.length)];
  return type;
}

// a function that checks the occurence of the property in an array of objects
export function checkOccurence<T>(array: T[], property: string, item: string) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i][property] === item) {
      count++;
    }
  }
  return count;
}

// a function that checks the occurence of the property in a 2d array of objects
export function checkOccurence2d<T>(array: T[][], property: string, item: string) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j][property] === item) {
        count++;
      }
    }
  }
  return count;
}

export const bgFromType = (type: string) => {
  switch (type) {
    case "Star":
      return "#fc5185";
    case "Dog":
      return "#c03546";
    case "Broom":
      return "#2470a0";
    case "Witch":
      return "#9764c7";
    case "Cat":
      return "#303a52";
    case "Pig":
      return "#f469a9";
    case "Horse":
      return "#492540";
    case "Monkey":
      return "#ffa45c";
  }
};

// this function works as expected, but changes the way the application works, so i'll leave it for now
function check(matches: TileData[][]) {
  let positives = 0;
  for (const match of matches) {
    if (match.every(tile => tile.matched === true)) {
      positives++;
    }
  }
  return positives === matches.length;
}
