<template>
  <div class="grid">
    <svg>
      <template v-for="i in Array(gridX).keys()">
        <template v-for="j in Array(gridY).keys()">
          <Cell
            :key="`${i},${j}`"
            :x="j * gridSize"
            :y="i * gridSize"
            :size="gridSize"
            :reward="-0.01"
            :value="Math.random() - Math.random()"
            :terminal="Math.random() > 0.95 ? true : false"
            :disabled="Math.random() > 0.8 ? true : false"
            mode="policy"
            policy="up"
          />
        </template>
      </template>
    </svg>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import valueIteration from "@/rl/value_iteration";

import Cell from "./Cell.vue";

@Component({
  name: "Grid",
  components: {
    Cell
  }
})
class Grid extends Vue {
  gridX = 8;
  gridY = 8;
  gridSize = 65;

  mounted() {
    valueIteration();
  }
}

export default Grid;
</script>

<style scoped lang="scss">
.grid {
  width: 520px;
  height: 520px;
  border: 1px solid black;
  margin: 0 auto;
}

svg {
  width: 100%;
  height: 100%;
}
</style>
