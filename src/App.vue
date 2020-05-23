<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Grid :config="config" />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { Component, Vue } from "vue-property-decorator";

import Grid from "@/components/gridworld/Grid.vue";

@Component({
  name: "App",
  components: {
    Grid
  }
})
class App extends Vue {
  config = {
    width: 6,
    height: 5,
    start: [1, 1],
    terminals: [
      [5, 5, 1],
      [5, 4, -1]
    ],
    disallowedStates: [[2, 3]],
    livingReward: -0.01,
    stochasticity: 0.8
  };
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
  margin-top: 60px;
}
body {
  background: #f0e7d8;
}
</style>
