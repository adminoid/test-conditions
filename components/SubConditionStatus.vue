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
  name: 'SubConditionStatus',

  mixins: [SCMixin],

  data () {
    return {
      selected: null,
      options: [
        { value: null, text: 'disabled' },
        { value: 'active', text: 'Active' }
      ]
    }
  },
  methods: {
    erase () {
      this.$emit('delete-sub-condition', { idToDelete: this.$vnode.key })
    }
  }
}
</script>
<style lang="sass" scoped>
  .inputs
    margin-right: 10px
</style>
