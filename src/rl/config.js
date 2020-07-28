import PolicyIteration from "./policy_iteration";
import ValueIteration from "./value_iteration";

export default {
  policy_iter: {
    name: "Policy Iteration",
    key: "policy_iter",
    component: "PolicyIterRenderer",
    class: PolicyIteration
  },
  value_iter: {
    name: "Value Iteration",
    key: "value_iter",
    component: "ValueIterRenderer",
    class: ValueIteration
  }
};
