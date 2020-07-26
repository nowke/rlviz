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

import { delay } from "@/utils";
import Cell from "./Cell.vue";

@Component({
  name: "Grid",
  components: {
    Cell
  }
})
class Grid extends Vue {
  config = this.$store.getters["grid/currentGrid"];
  @Prop() grid;
  @Prop() vi;
  cancelRunSignalled = false;

  get cellSize() {
    return this.$store.getters.cellSize;
  }

  created() {
    this.$store.subscribeAction(action => {
      if (action.type === "algorithm/runIterations") {
        this.iter(action.payload);
      } else if (action.type === "algorithm/cancelRun") {
        this.cancelRun();
      }
    });
    this.$store.subscribe(mutation => {
      if (
        mutation.type === "initialValue" &&
        this.$store.getters["algorithm/itersSoFar"] === 0 &&
        !isNaN(parseFloat(mutation.payload))
      ) {
        this.vi.resetInitial(parseFloat(mutation.payload));
        this.$forceUpdate();
      }
    });
  }

  async iter(iterations) {
    for (let i = 1; i <= iterations; i++) {
      this.vi.run(1);
      this.$store.dispatch("algorithm/incrementIteration");
      this.$store.commit("algorithm/addToValueHistory", this.vi.value_diff);
      this.$forceUpdate();
      await delay(this.$store.getters.delay);

      if (this.cancelRunSignalled) {
        this.cancelRunSignalled = false;
        break;
      }
    }
    this.$store.dispatch("algorithm/finishIteration");
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

  cancelRun() {
    this.cancelRunSignalled = true;
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
