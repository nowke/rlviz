<template>
  <div :style="{ marginLeft: '56px' }">
    <Header />
    <component :is="component" :grid="grid" :algo="algo" />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";
import ValueIterRenderer from "@/components/algorithm/value_iteration/Renderer.vue";
import PolicyIterRenderer from "@/components/algorithm/policy_iteration/Renderer.vue";
import GridWorld from "@/rl/grid_world";
import algorithmConfig from "@/rl/config";

@Component({
  name: "GridWorldContainer",
  components: {
    Header,
    ValueIterRenderer,
    PolicyIterRenderer
  }
})
class GridWorldContainer extends Vue {
  config = this.$store.getters["grid/selectedGrid"];
  grid = null;
  algo = null;
  component =
    algorithmConfig[this.$store.getters["algorithm/name"].value].component;

  created() {
    const grid = this.getGridWorld(this.config);
    this.grid = grid;
    this.algo = this.getAlgorithmClass(grid);

    this.$store.subscribeAction(action => {
      if (action.type === "changeGrid") {
        const config = this.$store.getters["grid/grids"][action.payload];
        this.reset(config);
      } else if (action.type === "algorithm/reset") {
        this.reset(this.config);
      }
    });
    this.$store.subscribe(mutation => {
      if (mutation.type === "algorithm/name") {
        this.component = algorithmConfig[mutation.payload.value].component;
      } else if (
        mutation.type === "grid/updateGrid" &&
        mutation.payload.id === this.config.id
      ) {
        // The current grid got updated
        this.config = this.$store.getters["grid/grids"][mutation.payload.id];
        this.$store.dispatch("algorithm/reset");
      }
    });
  }

  getGridWorld(config) {
    return new GridWorld(config, 1 - this.$store.getters.noise);
  }

  getAlgorithmClass(grid) {
    const algorithmClass =
      algorithmConfig[this.$store.getters["algorithm/name"].value].class;
    return new algorithmClass(
      grid,
      this.$store.getters.gamma,
      this.$store.getters.initialValue
    );
  }

  reset(config) {
    this.config = config;
    const newGrid = this.getGridWorld(config);
    this.grid = newGrid;
    this.algo = this.getAlgorithmClass(newGrid);
  }
}

export default GridWorldContainer;
</script>
