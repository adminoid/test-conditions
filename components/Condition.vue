<template lang="pug">
  div.condition
    b-form-input(v-model="conditionData.name" placeholder="Enter name")
    .sub-conditions(v-if="hasSubConditions")
      component(:is="subComponentName" v-for="(item, index) in conditionData.subConditions" :key="index" :subData="item" @delete-sub-condition="deleteSub")
    .no-sub-conditions(v-else) Not yet
    b-button(variant="outline-primary" @click="addSubCondition") Add sub condition
</template>
<script>
import { upperFirst } from 'lodash'
export default {
  name: 'Condition',
  components: {
    'SubConditionAge': () => import('~/components/SubConditionAge'),
    'SubConditionType': () => import('~/components/SubConditionType'),
    'SubConditionStatus': () => import('~/components/SubConditionStatus')
  },
  props: {
    conditionData: {
      type: Object,
      default () {
        return {
          name: 'Unknown',
          type: 'none',
          subConditions: []
        }
      }
    }
  },
  computed: {
    hasSubConditions () {
      return !!this.conditionData.subConditions.length && this.conditionData.type !== 'none'
    },
    /**
     * SubConditionAge, SubConditionType, SubConditionStatus
     * @returns {string}
     */
    subComponentName () {
      return `SubCondition${upperFirst(this.conditionData.type)}`
    }
  },
  methods: {
    addSubCondition () {
      this.conditionData.subConditions.push({
        type: this.conditionData.type,
        date: {}
      })
    },
    deleteSub (e) {
      this.conditionData.subConditions.splice(e.idxToDelete, 1)
    }
  }
}
</script>
