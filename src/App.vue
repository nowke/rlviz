<template>
  <v-app>
    <Header />
    <Controls />
    <div class="grid-container">
      <Grid :config="config" />
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

.grid-container {
  margin-top: 60px;
}

.bottom-nav {
  position: fixed;
}
</style>
