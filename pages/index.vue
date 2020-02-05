<template lang="pug">
  .container
    h3 Add poll
    .conditions(v-if="!isEmpty")
      condition(v-for="condition in conditions" :key="condition.id" :condition-data="condition" @erase-condition="deleteCondition")
        p {{ condition.name }}
    .no-conditions(v-else) Not yet
    b-button(variant="outline-primary" @click="addCondition") Add condition
</template>

<script>
import { maxBy, filter } from 'lodash'
import Condition from '~/components/Condition.vue'

export default {
  components: {
    Condition
  },

  data () {
    return {
      conditions: [
        {
          id: 0,
          type: 'age',
          subConditions: []
        },
        {
          id: 1,
          type: 'type',
          subConditions: []
        },
        {
          id: 2,
          type: 'status',
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
      const id = (this.conditions.length > 0) ? parseInt(maxBy(this.conditions, 'id').id) + 1 : 0
      this.conditions.push({
        id,
        type: 'none',
        subConditions: []
      })
    },
    deleteCondition (e) {
      this.conditions = filter(this.conditions, (item) => {
        return item.id !== e.idToDelete
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .container
    padding: 20px
</style>
