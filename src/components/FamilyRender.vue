<template>
  <div class="family-render">
    <FamilyBlock v-for="(parent, index) in path"
      class="family-render__item"
      :family="family"
      :parent="parent"
      :key="index"
      @click="changePath($event, index)"/>
  </div>
</template>

<script>
import FamilyBlock from '@/components/FamilyBlock'

export default {
  name: 'family-render',
  props: {
    family: Array
  },
  components: {
    FamilyBlock
  },
  data () {
    return {
      path: [null]
    }
  },
  methods: {
    changePath (member, parentIndex) {
      this.path = [...this.path.slice(0, parentIndex + 1), member.id]
    }
  }
}
</script>

<style lang="stylus">
.family-render
  display flex

  &__item
    flex 0 0 auto
</style>
