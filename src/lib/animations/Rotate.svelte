<script>
  let rotated = false;
</script>

<div class="body">
  <div class="header">
    <h1>3D Rotation</h1>
    <p>Click the card to see rotation</p>
  </div>

  <div class="cards-wrapper">
    <div class="card-container">
      <div class="card" on:click={() => (rotated = !rotated)} class:rotated>
        <div class="card-contents card-front">
          <div class="card-depth">
            <h2>Click card</h2>
            <hr />
            <p>For 3D rotation</p>
          </div>
        </div>

        <div class="card-contents card-back">
          <div class="card-depth">
            <h2>Click card again</h2>
            <hr />
            <p>To turn back</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  /*
* Important properties to make this animation work:

* backface-visibility: hidden;
  * Hide the back of the card until it should be visible
  * https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility

* transform-style: preserve-3d;
  * Makes children elements positioned in 3D space. Default is flat.
  * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style

* transform: translateZ(100px);
  * Moves elements closer to or further away from the the viewer
  * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateZ

* perspective: 1200px;
  * Setting the distance between the element and the user
    to determine perspective of 3D elements
  * Lowering this value will make the animation more "in your face"
  * https://developer.mozilla.org/en-US/docs/Web/CSS/perspective

*/

  .body {
    background: linear-gradient(to right, #141e30, #243b55);
    height: 100%;
  }

  h1,
  h2,
  p {
    color: #ffffff;
    font-family: Arial, sans-serif;
  }

  // HEADER
  .header {
    text-align: center;
  }

  // CARD
  .cards-wrapper {
    margin-top: 50px;
  }

  .card-container {
    perspective: 1200px;
  }

  .card {
    margin: 0 auto;
    height: 500px;
    width: 500px;
    max-width: 80%;
    position: relative;
    border-radius: 25px;
    transition: all 1s ease;
    transform-style: preserve-3d;
    box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.2);
  }

  .rotated {
    transform: rotateY(-180deg);
  }

  .card-contents {
    width: 100%;
    height: 100%;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    h2,
    p {
      text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
    }
    h2 {
      font-size: 3em;
      margin: 0 auto;
    }
    hr {
      width: 50%;
      margin: 20px auto;
    }
    p {
      margin: 0 auto;
    }
  }
  .card-depth {
    transform: translateZ(100px) scale(0.98);
    perspective: inherit;
  }
  .card-front {
    background: linear-gradient(to top left, #3a6186, #89253e);
    transform-style: preserve-3d;
  }
  .card-back {
    transform: rotateY(180deg);
    background: linear-gradient(to top left, #ffa17f, #00223e);
    transform-style: preserve-3d;
  }
</style>
