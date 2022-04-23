<script lang="ts">
  import { Illustration, Ellipse, Rect, Shape, TAU } from "zdog";

  // highlight: continue to learn about Zdog

  const createIllustration = (element: HTMLCanvasElement) => {
    let isSpinning = true;

    const illust = new Illustration({
      element,
      dragRotate: true,
      centered: true,
      // translate: { z: 60 },
      onDragStart: () => (isSpinning = false),
      onDragEnd: () => setTimeout(() => (isSpinning = true), 3000),
      zoom: 10
    });

    const head = new Shape({
      addTo: illust,
      stroke: 12,
      color: "gold"
    });

    const eye = new Ellipse({
      addTo: head,
      diameter: 2,
      quarters: 2, // semi-circle
      translate: { x: -2, y: 1, z: 4.5 },
      // rotate semi-circle to point up
      rotate: { z: -TAU / 4 },
      color: "purple",
      stroke: 0.5,
      // hide when front-side is facing back
      backface: false
    });

    // eye on right
    eye.copy({
      translate: { x: 2, y: 1, z: 4.5 }
    });

    // smile
    const smile = new Ellipse({
      addTo: head,
      diameter: 3,
      quarters: 2,
      translate: { y: 2.5, z: 4.5 },
      rotate: { z: TAU / 4 },
      closed: true,
      color: "#FED",
      stroke: 0.5,
      fill: true,
      backface: false
    });

    // start animation
    // animate();

    (function animate() {
      // rotate illo each frame
      if (isSpinning) illust.rotate.y += 0.025;

      illust.updateRenderGraph();
      // animate next frame
      requestAnimationFrame(animate);
    })();
  };
</script>

<div class="container">
  <div class="canvas-wrapper">
    <canvas use:createIllustration width="300px" height="300px" style:border="1px solid black" />
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // make the background a shade of blue
    // background: rgb(81, 89, 181);
    background: wheat;
  }

  .canvas-wrapper {
    height: 400px;
    width: 400px;
    border: 2px solid white;
    // center the canvas
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffddbb;
  }
</style>
