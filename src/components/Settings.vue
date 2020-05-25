<template>
  <div>
    <div class="empty-overlay" @mouseup="onMouseUp" @mousemove="onMouseMove" />
    <div
      class="settings"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
      :style="{ height: `${height}px` }"
    >
      <div class="handler" @mousedown="onMouseDown" />
      <div class="content">
        Hello footer
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
  height = 60;
  resizing = false;

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
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  resize: vertical;
  min-height: 40px;
  max-height: 50%;
  z-index: 2;
  background: #fff;

  .content {
    padding: 0.8em;
  }

  .handler {
    height: 4px;
    background-color: red;
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
