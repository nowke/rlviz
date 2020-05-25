<template>
  <div class="settings-container">
    <div class="empty-overlay" @mouseup="onMouseUp" @mousemove="onMouseMove" />
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
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Footer"
})
class Footer extends Vue {
  height = 260;
  resizing = false;

  get mode() {
    return this.$store.getters.mode;
  }

  set mode(value) {
    this.$store.commit("setMode", value);
  }

  get cellSize() {
    return this.$store.getters.cellSize;
  }

  set cellSize(value) {
    this.$store.commit("setCellSize", value);
  }

  onMouseDown() {
    this.resizing = true;
  }

  onMouseMove(e) {
    if (this.resizing) {
      this.height = window.innerHeight - e.pageY;
    }
  }

  onMouseUp() {
    this.resizing = false;
  }
}

export default Footer;
</script>

<style lang="scss">
.settings {
  bottom: 0;
  left: 0;
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
