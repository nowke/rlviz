<template>
  <div id="app">
    <Header />
    <div class="grid-container">
      <Grid :config="config" :gridSize="gridSize" />
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";
import Grid from "@/components/gridworld/Grid.vue";

@Component({
  name: "App",
  components: {
    Grid,
    Header
  }
})
class App extends Vue {
  config = {
    width: 4,
    height: 3,
    start: [1, 1],
    terminals: [
      [4, 3, 1],
      [4, 2, -1]
    ],
    disallowedStates: [[2, 2]],
    livingReward: 0.0,
    stochasticity: 0.8
  };
  gridSize = 80;
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

.grid-container {
  margin-top: 60px;
}
</style>
