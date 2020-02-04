<template lang="pug">
  .container
    h3 Add poll
    .conditions(v-if="!isEmpty")
      condition(v-for="(condition, index) in conditions" :key="index" :condition-data="condition")
        p {{ condition.name }}
    .no-conditions(v-else) Not yet
    b-button(variant="outline-primary" @click="addCondition") Add condition
</template>

<script>
import Condition from '~/components/Condition.vue'
export default {
  components: {
    Condition
  },
  data () {
    return {
      conditions: [
        {
          name: 'condition 1',
          type: 'age',
          subConditions: []
        },
        {
          name: 'condition 2',
          type: 'type',
          subConditions: []
        },
        {
          name: 'condition 3',
          type: 'status',
          subConditions: ['one', 'two', 'three']
        },
        {
          name: 'condition 3',
          type: 'none',
          subConditions: []
        }
      ]
    }
  },
  computed: {
    isEmpty () {
      return !this.conditions.length
    }
  },
  methods: {
    addCondition () {
      return true
    }
  }
}
</script>
