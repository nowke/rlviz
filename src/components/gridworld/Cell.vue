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
      <text
        v-if="policy"
        :x="policyConfig.x"
        :y="policyConfig.y"
        :dominant-baseline="policyConfig.baseline"
        :text-anchor="policyConfig.anchor"
        class="policy-small"
      >
        {{ policyConfig.text }}
      </text>
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
  _policyConfig;

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

  get policyConfig() {
    if (!this.policy) return null;

    const padding = 3;
    if (!this._policyConfig) {
      const configs = {
        U: {
          text: "▲",
          x: this.x + this.size / 2.0,
          y: this.y + padding,
          anchor: "middle",
          baseline: "hanging"
        },
        D: {
          text: "▼",
          x: this.x + this.size / 2.0,
          y: this.y + this.size - padding,
          anchor: "middle",
          baseline: "ideographic"
        },
        L: {
          text: "◀",
          x: this.x + padding,
          y: this.y + this.size / 2.0,
          anchor: "start",
          baseline: "middle"
        },
        R: {
          text: "▶",
          x: this.x + this.size - padding,
          y: this.y + this.size / 2.0,
          anchor: "end",
          baseline: "middle"
        }
      };
      this._policyConfig = configs[this.policy];
    }
    return this._policyConfig;
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

.policy-small {
  font-size: 0.8em;
  fill: #fff;
}
</style>
