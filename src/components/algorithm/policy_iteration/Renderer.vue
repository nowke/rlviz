<template>
  <splitpanes class="default-theme split-pane-container" horizontal>
    <pane size="60" :style="{ overflowY: 'auto' }">
      <Controls />
      <div>
        <v-btn
          depressed
          dense
          small
          class="mx-2"
          @click="
            $store.dispatch('algorithm/callMethod', {
              method: 'evaluatePolicy',
              params: []
            })
          "
        >
          Policy Evaluation
        </v-btn>
        <v-btn
          depressed
          dense
          small
          class="mx-2"
          @click="
            $store.dispatch('algorithm/runIterationsMode', {
              iter: 1,
              mode: 'update'
            })
          "
        >
          Policy Update
        </v-btn>
      </div>
      <div class="grid-wrapper">
        <Grid :grid="grid" :algo="algo" />
      </div>
    </pane>
    <pane size="40" max-size="70" min-size="5" :style="{ overflowY: 'auto' }">
      <Settings graphTitle="No. of Policy changes" />
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
  name: "PolicyIterRenderer",
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
