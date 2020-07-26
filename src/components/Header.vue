<template>
  <header>
    <div class="config-selector">
      <v-select
        class="select"
        v-model="algorithm"
        :items="algorithms"
        outlined
        dense
        label="Select algorithm"
      />
      <v-select
        class="select"
        v-model="grid"
        :items="grids"
        outlined
        dense
        label="Select grid"
      />
    </div>
  </header>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";

const VALUE_ITERATION = {
  value: "VALUE_ITERATION",
  text: "Value Iteration"
};

@Component({
  name: "Header"
})
class Header extends Vue {
  algorithms = [VALUE_ITERATION];
  algorithm = VALUE_ITERATION;

  grids = this.$store.getters["grid/defaultGridChoices"].map((g, i) => ({
    value: i,
    text: g.name
  }));
  grid = this.$store.getters["grid/currentGridIndex"];

  @Watch("grid")
  onGridChange(val) {
    this.$store.dispatch("changeGrid", val);
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
