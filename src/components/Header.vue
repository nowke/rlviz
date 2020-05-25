<template>
  <header>
    <div class="config-selector">
      <span class="title">Select algorithm</span>
      <!-- <VueSelect
        v-model="algorithm"
        button-class="flat"
        :label="algorithm.label"
        class="dropdown"
      >
        <VueSelectButton
          :value="algorithms.VALUE_ITERATION"
          :label="algorithms.VALUE_ITERATION.label"
        />
      </VueSelect> -->
    </div>
    <div class="config-selector">
      <span class="title">Select grid</span>
      <!-- <VueSelect
        v-model="grid"
        button-class="flat"
        :label="grid.label"
        class="dropdown"
      >
        <VueSelectButton :value="grids.GRID_1" :label="grids.GRID_1.label" />
      </VueSelect> -->
    </div>
  </header>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

const VALUE_ITERATION = {
  value: "VALUE_ITERATION",
  label: "Value Iteration"
};
const GRID_1 = {
  value: "GRID_1",
  label: "Custom Grid 1 (4x3)"
};

@Component({
  name: "Header"
})
class Header extends Vue {
  algorithms = { VALUE_ITERATION };
  algorithm = VALUE_ITERATION;

  grids = { GRID_1 };
  grid = GRID_1;
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
  height: 40px;
  z-index: 1;
  background: #fff;
  border-bottom-color: rgba(0, 0, 0, 0.12);
  border-width: 0 0 thin;
  border-style: solid;
}

.config-selector {
  display: flex;
  align-items: baseline;
  flex-direction: column;
  margin-right: 4em;

  .dropdown {
    border-width: thin;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.12);
  }

  .title {
    font-size: 0.9em;
    font-weight: 500;
    margin: 2px 0;
  }
}
</style>
