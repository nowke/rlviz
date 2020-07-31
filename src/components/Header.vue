<template>
  <header>
    <div class="config-selector">
      <v-select
        :disabled="$store.getters['algorithm/running']"
        v-model="algorithm"
        :items="algorithms"
        outlined
        dense
        label="Select algorithm"
        class="select"
        return-object
      />
      <v-select
        :disabled="$store.getters['algorithm/running']"
        v-model="grid"
        :items="grids"
        outlined
        dense
        label="Select grid"
        class="select"
      />
    </div>
  </header>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";

import algorithms from "@/rl/config";

@Component({
  name: "Header"
})
class Header extends Vue {
  algorithms = Object.entries(algorithms).map(([value, { name }]) => ({
    value,
    text: name
  }));
  algorithm = this.$store.getters["algorithm/name"];

  grids = [];
  grid = this.$store.getters["grid/selectedGridId"];

  @Watch("grid")
  onGridChange(gridId) {
    this.$store.dispatch("changeGrid", gridId);
  }

  @Watch("algorithm")
  onAlgorithmChange(val) {
    this.$store.dispatch("changeAlgorithm", val);
  }

  created() {
    this.setGrids();
    this.$store.subscribe(mutation => {
      if (
        mutation.type === "grid/addGrid" ||
        mutation.type === "grid/removeGrid" ||
        mutation.type === "grid/updateGrid"
      ) {
        this.setGrids();
      }
    });
  }

  setGrids() {
    const grids = this.$store.getters["grid/grids"];
    this.grids = Object.keys(grids).map(grid => ({
      value: grid,
      text: grids[grid].name
    }));
  }
}

export default Header;
</script>

<style scoped lang="scss">
header {
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 80px;
  z-index: 1;
  background: #fff;
  border-bottom-color: rgba(0, 0, 0, 0.12);
  border-width: 0 0 thin;
  border-style: solid;
}

.config-selector {
  display: flex;
  align-items: baseline;
  flex-direction: row;
  margin-top: 1.25em;

  .select {
    margin-right: 2em;
    text-align: left;
  }
}
</style>
