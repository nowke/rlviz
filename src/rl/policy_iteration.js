import { delay } from "@/utils";
import { IterativeAlgorithm } from "./algorithm";

class PolicyIteration extends IterativeAlgorithm {
  constructor(grid, gamma, initial_value = 0.0) {
    super(grid, gamma, initial_value);
    this.policy_changes = 0;
  }

  policy(state) {
    return this.states[state].policy;
  }

  setPolicy(state, policy) {
    this.states[state].policy = policy;
  }

  async run(iterations, mode = null) {
    if (mode === "eval") {
      await this.evaluatePolicy(100);
    } else if (mode === "update") {
      this.policyUpdate();
    } else {
      for (let i = 1; i <= iterations; i++) {
        // 1. Policy Evaluation
        await this.evaluatePolicy(100);

        // 2. Policy Improvement
        this.policyUpdate();
      }
    }
  }

  async evaluatePolicy(delayMs = 100) {
    const DELTA = 0.001;
    let diff = Number.MAX_VALUE;

    while (diff > DELTA) {
      let maxDiff = Number.MIN_VALUE;

      // Calculate values
      const values = [];
      for (const state of Object.keys(this.grid.states)) {
        const previousValue = this.value(state);
        const action = this.policy(state);
        const transitions = this.grid.getTransitions(state, action);
        if (!transitions.length) continue;
        const value = this._getStateValue(transitions);
        values.push({ state, value });

        const valueDiff = Math.abs(previousValue - value);

        if (valueDiff > maxDiff) {
          maxDiff = valueDiff;
        }

        diff = Math.min(diff, maxDiff);
      }

      // Set new state values
      for (const { state, value } of values) {
        this.setValue(state, value);
      }

      // Delay
      await delay(delayMs);
    }
  }

  policyUpdate() {
    this.policy_changes = 0; // Reset policy changes

    // Calculate new policies
    const policies = [];
    for (const state of Object.keys(this.grid.states)) {
      let maxQValue = Number.NEGATIVE_INFINITY;
      let maxAction = null;

      for (const action of this.grid.actions) {
        const transitions = this.grid.getTransitions(state, action);
        const value = this._getStateValue(transitions);
        if (value > maxQValue) {
          maxQValue = value;
          maxAction = action;
        }
      }

      policies.push({ state, action: maxAction });
    }

    // Update policy
    for (const { state, action } of policies) {
      const previousAction = this.policy(state);
      if (previousAction !== action) {
        this.policy_changes += 1;
      }

      this.setPolicy(state, action);
    }
  }

  metric() {
    return this.policy_changes;
  }

  _initializeState() {
    const defaultAction = this.grid.actions[0];
    const states = {};
    for (const state of Object.keys(this.grid.states)) {
      states[state] = {
        value: this.initial_value,
        policy: this.grid.isTerminal(state) ? null : defaultAction
      };
    }
    this.states = states;
  }
}

export default PolicyIteration;
