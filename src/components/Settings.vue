<template>
  <div class="settings-container">
    <div
      class="empty-overlay"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
      :style="{ zIndex: overlayZIndex }"
    />
    <div
      class="settings"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
      :style="{ height: `${height}px` }"
    >
      <div class="handler" @mousedown="onMouseDown" />
      <div class="content">
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
            <IterationChart />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import { toFloat } from "@/utils";
import IterationChart from "./IterationChart.vue";

@Component({
  name: "Settings",
  components: {
    IterationChart
  }
})
class Settings extends Vue {
  height = 260;
  resizing = false;
  overlayZIndex = -1;

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

  onMouseDown() {
    this.resizing = true;
    this.overlayZIndex = 0;
  }

  onMouseMove(e) {
    if (this.resizing) {
      this.height = window.innerHeight - e.pageY;
    }
  }

  onMouseUp() {
    this.resizing = false;
    this.overlayZIndex = -1;
  }
}

export default Settings;
</script>

<style lang="scss">
.settings {
  bottom: 0;
  left: 56px;
  position: fixed;
  width: 100%;
  min-height: 60px;
  max-height: 50%;
  z-index: 2;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  overflow-y: scroll;

  .content {
    padding: 0.6em 1.5em;
    text-align: left;
  }

  .handler {
    height: 4px;
    background-color: inherit;
    cursor: row-resize;
    user-select: none;
  }
}

.empty-overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
