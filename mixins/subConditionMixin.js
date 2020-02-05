import { BIcon, BIconTrash } from 'bootstrap-vue'

export default {

  components: {
    BIcon,
    BIconTrash
  },

  methods: {
    erase () {
      this.$emit('delete-sub-condition', { idToDelete: this.$vnode.key })
    }
  }
}
