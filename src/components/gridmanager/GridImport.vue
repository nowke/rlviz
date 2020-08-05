<template>
  <v-card>
    <v-card-title class="text-left text-subtitle-1">
      Import Grid from JSON file
      <v-spacer />
      <v-icon @click="close" class="close-btn">
        mdi-close
      </v-icon>
    </v-card-title>
    <v-card-text :style="{ textAlign: 'left' }">
      <div @dragover.prevent @drop.prevent>
        <div
          class="file-dropper"
          @dragover="dragenter"
          @dragleave="dragleave"
          @drop="importGrid"
          :style="{ color: dropColor }"
          @click="$refs.file.click()"
        >
          <v-progress-circular
            v-if="imorting"
            indeterminate
            :size="50"
            color="primary"
          />
          <div class="text-body-1" v-else>
            Drop Grid JSON file here or click to upload.
          </div>
        </div>
      </div>
    </v-card-text>

    <v-snackbar
      v-model="error"
      top
      app
      :timeout="6000"
      color="error"
      :min-width="600"
    >
      <span>
        Invalid Grid JSON file! Failed to import grid.
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <input
      type="file"
      accept=".json"
      ref="file"
      :style="{ display: 'none' }"
      v-on:change="uploadGridFile"
    />
  </v-card>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

import { validateGrid } from "@/grids";
import { uuid } from "@/utils";

@Component({
  name: "GridImport"
})
class GridImport extends Vue {
  @Prop() close;
  @Prop() onImport;

  imorting = false;
  error = false;
  dropColor = "#000";

  dragenter() {
    this.dropColor = "rgba(0, 0, 0, 0.6)";
  }

  dragleave() {
    this.dropColor = "#000";
  }

  importGrid(e) {
    this.imorting = true;
    this.dragleave();
    const files = e.dataTransfer.files;
    if (!files) return;

    this.processGridFiles(files);
  }

  uploadGridFile(e) {
    this.imorting = true;
    const files = e.target.files;

    this.processGridFiles(files);
  }

  processGridFiles(files) {
    const f = files[0];
    if (f.type === "application/json") {
      const reader = new FileReader();
      reader.onload = fileEvent => {
        try {
          const grid = JSON.parse(fileEvent.target.result);
          if (validateGrid(grid)) {
            // Grid object is valid, add it to the store
            grid.id = uuid();
            this.$store.commit("grid/addGrid", grid);
            this.onImport(grid);
          } else {
            this.error = true;
          }
        } catch (err) {
          // JSON Parsing error
          this.error = true;
        } finally {
          this.imorting = false;
        }
      };

      reader.onerror = () => {
        this.error = true;
        this.imorting = false;
      };

      reader.readAsText(f);
    }
  }
}

export default GridImport;
</script>

<style lang="scss" scoped>
.close-btn {
  cursor: pointer;
}

.file-dropper {
  border: 1px dashed #000;
  border-radius: 4px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  cursor: pointer;
}
</style>
