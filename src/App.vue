<template>
  <div id="app" class="app">
    <NavFilter class="app__nav" @change-sort="changeSort" :type="sortType"/>
    <FamilyRender class="app__family" :family="familyTree"/>
  </div>
</template>

<script>
import 'normalize.css'
import familyTree from '@/assets/sample'
import { deepCopy } from '@/utils'

import FamilyRender from '@/components/FamilyRender'
import NavFilter from '@/components/NavFilter'

const sortings = {
  name: (a, b) => a.name > b.name,
  age: (a, b) => a.age - b.age
}

export default {
  name: 'app',
  components: {
    FamilyRender,
    NavFilter
  },
  data () {
    return {
      familyTree,
      sortType: null
    }
  },
  methods: {
    changeSort (type) {
      if (type === this.sortType) {
        this.sortType = null
        this.familyTree = familyTree
        return
      }

      const tree = deepCopy(familyTree).sort(sortings[type])
      this.familyTree = tree
      this.sortType = type
    }
  }
}
</script>

<style lang="stylus">
*,
*:after,
*:before
  box-sizing border-box

body
  background-color $grey
  font-family $font

.app
  display flex
  flex-flow column wrap
  height 100vh

  &__nav
    position relative
    z-index 1

  &__family
    flex 1 0 auto
</style>
