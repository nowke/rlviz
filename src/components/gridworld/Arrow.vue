<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    :width="config.width"
    :height="config.height"
    :viewBox="config.viewBox"
    :x="config.x"
    :y="config.y"
  >
    <defs />
    <g>
      <path
        :d="config.d"
        fill="#fff"
        stroke="none"
        pointer-events="all"
        :transform="config.transform"
      />
    </g>
  </svg>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Arrow"
})
class Arrow extends Vue {
  @Prop() direction;
  @Prop() x;
  @Prop() y;
  @Prop() size;

  get config() {
    const properties = {
      R: {
        width: `${0.62 * this.size}px`,
        height: `${0.31 * this.size}px`,
        viewBox: "-0.5 -0.5 91 51",
        x: this.x + this.size / 5.0,
        y: this.y + this.size / 3.0,
        transform: "rotate(0,45,25)",
        d:
          "M 0 18.76 L 72.86 18.76 L 72.86 0 L 90 25 L 72.86 50 L 72.86 31.24 L 0 31.24 Z"
      },
      L: {
        width: `${0.62 * this.size}px`,
        height: `${0.31 * this.size}px`,
        viewBox: "-0.5 -0.5 91 51",
        x: this.x + this.size / 5.0,
        y: this.y + this.size / 3.0,
        transform: "rotate(-180,45,25)",
        d:
          "M 0 18.76 L 72.86 18.76 L 72.86 0 L 90 25 L 72.86 50 L 72.86 31.24 L 0 31.24 Z"
      },
      U: {
        width: `${0.31 * this.size}px`,
        height: `${0.62 * this.size}px`,
        viewBox: "-0.5 -0.5 51 91",
        x: this.x + this.size / 3.0,
        y: this.y + this.size / 6.0,
        transform: "rotate(-90,25,45)",
        d:
          "M -20 38.76 L 52.86 38.76 L 52.86 20 L 70 45 L 52.86 70 L 52.86 51.24 L -20 51.24 Z"
      },
      D: {
        width: `${0.31 * this.size}px`,
        height: `${0.62 * this.size}px`,
        viewBox: "-0.5 -0.5 51 91",
        x: this.x + this.size / 3.0,
        y: this.y + this.size / 6.0,
        transform: "rotate(90,25,45)",
        d:
          "M -20 38.76 L 52.86 38.76 L 52.86 20 L 70 45 L 52.86 70 L 52.86 51.24 L -20 51.24 Z"
      }
    };
    return properties[this.direction];
  }
}

export default Arrow;
</script>
