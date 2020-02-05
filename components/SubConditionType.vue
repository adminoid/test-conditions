<template lang="pug">
  div
    b-form(inline)
      .inputs
        b-form-select(v-model="selected" :options="options")
      b-button(variant="danger" @click="erase")
        b-icon-trash
</template>
<script>
import { BIcon, BIconTrash } from 'bootstrap-vue'
export default {
  name: 'SubConditionType',
  components: {
    BIcon,
    BIconTrash
  },
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
