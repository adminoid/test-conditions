<template lang="pug">

  div.wrapper
    b-form(inline)
      .inputs
        b-input(v-model="subData.from" class="mb-2 mr-sm-2 mb-sm-0")
        b-input(v-model="subData.to") &nbsp;
      b-button(variant="danger" @click="erase")
        b-icon-trash

</template>
<script>
import SCMixin from '~/mixins/subConditionMixin'

export default {
  mixins: [SCMixin],

  props: {
    subData: {
      type: Object,
      default () {
        return {}
      }
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
  .wrapper
    margin-bottom: 10px
</style>
