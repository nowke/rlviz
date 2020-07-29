<template>
  <v-card class="container">
    <div class="header">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div :style="{ maxWidth: '300px', margin: '0 2em' }">
        <v-text-field
          v-model="gridName"
          label="Grid Name*"
          outlined
          dense
          hide-details
        />
      </div>
      <div :style="{ maxWidth: '100px', margin: '0 0.5em' }">
        <v-text-field
          v-model="gridWidth"
          type="number"
          label="Width"
          outlined
          dense
          hide-details
          :min="2"
          :max="12"
          :step="1"
        />
      </div>
      <v-icon small>mdi-close</v-icon>
      <div :style="{ maxWidth: '100px', margin: '0 0.5em' }">
        <v-text-field
          v-model="gridHeight"
          type="number"
          label="Height"
          outlined
          dense
          hide-details
          :min="2"
          :max="12"
          :step="1"
        />
      </div>
      <v-btn dense depressed text small @click="generate">
        Generate
      </v-btn>
      <v-spacer />
      <v-btn
        dense
        depressed
        color="primary"
        :disabled="!valid || saving"
        :loading="saving"
        @click="save"
      >
        Save
      </v-btn>
    </div>

    <div class="grid-content">
      <div class="grid-container">
        <div
          class="grid"
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
                  :reward="grid.states[`${i},${j}`].reward"
                  :terminal="grid.states[`${i},${j}`].terminal"
                  :disabled="grid.states[`${i},${j}`].disabled"
                  :style="{ padding: '2px' }"
                  :selected="grid.states[`${i},${j}`].selected"
                  :onSelectToggle="e => toggleSelectCell(e, i, j)"
                />
              </template>
            </template>
          </svg>
        </div>
      </div>

      <div class="cell-editor">
        <div
          class="mb-4"
          :style="{
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box'
          }"
        >
          <v-btn
            @click="selectAll"
            :disabled="
              Object.keys(selectedCells).length ===
                Object.keys(grid.states).length
            "
            small
            dense
            depressed
            class="mr-1"
          >
            Select All
          </v-btn>
          <v-btn
            @click="deselectAll"
            :disabled="Object.keys(selectedCells).length === 0"
            small
            dense
            depressed
            class="ml-1"
          >
            Deselect All
          </v-btn>
        </div>
        <template v-if="Object.keys(selectedCells).length > 0">
          <p>
            <v-icon class="mr-2">mdi-check</v-icon>
            {{ Object.keys(selectedCells).length }} Cell(s) selected
          </p>

          <svg :style="{ height: 'auto' }">
            <Cell
              :x="3"
              :y="3"
              :size="cellSize * 2 - 8"
              :reward="selectedCellProps.reward"
              :terminal="selectedCellProps.terminal"
              :disabled="!selectedCellProps.enabled"
              :style="{ padding: '2px' }"
              :selected="false"
              :onSelectToggle="() => {}"
            />
          </svg>
          <v-switch
            :disabled="selectedCellProps.terminal"
            v-model="selectedCellProps.enabled"
            inset
            dense
            hide-details
            label="Allowed"
          />
          <v-switch
            :disabled="!selectedCellProps.enabled"
            v-model="selectedCellProps.terminal"
            inset
            dense
            hide-details
            label="Terminal State"
          />
          <v-text-field
            :disabled="!selectedCellProps.terminal"
            v-model="selectedCellProps.reward"
            class="mt-5"
            label="Terminal Reward"
            type="number"
            outlined
            dense
            hide-details
          />
        </template>

        <template v-else>
          <p>Click on any cell(s) to customize properties</p>
        </template>
      </div>
    </div>

    <v-snackbar
      v-model="showConfigError"
      top
      app
      :timeout="6000"
      color="#E57373"
      :min-width="600"
      :style="{ paddingTop: '80px' }"
    >
      Dimensions must be between <code>2x2</code> and <code>12x12</code>

      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="showConfigError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import Cell from "./Cell.vue";
import { DEFAULT_GRID_CONFIG } from "@/grids";

@Component({
  name: "GridEditor",
  components: {
    Cell
  }
})
class GridEditor extends Vue {
  @Prop() close;
  @Prop() onSave;

  grid = DEFAULT_GRID_CONFIG;
  gridWidth = DEFAULT_GRID_CONFIG.width;
  gridHeight = DEFAULT_GRID_CONFIG.height;
  gridName = DEFAULT_GRID_CONFIG.name;
  selectedCells = {};
  selectedCellProps = {
    terminal: false,
    enabled: false,
    reward: 0
  };
  showConfigError = false;
  saving = false;

  get cellSize() {
    return 80;
  }

