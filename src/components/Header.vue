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
      <v-dialog
        v-model="showGridEditor"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        v-on:keydown="() => {}"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" small dense>
            New Grid
          </v-btn>
        </template>
        <GridEdior :close="closeGridEditor" />
      </v-dialog>
    </div>
  </header>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";

import GridEdior from "@/components/grideditor/GridEditor.vue";

const VALUE_ITERATION = {
  value: "VALUE_ITERATION",
  text: "Value Iteration"
};

@Component({
  name: "Header",
  components: {
    GridEdior
  }
})
class Header extends Vue {
  algorithms = [VALUE_ITERATION];
  algorithm = VALUE_ITERATION;

  grids = this.$store.getters["grid/defaultGridChoices"].map((g, i) => ({
    value: i,
    text: g.name
  }));
  grid = this.$store.getters["grid/currentGridIndex"];

  showGridEditor = false;

  @Watch("grid")
  onGridChange(val) {
    this.$store.dispatch("changeGrid", val);
  }

  closeGridEditor() {
    this.showGridEditor = false;
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
