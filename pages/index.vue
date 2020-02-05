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
          type: 'age',
          subConditions: []
        },
        {
          type: 'type',
          subConditions: []
        },
        {
          type: 'status',
          subConditions: []
        },
        {
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
<style lang="sass" scoped>
  .container
    padding: 20px
</style>