  get valid() {
    // Validates grid configurations
    return (
      this.gridName.trim() &&
      this.grid.width > 1 &&
      this.grid.width < 13 &&
      this.grid.height > 1 &&
      this.grid.height < 13
    );
  }

  @Watch("selectedCellProps", { immediate: true, deep: true })
  onSelectedCellPropsChange(vals) {
    // Iterate through selected cells
    for (const cell of Object.keys(this.selectedCells)) {
      this.grid.states[cell].terminal = vals.terminal;
      this.grid.states[cell].disabled = !vals.enabled;
      this.grid.states[cell].reward = vals.reward;
    }
  }

  toggleSelectCell(e, i, j) {
    const cell = `${i},${j}`;
    if (this.selectedCells[cell]) {
      // Cell already selected, remove it
      delete this.selectedCells[cell];
      this.grid.states[cell].selected = false;
    } else if (e.metaKey) {
      // Ctrl/Cmd is pressed, append cell to the selected list
      this.selectedCells[cell] = true;
      this.grid.states[cell].selected = true;
    } else {
      // Cell was not selected => this should be the only cell selected
      // (1) Unselect previously selected cells
      for (const c of Object.keys(this.selectedCells)) {
        this.grid.states[c].selected = false;
      }

      // (2) Select the current cell
      this.selectedCells = { [cell]: true };
      this.grid.states[cell].selected = true;

      // (3) Apply the current cell props to selected cell
      this.selectedCellProps.terminal = this.grid.states[cell].terminal;
      this.selectedCellProps.enabled = !this.grid.states[cell].disabled;
      this.selectedCellProps.reward = this.grid.states[cell].reward;
    }
  }

  generate() {
    const width = parseInt(this.gridWidth, 10);
    const height = parseInt(this.gridHeight, 10);

    // Validate
    if (width < 2 || width > 12 || height < 2 || height > 12) {
      this.showConfigError = true;
      return;
    }

    // Generate `grid`
    const grid = { name: this.gridName, width, height, states: {} };
    for (const i of Array(height).keys()) {
      for (const j of Array(width).keys()) {
        grid.states[`${i},${j}`] = {
          selected: false,
          terminal: false,
          disabled: false,
          reward: 0
        };
      }
    }

    this.selectedCells = {};
    this.grid = grid;
  }

  toState(i, j) {
    if (this.grid) {
      return [j + 1, this.grid.height - i];
    }
  }

  selectAll() {
    for (const c of Object.keys(this.grid.states)) {
      this.grid.states[c].selected = true;
      this.selectedCells[c] = true;
    }
  }

  deselectAll() {
    for (const c of Object.keys(this.grid.states)) {
      this.grid.states[c].selected = false;
    }
    this.selectedCells = {};
  }

  save() {
    this.saving = true;
    // Gete Terminal & Disabled states
    const terminals = [];
    const disallowedStates = [];
    for (const c of Object.keys(this.grid.states)) {
      const props = this.grid.states[c];
      const rowcols = c.split(",").map(i => parseInt(i, 10));
      const state = this.toState(rowcols[0], rowcols[1]);

      if (props.terminal) {
        terminals.push([state[0], state[1], props.reward]);
      } else if (props.disabled) {
        disallowedStates.push([state[0], state[1]]);
      }
    }

    // Convert `grid` into standard format
    const grid = {
      name: this.gridName,
      width: this.grid.width,
      height: this.grid.height,
      livingReward: 0, // TODO: Move this
      stochasticity: 0.8, // TODO: Move this
      terminals,
      disallowedStates
    };

    // Save grid
    this.$store.commit("grid/addGrid", grid);
    this.saving = false;
    this.reset();
    this.onSave(grid);
  }

  reset() {
    this.grid = DEFAULT_GRID_CONFIG;
    this.gridWidth = DEFAULT_GRID_CONFIG.width;
    this.gridHeight = DEFAULT_GRID_CONFIG.height;
    this.gridName = DEFAULT_GRID_CONFIG.name;
    this.selectedCells = {};
    this.selectedCellProps = {
      terminal: false,
      enabled: false,
      reward: 0
    };
  }
}

export default GridEditor;
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: unset;
  height: 100%;
  overflow: hidden;

  > * {
    flex: 0 0 auto;
    overflow: auto;
  }
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
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;

  .grid-container {
    flex: 1;
    padding: 1em;
    overflow: auto;

    .grid {
      margin: 0 auto;
    }
  }

  .cell-editor {
    flex: 0 1 auto;
    max-width: 300px;
    width: 100%;
    padding: 3em 2em;
    border-left-color: rgba(0, 0, 0, 0.12);
    border-width: 0 0 0 thin;
    border-style: solid;
    text-align: left;
    overflow: auto;
  }
}

svg {
  width: 100%;
  height: 100%;
}
</style>
