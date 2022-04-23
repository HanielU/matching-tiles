<script lang="ts">
  import { browser } from "$app/env";

  import anime, { type AnimeInstance } from "animejs";
  import { onMount } from "svelte";

  let perspective = "700px";

  const animDuration = 5000;

  let animation: AnimeInstance;

  if (browser) {
    animation = anime({
      targets: ".block",
      rotateX: [
        { value: "-30deg", duration: animDuration / 3 },
        { value: "-30deg", duration: animDuration / 3, delay: 200 },
        { value: "30deg", duration: animDuration / 3, delay: 200 },
        { value: "30deg", duration: animDuration / 3, delay: 200 },
        { value: "0deg", duration: animDuration / 3, delay: 200 }
      ],
      rotateY: [
        { value: "-30deg", duration: animDuration / 3 },
        { value: "30deg", duration: animDuration / 3, delay: 200 },
        { value: "30deg", duration: animDuration / 3, delay: 200 },
        { value: "-30deg", duration: animDuration / 3, delay: 200 },
        { value: "0deg", duration: animDuration / 3, delay: 200 }
      ],
      endDelay: 100,
      easing: "easeInOutQuad",
      loop: true
    });
  }
</script>

<div class="page-wrapper">
  <input type="text" bind:value={perspective} />

  <div class="case-study" style:perspective>
    <div class="block" on:click={animation.play} on:contextmenu={animation.pause}>22</div>
  </div>
</div>

<style lang="scss">
  .page-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #302551ed;
    position: relative;
  }

  input {
    position: absolute;
    top: 100px;
    padding: 10px;
    font-size: 18px;
    background: inherit;
    border: 1px solid #fff;
    color: #fff;
    width: 100px;
    border-radius: 5px;
  }

  .block {
    border: 3px solid white;
    color: white;
    padding: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 32px;

    box-shadow: 0 3px 10px #676767;

    // make text very bold
    font-weight: bold;
    font-size: 32px;

    background: #281f46;
  }

  @keyframes move {
    0% {
      transform: rotateX(-10deg) rotateY(10deg);
    }
    50% {
      transform: rotateX(-30deg) rotateY(-30deg);
    }
    100% {
      transform: rotateX(-30deg) rotateY(30deg);
    }
  }
</style>
