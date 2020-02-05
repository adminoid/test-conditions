<template lang="pug">

  div.condition(:style="{ background: backgroundColor }")
    b-form-select(v-model="conditionData.type" :options="options" class="col-5 select-condition")
    .sub-conditions(v-if="hasSubConditions")
      component(:is="subComponentName" v-for="item in conditionData.subConditions" :key="item.id" :subData="item" @delete-sub-condition="deleteSub" class="sub-condition")
    .sub-conditions(v-else) Not yet
    .buttons
      b-button(:disabled="disabledAddSubCondition" variant="outline-primary" @click="addSubCondition") {{ addSubConditionButtonText }}
      b-button(variant="outline-danger" @click="eraseCondition") Delete condition

</template>

<script>

import { filter, maxBy, upperFirst } from 'lodash'

const attributesDependsOnType = {
  none: {
    color: '#FAFAFA',
    addSubBtn: 'none'
  },
  age: {
    color: '#FFFCF5',
    addSubBtn: 'range'
  },
  type: {
    color: '#F8FAFF',
    addSubBtn: 'type'
  },
  status: {
    color: '#FAFFF8',
    addSubBtn: 'status'
  }
}

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
    disabledAddSubCondition () {
      return this.conditionData.type === 'none'
    },
    addSubConditionButtonText () {
      return (this.conditionData.type === 'none') ? `Select condition first` : `Add ${attributesDependsOnType[this.conditionData.type].addSubBtn}`
    },
    backgroundColor () {
      return attributesDependsOnType[this.conditionData.type].color
    }
  },

  watch: {
    'conditionData.type' (newValue) {
      if (newValue === 'none') {
        this.conditionData.subConditions = []
      } else {
        this.conditionData.subConditions = [{
          id: 0
        }]
      }
    }
  },

  methods: {
    addSubCondition () {
      const id = (this.conditionData.subConditions.length > 0) ? parseInt(maxBy(this.conditionData.subConditions, 'id').id) + 1 : 0
      this.conditionData.subConditions.push({
        id,
        type: this.conditionData.type,
        date: {}
      })
    },
    deleteSub (e) {
      this.conditionData.subConditions = filter(this.conditionData.subConditions, (item) => {
        return item.id !== e.idToDelete
      })
    },
    eraseCondition () {
      this.$emit('erase-condition', { idToDelete: this.$vnode.key })
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
