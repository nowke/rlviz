<template>
  <g>
    <template v-if="disabled">
      <rect :x="x" :y="y" :width="size" :height="size" class="disabled" />
    </template>
    <template v-else>
      <rect
        :x="x"
        :y="y"
        :width="size"
        :height="size"
        class="cell"
        :style="{ fill: cellColor }"
      />
      <template v-if="terminal">
        <rect
          :x="x + 5"
          :y="y + 5"
          :width="size - 10"
          :height="size - 10"
          class="inner"
        />
      </template>
      <text
        :x="x + size / 2.0"
        :y="y + size / 2.0"
        dominant-baseline="middle"
        text-anchor="middle"
        class="reward"
        v-if="mode === 'reward'"
      >
        r = {{ reward }}
      </text>
      <text
        :x="x + size / 2.0"
        :y="y + size / 2.0"
        dominant-baseline="middle"
        text-anchor="middle"
        class="value"
        v-if="mode === 'value'"
      >
        {{ value.toFixed(2) }}
      </text>
      <Arrow
        v-if="mode === 'policy' && !terminal && policy"
        :direction="policy"
        :x="x"
        :y="y"
        :size="size"
      />
    </template>
  </g>
</template>

<script>
import chroma from "chroma-js";
import { Component, Prop, Vue } from "vue-property-decorator";

import Arrow from "./Arrow.vue";

@Component({
  name: "Cell",
  components: {
    Arrow
  }
})
class Cell extends Vue {
  @Prop() x;
  @Prop() y;
  @Prop() size;
  @Prop() reward;
  @Prop() values;
  @Prop() value;
  @Prop() terminal;
  @Prop() disabled;
  @Prop() mode;
  @Prop() policy;

  get cellColor() {
    if (!this.value) return "#000";

    if (this.value >= 0) {
      return chroma
        .scale(["black", "#10ac84"])(this.value)
        .hex();
    } else {
      return chroma
        .scale(["black", "#ee5253"])(-this.value)
        .hex();
    }
  }
}

export default Cell;
</script>

<style scoped lang="scss">
.cell {
  stroke-width: 1;
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
  font-size: 0.8em;
}

.value {
  fill: #fff;
  font-size: 1em;
  font-weight: bold;
}
</style>
