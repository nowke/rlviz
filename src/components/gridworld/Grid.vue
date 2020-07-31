<template>
  <div
    class="grid"
    v-if="grid && algo"
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
  config = this.$store.getters["grid/selectedGrid"];
  @Prop() grid;
  @Prop() algo;
  cancelRunSignalled = false;
  actionSub = null;
  mutationSub = null;

  get cellSize() {
    return this.$store.getters.cellSize;
  }

  created() {
    this.actionSub = this.$store.subscribeAction(async action => {
      if (action.type === "algorithm/runIterations") {
        await this.iter(action.payload);
      } else if (action.type === "algorithm/cancelRun") {
        this.cancelRun();
      } else if (action.type === "algorithm/runIterationsMode") {
        await this.iter(action.payload.iter, action.payload.mode);
      } else if (action.type === "algorithm/callMethod") {
        await this.algo[action.payload.method](...action.payload.params);
      }
    });
    this.mutationSub = this.$store.subscribe(mutation => {
      if (
        mutation.type === "initialValue" &&
        this.$store.getters["algorithm/itersSoFar"] === 0 &&
        !isNaN(parseFloat(mutation.payload))
      ) {
        this.algo.resetInitial(parseFloat(mutation.payload));
        this.$forceUpdate();
      }
    });
  }

  beforeDestroy() {
    if (this.actionSub) this.actionSub();
    if (this.mutationSub) this.mutationSub();
  }

  async iter(iterations, mode = null) {
    for (let i = 1; i <= iterations; i++) {
      await this.algo.run(1, mode);
      this.$store.dispatch("algorithm/incrementIteration");
      this.$store.commit("algorithm/addToValueHistory", this.algo.metric());
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
      return `${i},${j}`;
    }
  }

  stateValue(state) {
    if (!this.grid.isDisallowed(state)) {
      return this.algo.value(state);
    }
    return 0.0;
  }

  statePolicy(state) {
    if (!this.grid.isDisallowed(state) && !this.grid.isTerminal(state)) {
      return this.algo.policy(state);
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
