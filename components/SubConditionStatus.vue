<template lang="pug">
  div
    b-form(inline)
      b-form-select(v-model="selected" :options="options")
      b-button(variant="danger" @click="erase")
        b-icon-trash
</template>
<script>
import { BIcon, BIconTrash } from 'bootstrap-vue'
export default {
  name: 'SubConditionStatus',
  components: {
    BIcon,
    BIconTrash
  },
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
      this.$emit('delete-sub-condition', { idxToDelete: this.$vnode.key })
    }
  }
}
</script>
