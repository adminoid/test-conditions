<template lang="pug">
  div
    b-form(inline)
      .inputs
        b-form-select(v-model="selected" :options="options")
      b-button(variant="danger" @click="erase")
        b-icon-trash
</template>

<script>
import SCMixin from '~/mixins/subConditionMixin'

export default {
  name: 'SubConditionType',

  mixins: [SCMixin],

  data () {
    return {
      selected: null,
      options: [
        { value: null, text: 'select card type' },
        { value: 'gold', text: 'Gold' },
        { value: 'silver', text: 'Silver' },
        { value: 'copper', text: 'Copper' }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
  .inputs
    margin-right: 10px
</style>
