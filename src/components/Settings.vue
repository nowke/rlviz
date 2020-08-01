<template>
  <div class="settings">
    <v-row>
      <v-col :cols="4">
        <div class="config">
          <p>Display mode</p>
          <v-btn-toggle
            v-model="mode"
            mandatory
            borderless
            color="primary"
            class="mb-4"
          >
            <v-btn value="value">Value</v-btn>
            <v-btn value="reward">Reward</v-btn>
            <v-btn value="policy">Policy</v-btn>
          </v-btn-toggle>

          <p>Cell size</p>
          <v-btn-toggle
            v-model="cellSize"
            mandatory
            borderless
            color="primary"
            class="mb-4"
          >
            <v-btn :value="80">S</v-btn>
            <v-btn :value="100">M</v-btn>
            <v-btn :value="120">L</v-btn>
          </v-btn-toggle>
        </div>
      </v-col>

      <v-col :cols="4">
        <p>Parameters</p>
        <v-text-field
          :disabled="$store.getters['algorithm/running']"
          v-model="gamma"
          type="number"
          :min="0"
          :max="1"
          :step="0.01"
          label="Discount Factor (γ)"
          :style="{ width: '60%' }"
          outlined
          dense
        />

        <v-text-field
          :disabled="$store.getters['algorithm/running']"
          v-model="noise"
          type="number"
          :min="0"
          :max="1"
          :step="0.1"
          label="Noise"
          :style="{ width: '60%' }"
          outlined
          dense
        />

        <v-text-field
          :disabled="$store.getters['algorithm/running']"
          v-model="initialValue"
          type="number"
          :min="0"
          :max="1"
          :step="0.01"
          label="Initial State Values"
          :style="{ width: '60%' }"
          outlined
          dense
        />
      </v-col>

      <v-col :cols="4">
        <IterationChart :title="graphTitle" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

import { toFloat } from "@/utils";
import IterationChart from "./IterationChart.vue";

@Component({
  name: "Settings",
  components: {
    IterationChart
  }
})
class Settings extends Vue {
  @Prop() graphTitle;

  get mode() {
    return this.$store.getters.mode;
  }

  set mode(value) {
    this.$store.commit("mode", value);
  }

  get cellSize() {
    return this.$store.getters.cellSize;
  }

  set cellSize(value) {
    this.$store.commit("cellSize", value);
  }

  get gamma() {
    return this.$store.getters.gamma;
  }

  set gamma(value) {
    this.$store.commit("gamma", toFloat(value));
  }

  get noise() {
    return this.$store.getters.noise;
  }

  set noise(value) {
    this.$store.commit("noise", toFloat(value));
  }

  get initialValue() {
    return this.$store.getters.initialValue;
  }

  set initialValue(value) {
    this.$store.commit("initialValue", toFloat(value));
  }
}

export default Settings;
</script>

<style lang="scss">
.settings {
  width: 100%;
  z-index: 2;
  background: #fff;
  padding: 0.6em 1.5em;
  text-align: left;
}
</style>
