<template>
  <fragment>
    <Controls />
    <div class="grid-wrapper">
      <Grid :grid="grid" :algo="algo" />
    </div>
    <Settings />
  </fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { Component, Prop, Vue } from "vue-property-decorator";

import Controls from "@/components/algorithm/common/Controls.vue";
import Settings from "@/components/Settings.vue";
import Grid from "@/components/gridworld/Grid.vue";

@Component({
  name: "ValueIterRenderer",
  components: {
    Fragment,
    Controls,
    Grid,
    Settings
  }
})
class Renderer extends Vue {
  @Prop() grid;
  @Prop() algo;
}

export default Renderer;
</script>

<style lang="scss">
.grid-wrapper {
  margin-top: 60px;
}
</style>
