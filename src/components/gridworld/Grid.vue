<template>
  <div
    class="grid"
    v-if="grid"
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
            :value="Math.random() - Math.random()"
            :terminal="grid.isTerminal(toState(i, j))"
            :disabled="grid.isDisallowed(toState(i, j))"
            mode="reward"
            policy="up"
          />
        </template>
      </template>
    </svg>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import GridWorld from "@/rl/grid_world";

import Cell from "./Cell.vue";

@Component({
  name: "Grid",
  components: {
    Cell
  }
})
class Grid extends Vue {
  @Prop() config;
  gridX = 8;
  gridY = 8;
  gridSize = 65;
  _grid = null;

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

  created() {
    console.clear();
    console.log(this.grid);
    console.log(this.grid.width, this.grid.height);
  }

  toState(i, j) {
    if (this.grid) {
      return [j + 1, this.grid.height - i];
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
