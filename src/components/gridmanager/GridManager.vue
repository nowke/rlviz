<template>
  <div class="grid-manager">
    <div class="container">
      <v-row>
        <v-col :cols="6">
          <h2>Grid Manager</h2>
        </v-col>
        <v-col :cols="6" :style="{ display: 'flex' }">
          <v-spacer />
          <v-btn @click="importGrid" dense depressed class="mr-2">
            <v-icon small class="mr-1">mdi-upload</v-icon>
            Import Grid
          </v-btn>
          <v-btn
            @click="
              () => {
                isGridEdit = false;
                gridToEdit = null;
                showGridEditor = true;
              }
            "
            dense
            depressed
            color="primary"
          >
            <v-icon small class="mr-1">mdi-plus</v-icon>
            New Grid
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="grids"
        disable-pagination
        hide-default-footer
        class="elevation-1 mt-2"
      >
        <template v-slot:no-data>
          No custom grids found. Click <strong>"New Grid"</strong> to create
          one!
        </template>
        <template v-slot:item.configuration="{ item }">
          {{ item.width }} &times; {{ item.height }}
        </template>
        <template v-slot:item.actions="{ item }">
          <template v-if="item.editable">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="() => exportGrid(item)"
                  v-on="on"
                  v-bind="attrs"
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </template>
              <span>Export Grid [JSON]</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="
                    () => {
                      isGridEdit = true;
                      gridToEdit = item;
                      showGridEditor = true;
                    }
                  "
                  v-on="on"
                  v-bind="attrs"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit Grid</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="() => showDeleteDialog(item)"
                  v-on="on"
                  v-bind="attrs"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete Grid</span>
            </v-tooltip>
          </template>
        </template>
      </v-data-table>
    </div>

    <v-snackbar
      v-model="snackbar"
      top
      app
      :timeout="6000"
      color="primary"
      :min-width="600"
    >
      {{ snackMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="deleteDialog" v-if="gridToDelete" max-width="350">
      <v-card>
        <v-card-title class="text-left text-subtitle-1">
          Are you sure you want to delete grid <br />
          '{{ gridToDelete.name }}'?
        </v-card-title>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn text color="error" @click="deleteGrid">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="showGridEditor"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-on:keydown="() => {}"
    >
      <GridEdior
        v-if="showGridEditor"
        :close="closeGridEditor"
        :onSave="onGridSave"
        :onUpdate="onGridUpdate"
        :edit="isGridEdit"
        :gridConfig="gridToEdit || undefined"
      />
    </v-dialog>
    <v-dialog v-model="showGridImporter" max-width="500" persistent>
      <GridImport
        v-if="showGridImporter"
        :close="
          () => {
            showGridImporter = false;
          }
        "
        :onImport="onGridSave"
      />
    </v-dialog>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import GridEdior from "@/components/grideditor/GridEditor.vue";
import GridImport from "./GridImport.vue";
import { DEFAULT_GRIDS } from "@/grids";
import { downloadJSON } from "@/utils";

@Component({
  name: "GridManager",
  components: {
    GridEdior,
    GridImport
  }
})
class GridManager extends Vue {
  headers = [
    {
      text: "Name",
      value: "name"
    },
    { text: "Configuration", value: "configuration", sortable: false },
    { text: "Actions", value: "actions", sortable: false }
  ];
  grids = [];

  showGridEditor = false;
  isGridEdit = false;
  gridToEdit = null;
  snackMsg = "";
  snackbar = false;

  deleteDialog = false;
  gridToDelete = null;

  showGridImporter = false;

  created() {
    this.$store.subscribe(mutation => {
      if (
        mutation.type === "grid/addGrid" ||
        mutation.type === "grid/removeGrid" ||
        mutation.type === "grid/updateGrid"
      ) {
        this.setGrids();
      }
    });
    this.setGrids();
  }

  closeGridEditor() {
    this.showGridEditor = false;
  }

  onGridSave(grid) {
    this.showGridEditor = false;
    this.showGridImporter = false;
    this.snackMsg = `Successfully added grid '${grid.name}'`;
    this.snackbar = true;
  }

  onGridUpdate(grid) {
    this.showGridEditor = false;
    this.snackMsg = `Successfully updated grid '${grid.name}'`;
    this.snackbar = true;
  }

  setGrids() {
    const grids = this.$store.getters["grid/grids"];
    this.grids = Object.keys(grids).map(grid => ({
      ...grids[grid],
      editable: !DEFAULT_GRIDS[grid]
    }));
  }

  showDeleteDialog(grid) {
    this.gridToDelete = grid;
    this.deleteDialog = true;
  }

  deleteGrid() {
    if (this.gridToDelete) {
      this.$store.commit("grid/removeGrid", this.gridToDelete.id);
      this.deleteDialog = false;
      this.snackMsg = `Successfully deleted grid '${this.gridToDelete.name}'`;
      this.snackbar = true;
    }
  }

  exportGrid(grid) {
    downloadJSON(grid, `Grid - ${grid.name}`);
  }

  importGrid() {
    this.showGridImporter = true;
  }
}

export default GridManager;
</script>

<style lang="scss" scoped>
.grid-manager {
  margin-left: 56px;
  text-align: left;
  padding: 1em 3em;
}

.container {
  margin: 0 auto;
  max-width: 1024px;
}
</style>
