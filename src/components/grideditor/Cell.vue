<template>
  <g class="cell-container" @click="onSelectToggle">
    <template v-if="disabled">
      <rect
        :x="x"
        :y="y"
        :width="size - 3"
        :height="size - 3"
        class="disabled"
        :style="cellDisabledStyle"
      />
    </template>
    <template v-else>
      <rect
        :x="x"
        :y="y"
        :width="size - 3"
        :height="size - 3"
        class="cell"
        :style="cellStyle"
      />
      <template v-if="terminal">
        <rect
          :x="x + 5"
          :y="y + 5"
          :width="size - 13"
          :height="size - 13"
          class="inner"
        />
      </template>
      <text
        v-if="terminal"
        :x="x + size / 2.0"
        :y="y + size / 2.0"
        dominant-baseline="middle"
        text-anchor="middle"
        class="reward"
        :style="{
          fontSize: `${size / 80.0}em`
        }"
      >
        {{ reward }}
      </text>
    </template>
  </g>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Cell"
})
class Cell extends Vue {
  @Prop() x;
  @Prop() y;
  @Prop() size;
  @Prop() reward;
  @Prop() terminal;
  @Prop() disabled;
  @Prop({ default: false, type: Boolean }) selected;
  @Prop() onSelectToggle;

  get cellStyle() {
    const style = {
      fill: "#000"
    };
    if (this.selected) {
      return {
        style,
        ...this.selectedStyles
      };
    }
    return style;
  }

  get cellDisabledStyle() {
    if (this.selected) {
      return this.selectedStyles;
    }
    return {};
  }

  get selectedStyles() {
    return {
      stroke: "#F44336",
      strokeWidth: "3"
    };
  }
}

export default Cell;
</script>

<style scoped lang="scss">
.cell-container {
  cursor: pointer;
  user-select: none;
}

.cell {
  stroke-width: 2;
  stroke: #fff;
}

.disabled {
  fill: gray;
  stroke-width: 1;
  stroke: #fff;
}

.inner {
  fill: transparent;
  stroke-width: 1;
  stroke: #fff;
}

.reward {
  fill: #fff;
}
</style>
