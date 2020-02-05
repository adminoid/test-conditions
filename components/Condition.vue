<template lang="pug">
  div.condition
    b-form-select(v-model="conditionData.type" :options="options" class="col-5 select-condition")
    .sub-conditions(v-if="hasSubConditions")
      component(:is="subComponentName" v-for="(item, index) in conditionData.subConditions" :key="index" :subData="item" @delete-sub-condition="deleteSub" class="sub-condition")
    .sub-conditions(v-else) Not yet
    .buttons
      b-button(:disabled="canAddSubCondition" variant="outline-primary" @click="addSubCondition") Add sub condition
      b-button(variant="outline-danger" @click="eraseCondition") Delete condition

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
  data () {
    return {
      options: [
        { value: 'none', text: 'Select condition' },
        { value: 'age', text: 'Age' },
        { value: 'type', text: 'Card type' },
        { value: 'status', text: 'Card status' }
      ]
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
    },
    canAddSubCondition () {
      return this.conditionData.type === 'none'
    }
  },
  watch: {
    'conditionData.type' (newValue) {
      if (newValue === 'none') {
        this.conditionData.subConditions = []
      } else {
        this.conditionData.subConditions = [{}]
      }
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
    },
    eraseCondition () {
      this.$emit('erase-condition', { idxToDelete: this.$vnode.key })
    }
  }
}
</script>
<style lang="sass" scoped>
  .select-condition, .condition, .sub-condition, .sub-conditions
    margin-bottom: 10px
  .condition
    border: 1px solid #000
    padding: 10px
    border-radius: .25rem
  .buttons
    display: flex
    justify-content: space-between
</style>
