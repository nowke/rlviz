<template>
  <v-navigation-drawer
    v-model="show"
    expand-on-hover
    absolute
    :style="{ zIndex: 3 }"
    class="nav-drawer"
  >
    <v-list-item class="px-2">
      <v-list-item-avatar color="primary">
        <v-icon dark>mdi-blur</v-icon>
      </v-list-item-avatar>

      <v-list-item-title>GridWorld RL</v-list-item-title>
    </v-list-item>

    <v-divider />

    <v-list dense>
      <v-list-item-group v-model="item">
        <v-list-item :key="0">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :key="1">
          <v-list-item-icon>
            <v-icon>mdi-border-all</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Grid Manager</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "NavDrawer"
})
class NavDrawer extends Vue {
  show = true;
  item = 0;

  @Watch("item")
  onItemChange(item) {
    let page;
    switch (item) {
      case 0:
        page = "home";
        break;
      case 1:
        page = "grids";
        break;
    }
    this.$store.commit("page", page);
  }
}

export default NavDrawer;
</script>

<style lang="scss" scoped>
.nav-drawer {
  text-align: left;
}
</style>
