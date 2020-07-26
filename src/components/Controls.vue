<template>
  <div>
    <v-progress-linear
      :active="$store.getters['algorithm/running']"
      absolute
      :value="iterProgressPerc"
      :height="2"
    />
    <div class="controls-container">
      <div class="controls">
        <span class="mr-3">Run #Iterations:</span>
        <v-btn
          v-for="iteration in iterationChoices"
          :key="iteration"
          depressed
          dense
          small
          class="iterations"
          :disabled="$store.getters['algorithm/running']"
          @click="$store.dispatch('algorithm/runIterations', iteration)"
        >
          <v-icon left small>mdi-play</v-icon> {{ iteration }}
        </v-btn>
        <div class="ml-4">
          <v-text-field
            v-model="iterations"
            :disabled="$store.getters['algorithm/running']"
            outlined
            hide-details
            type="number"
            :step="1"
            class="control-input play"
          />
        </div>
        <v-btn
          depressed
          dense
          small
          class="play-btn ml-2"
          :disabled="$store.getters['algorithm/running']"
          @click="
            iterations > 0 &&
              $store.dispatch('algorithm/runIterations', iterations)
          "
        >
          <v-icon left small>mdi-play</v-icon>
        </v-btn>

        <span class="ml-5 mr-3">Iteration Delay: </span>
        <div>
          <v-text-field
            :disabled="$store.getters['algorithm/running']"
            v-model="delay"
            outlined
            hide-details
            type="number"
            :step="1"
            suffix="ms"
            class="control-input delay"
          />
        </div>
      </div>
      <v-btn
        :disabled="!$store.getters['algorithm/running']"
        @click="$store.dispatch('algorithm/cancelRun')"
        small
        depressed
        dense
      >
        <v-icon left small>mdi-stop</v-icon>
        Stop
      </v-btn>
      <v-btn
        :disabled="$store.getters['algorithm/running']"
        @click="$store.dispatch('algorithm/reset')"
        small
        depressed
        dense
      >
        <v-icon left small>mdi-restore</v-icon>
        Reset
      </v-btn>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Controls"
})
class Controls extends Vue {
  iterationChoices = [1, 5, 10, 100];

  get iterations() {
    return this.$store.getters.iterations;
  }

  set iterations(value) {
    this.$store.commit("iterations", value);
  }

  get delay() {
    return this.$store.getters.delay;
  }

  set delay(value) {
    this.$store.commit("delay", value);
  }

  get iterProgressPerc() {
    const current = this.$store.getters["algorithm/currentIter"];
    const total = this.$store.getters["algorithm/currentRunTotalIters"];
    if (total === 0) {
      return 0;
    }
    return (current * 100) / total;
  }
}

export default Controls;
</script>

<style lang="scss">
.controls-container {
  display: flex;
  align-items: baseline;
  flex-direction: row;
  padding: 0.2em 1em;

  .v-btn {
    margin-left: 5px;
  }
}

.controls {
  display: flex;
  align-items: baseline;
  justify-content: center;
  padding: 0.4em 1em;
  flex-direction: row;
  flex: 1;

  .iterations {
    margin-left: 0.2em;
    margin-right: 0.2em;
  }

  .control-input {
    input {
      font-size: 0.9rem !important;
      padding: 6px 0 2px;
    }
    .v-input__slot {
      min-height: 24px !important;
    }
    .fieldset {
      top: -10px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  }

  .control-input.play .v-input__slot {
    width: 70px;
  }

  .control-input.delay .v-input__slot {
    width: 100px;
  }

  .play-btn {
    .v-icon--left {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
}
</style>
