<template>
  <div class="grid-manager">
    <div class="container">
      <v-row>
        <v-col :cols="6">
          <h2>Grid Manager</h2>
        </v-col>
        <v-col :cols="6">
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
            class="float-right"
          >
            <v-icon>mdi-plus</v-icon>
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
          <v-btn
            icon
            @click="
              () => {
                isGridEdit = true;
                gridToEdit = item;
                showGridEditor = true;
              }
            "
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="() => showDeleteDialog(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
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
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import GridEdior from "@/components/grideditor/GridEditor.vue";

@Component({
  name: "GridManager",
  components: {
    GridEdior
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
  grids = this.$store.getters["grid/grids"].map((grid, index) => ({
    ...grid,
    index
  }));

  showGridEditor = false;
  isGridEdit = false;
  gridToEdit = null;
  snackMsg = "";
  snackbar = false;

  deleteDialog = false;
  gridToDelete = null;

  created() {
    this.$store.subscribe(mutation => {
      if (
        mutation.type === "grid/addGrid" ||
        mutation.type === "grid/removeGrid" ||
        mutation.type === "grid/updateGrid"
      ) {
        this.reloadGrids();
      }
    });
  }

  closeGridEditor() {
    this.showGridEditor = false;
  }

  onGridSave(grid) {
    this.showGridEditor = false;
    this.snackMsg = `Successfully added grid '${grid.name}'`;
    this.snackbar = true;
  }

  onGridUpdate(grid) {
    this.showGridEditor = false;
    this.snackMsg = `Successfully updated grid '${grid.name}'`;
    this.snackbar = true;
  }

  reloadGrids() {
    this.grids = this.$store.getters["grid/grids"].map((grid, index) => ({
      ...grid,
      index
    }));
  }

  showDeleteDialog(grid) {
    this.gridToDelete = grid;
    this.deleteDialog = true;
  }

  deleteGrid() {
    if (this.gridToDelete) {
      this.$store.commit("grid/removeGrid", this.gridToDelete.index);
      this.deleteDialog = false;
      this.snackMsg = `Successfully deleted grid '${this.gridToDelete.name}'`;
      this.snackbar = true;
    }
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
