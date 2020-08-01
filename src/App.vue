<template>
  <v-app>
    <div>
      <NavDrawer />
      <GridWorldContainer v-show="page === 'home'" />
      <GridManager v-show="page === 'grids'" />
    </div>
  </v-app>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import "splitpanes/dist/splitpanes.css";

import NavDrawer from "@/components/NavDrawer.vue";
import GridWorldContainer from "@/components/gridworld/GridWorldContainer.vue";
import GridManager from "@/components/gridmanager/GridManager.vue";

@Component({
  name: "App",
  components: {
    NavDrawer,
    GridWorldContainer,
    GridManager
  }
})
class App extends Vue {
  page = "home";

  created() {
    this.$store.subscribe(mutation => {
      if (mutation.type === "page") {
        this.page = mutation.payload;
      }
    });
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

.bottom-nav {
  position: fixed;
}
</style>
