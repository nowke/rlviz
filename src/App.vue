<template>
  <v-app>
    <Header />
    <Controls />
    <div class="grid-wrapper">
      <Grid :grid="grid" :vi="vi" />
    </div>
    <Settings />
  </v-app>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import Controls from "@/components/Controls.vue";
import Header from "@/components/Header.vue";
import Settings from "@/components/Settings.vue";
import Grid from "@/components/gridworld/Grid.vue";
import GridWorld from "@/rl/grid_world";
import ValueIteration from "@/rl/value_iteration";

@Component({
  name: "App",
  components: {
    Controls,
    Grid,
    Header,
    Settings
  }
})
class App extends Vue {
  config = this.$store.getters["grid/currentGrid"];
  grid = null;
  vi = null;

  created() {
    const grid = this.getGridWorld(this.config);
    this.grid = grid;
    this.vi = this.getValueIter(grid);

    this.$store.subscribeAction(action => {
      if (action.type === "changeGrid") {
        const choices = this.$store.getters["grid/defaultGridChoices"];
        const config = choices[action.payload];
        this.reset(config);
      } else if (action.type === "algorithm/reset") {
        this.reset(this.config);
      }
    });
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

  getValueIter(grid) {
    return new ValueIteration(
      grid,
      this.$store.getters.gamma,
      this.$store.getters.initialValue
    );
  }

  reset(config) {
    this.config = config;
    const newGrid = this.getGridWorld(config);
    this.grid = newGrid;
    this.vi = this.getValueIter(newGrid);
  }
}

export default App;
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #fff;
}

html {
  overflow-y: auto !important;
}

.grid-wrapper {
  margin-top: 60px;
}

.bottom-nav {
  position: fixed;
}
</style>
