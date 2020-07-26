<template>
  <v-card class="container">
    <div class="header">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div :style="{ maxWidth: '300px', margin: '0 2em' }">
        <v-text-field
          label="Grid Name"
          outlined
          dense
          hide-details
          :min="1"
          :step="1"
        />
      </div>
      <div :style="{ maxWidth: '100px', margin: '0 0.5em' }">
        <v-text-field
          type="number"
          label="Width"
          outlined
          dense
          hide-details
          :min="1"
          :step="1"
        />
      </div>
      <v-icon small>mdi-close</v-icon>
      <div :style="{ maxWidth: '100px', margin: '0 0.5em' }">
        <v-text-field
          type="number"
          label="Height"
          outlined
          dense
          hide-details
        />
      </div>
      <v-btn dense depressed text small>
        Generate
      </v-btn>
      <v-spacer />
      <v-btn dense depressed color="primary">
        Save
      </v-btn>
    </div>
    <div class="grid-content">
      <div class="grid-container">
        <div
          class="grid"
          v-if="grid"
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
                  :x="j * cellSize + 3"
                  :y="i * cellSize + 3"
                  :size="cellSize - 4"
                  :reward="grid.getReward(toState(i, j))"
                  :terminal="grid.isTerminal(toState(i, j))"
                  :disabled="grid.isDisallowed(toState(i, j))"
                  :style="{ padding: '2px' }"
                  :selected="selectedCells.includes(`${i},${j}`)"
                  :onSelectToggle="e => toggleSelectCell(e, i, j)"
                />
              </template>
            </template>
          </svg>
        </div>
      </div>
      <div class="cell-editor">
        Cells
      </div>
    </div>
  </v-card>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

import Cell from "./Cell.vue";
import { GRID_CLASSIC_4x3 } from "@/grids";
import GridWorld from "@/rl/grid_world";

@Component({
  name: "GridEditor",
  components: {
    Cell
  }
})
class GridEditor extends Vue {
  @Prop() close;
  grid = null;
  ctrlPressed = false;
  selectedCells = [];

  get cellSize() {
    return 80;
  }

  created() {
    this.grid = this.getGridWorld(GRID_CLASSIC_4x3);
  }

  getGridWorld(config) {
    return new GridWorld(
      config.width,
      config.height,
      config.start,
      config.terminals,
      config.disallowedStates,
      config.livingReward,
      config.stochasticity
    );
  }

  toState(i, j) {
    if (this.grid) {
      return [j + 1, this.grid.height - i];
    }
  }

  toggleSelectCell(e, i, j) {
    const element = `${i},${j}`;
    const index = this.selectedCells.indexOf(element);
    if (index >= 0) {
      this.selectedCells.splice(index, 1);
    } else if (e.metaKey) {
      this.selectedCells.push(element);
    } else {
      this.selectedCells = [element];
    }
  }
}

export default GridEditor;
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  height: 80px;
  background: #fff;
  padding: 0 2em;
  border-bottom-color: rgba(0, 0, 0, 0.12);
  border-width: 0 0 thin;
  border-style: solid;
}

.grid-content {
  flex: 1;
  display: flex;
  flex-direction: row;

  .grid-container {
    flex: 1;
    padding: 1em;

    .grid {
      margin: 0 auto;
    }
  }

  .cell-editor {
    padding: 5em 2em;
    border-left-color: rgba(0, 0, 0, 0.12);
    border-width: 0 0 0 thin;
    border-style: solid;
  }
}

svg {
  width: 100%;
  height: 100%;
}
</style>
