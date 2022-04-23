<script lang="ts">
  import { cubicOut } from "svelte/easing";
  import type { TransitionConfig } from "svelte/types/runtime/transition";
  import { checkOccurence2d, generateTiles, bgFromType } from "./tiledata";
  import type { Match, TileData } from "./types";

  const types = ["Star", "Dog", "Broom", "Witch", "Cat", "Pig", "Horse", "Monkey"];
  const MAX_MATCHES = types.length;
  let tiles = generateTiles(types);
  let matches: Partial<Match>[] = [];
  let currentMoves = 0;
  let executionPaused = false;

  $: totalMatches = matches.every(match => match[0]?.matched === true)
    ? matches.length
    : matches.length - 1;

  $: matchedPairs = matches[matches.length - 1]?.map(tile => tile.id);

  function addToMatches(id: string) {
    const tileOccurence = checkOccurence2d(matches, "id", id);
    if (tileOccurence !== 0 || executionPaused) return;

    // get the current tile
    const currentTile = tiles.find(tile => tile.id === id);

    // if there already matches
    if (matches.length > 0) {
      // if the length of the last array of matches is the max length (i.e 2)
      // and some tiles in the "tiles" array haven't been matched
      // then initalise an empty array for the next set of matches
      if (matches[matches.length - 1].length == 2 && tiles.some(tile => tile.matched == false))
        matches[matches.length] = [];

      // for each match
      for (let matchIndex = 0; matchIndex < matches.length; matchIndex++) {
        let currentMatch = matches[matchIndex];
        const currentMatchIsComplete =
          currentMatch.length === 2 &&
          currentMatch.every(matchedTile => matchedTile.matched === true);

        if (currentMatchIsComplete) continue;

        // if the match array is not at the max length (i.e 2)
        // then add the tile to the matches array
        if (currentMatch.length < 2) addTileToMatch(currentMatch, currentTile);

        // if the length of the match array is exactly the max (i.e 2)
        if (currentMatch.length == 2) {
          // if all the tiles in the array have the exact same title
          // then set the "matched" property of all tiles in the array to "true"
          if (currentMatch[0].title == currentMatch[1].title) {
            executionPaused = true;
            currentMatch = <[TileData, TileData]>currentMatch.map(matchedTile => {
              // set the "matched" property of the tile in the "tiles" array to "true"
              setTimeout(() => {
                tiles[tiles.indexOf(matchedTile)] = { ...matchedTile, matched: true };
                executionPaused = false;
              }, 1000);
              return { ...matchedTile, matched: true };
            });
          }

          // else clear all the items in the current matches array
          else {
            executionPaused = true;
            setTimeout(() => removeMatchWithTileFromMatches(currentTile), 1000);
          }

          // trigger reactivity
          matches[matchIndex] = currentMatch;
        }
      }
    }

    // if there are no matches yet
    else if (matches.length < 1) {
      matches[0] = []; // intialise an empty array for the first item in the matches array
      addTileToMatch(matches[0], currentTile); // push the first item to the array
    }
  }

  function addTileToMatch(match: TileData[], tile: TileData) {
    if (match.length == 1) currentMoves++;
    match.push(tile);
  }

  function removeMatchWithTileFromMatches(tile: TileData) {
    matches = matches.filter(match => !match.includes(tile));
    executionPaused = false;
  }

  function resetGame() {
    tiles = generateTiles(types);
    matches = [];
    currentMoves = 0;
  }

  function rotateY(node: Element, { duration = 450, reverse = false }): TransitionConfig {
    return {
      duration,
      easing: cubicOut,
      css: (t, u) => `transform: rotateY(${((u * 100) / 100) * (!reverse ? 180 : -180)}deg)`
    };
  }
</script>

<header>
  <div>
    <h4>Pairs Matched</h4>
    <p>{totalMatches}/{MAX_MATCHES}</p>
  </div>

  <div>
    <h4>Total Moves</h4>
    <p>{currentMoves}</p>
  </div>
</header>

<div class="tiles-wrapper">
  {#each tiles as { title, id, matched }}
    {@const selected = matchedPairs?.includes(id)}

    <div class="tile" on:click={() => addToMatches(id)} class:selected class:matched>
      {#if selected || matched}
        <div class="tile-content" transition:rotateY style:background-color={bgFromType(title)}>
          <h1>{title}</h1>
        </div>
      {:else}
        <div
          class="tile-content"
          transition:rotateY={{ reverse: true }}
          style:background-color="#34222e"
        >
          <h1>MTC</h1>
        </div>
      {/if}
    </div>
  {/each}
</div>

<footer>
  <button on:click={resetGame}>Reset game</button>
</footer>

<style lang="scss">
  $width: 550px;
  $perspective: 800px;

  header {
    width: $width;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    // border: 1px solid brown;
    padding: 20px 5px;

    div {
      // border: 1px solid brown;
      flex: 1;

      h4 {
        font-size: 18px;
      }
    }
  }

  .tiles-wrapper {
    height: 450px;
    width: $width;
    display: grid;
    margin: 10px auto 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1em;
    color: white;
  }

  .tile {
    // border: 1px solid #e6e8ec;
    border-radius: 12px;
    perspective: 1200px;
    transition: all 450ms ease;
    position: relative;
    cursor: pointer;
    perspective: $perspective;
    -webkit-tap-highlight-color: transparent;
    // overflow: hidden;

    h1 {
      font-size: 20px;
      font-weight: 700;
      text-shadow: 1px 2px 3px #444;
    }
  }

  .tile-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .matched {
    filter: brightness(90%) opacity(0.5);
  }

  footer {
    width: $width;
    margin: 0 auto 100px;

    button {
      padding: 18px 20px;
      font-family: inherit;
      border-radius: 8px;
      border: none;
      font-size: 16px;
      font-weight: 600;
      color: white;
      cursor: pointer;
      background: #575151;
    }
  }
</style>
