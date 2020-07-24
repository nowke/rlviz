<template>
  <div v-if="chartData.length > -1">
    <span :style="{ display: 'block', marginBottom: '8px' }"
      >Avg. Value Change</span
    >
    <line-chart
      :data="chartData"
      width="100%"
      height="100%"
      curve
      :dataset="{
        pointRadius: 1
      }"
      :round="4"
      :library="{
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawOnChartArea: false
              }
            }
          ]
        }
      }"
    />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "IterationChart"
})
class IterationChart extends Vue {
  get chartData() {
    const valueHistory = this.$store.getters["algorithm/valueHistory"];
    let finalValues;
    if (valueHistory.length > 4) {
      finalValues = valueHistory;
    } else {
      const nullValues = Array.from(Array(4 - valueHistory.length), () => null);
      finalValues = [...valueHistory, ...nullValues];
    }
    return finalValues.map((value, i) => [`#${i + 1}`, value]);
  }
}

export default IterationChart;
</script>

<style lang="scss"></style>
