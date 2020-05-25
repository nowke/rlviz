<template>
  <div
    class="grid"
    v-if="grid && vi"
    :style="{
      width: `${grid.width * cellSize}px`,
      height: `${grid.height * cellSize}px`
    }"
  >
    <svg>
      <template v-for="i in Array(grid.height).keys()">
        <template v-for="j in Array(grid.width).keys()">
          <Cell
            :key="`${i},${j}`"
            :x="j * cellSize"
            :y="i * cellSize"
            :size="cellSize"
            :reward="grid.getReward(toState(i, j))"
            :value="stateValue(toState(i, j))"
            :terminal="grid.isTerminal(toState(i, j))"
            :disabled="grid.isDisallowed(toState(i, j))"
            :policy="statePolicy(toState(i, j))"
            :mode="$store.getters.mode"
          />
        </template>
      </template>
    </svg>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

import GridWorld from "@/rl/grid_world";
import ValueIteration from "@/rl/value_iteration";
import Cell from "./Cell.vue";

@Component({
  name: "Grid",
  components: {
    Cell
  }
})
class Grid extends Vue {
  @Prop() config;
  _grid = null;
  _vi = null;

  get cellSize() {
    return this.$store.getters.cellSize;
  }

  get grid() {
    if (!this._grid) {
      this._grid = new GridWorld(
        this.config.width,
        this.config.height,
        this.config.start,
        this.config.terminals,
        this.config.disallowedStates,
        this.config.livingReward,
        this.config.stochasticity
      );
    }
    return this._grid;
  }

  get vi() {
    if (!this._vi) {
      this._vi = new ValueIteration(this.grid, 0.9);
    }
    return this._vi;
  }

  created() {
    this.iter();
  }

  async iter() {
    const timer = ms => new Promise(res => setTimeout(res, ms));
    for (let i = 1; i <= 5; i++) {
      this.vi.run(1);
      this.$forceUpdate();
      await timer(100);
    }
  }

  toState(i, j) {
    if (this.grid) {
      return [j + 1, this.grid.height - i];
    }
  }

  stateValue(state) {
    if (!this.grid.isDisallowed(state)) {
      return this.vi.value(state);
    }
    return 0.0;
  }

  statePolicy(state) {
    if (!this.grid.isDisallowed(state) && !this.grid.isTerminal(state)) {
      return this.vi.policy(state);
    }
  }
}

export default Grid;
</script>

<style scoped lang="scss">
.grid {
  border: 1px solid black;
  margin: 0 auto;
}

svg {
  width: 100%;
  height: 100%;
}
</style>
