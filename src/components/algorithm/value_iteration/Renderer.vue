<template>
  <splitpanes class="default-theme split-pane-container" horizontal>
    <pane size="60" :style="{ overflowY: 'auto' }">
      <Controls />
      <div class="grid-wrapper">
        <Grid :grid="grid" :algo="algo" />
      </div>
    </pane>
    <pane size="40" max-size="70" min-size="5" :style="{ overflowY: 'auto' }">
      <Settings graphTitle="Avg. Value Change" />
    </pane>
  </splitpanes>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import { Component, Prop, Vue } from "vue-property-decorator";

import Controls from "@/components/algorithm/common/Controls.vue";
import Settings from "@/components/Settings.vue";
import Grid from "@/components/gridworld/Grid.vue";

@Component({
  name: "ValueIterRenderer",
  components: {
    Controls,
    Grid,
    Settings,
    Splitpanes,
    Pane
  }
})
class Renderer extends Vue {
  @Prop() grid;
  @Prop() algo;
}

export default Renderer;
</script>

<style lang="scss" scoped>
.grid-wrapper {
  margin-top: 20px;
  margin-bottom: 40px;
}

.split-pane-container {
  flex: 1 1 auto;

  .splitpanes__pane {
    background-color: #fff !important;
  }
}
</style>
