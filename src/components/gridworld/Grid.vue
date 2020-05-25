<template>
  <div
    class="grid"
    v-if="grid && vi"
    :style="{
      width: `${grid.width * gridSize}px`,
      height: `${grid.height * gridSize}px`
    }"
  >
    <svg>
      <template v-for="i in Array(grid.height).keys()">
        <template v-for="j in Array(grid.width).keys()">
          <Cell
            :key="`${i},${j}`"
            :x="j * gridSize"
            :y="i * gridSize"
            :size="gridSize"
            :reward="grid.getReward(toState(i, j))"
            :value="stateValue(toState(i, j))"
            :terminal="grid.isTerminal(toState(i, j))"
            :disabled="grid.isDisallowed(toState(i, j))"
            :policy="statePolicy(toState(i, j))"
            mode="value"
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
  @Prop() gridSize;
  _grid = null;
  _vi = null;

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
    this.vi.run(4);
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
