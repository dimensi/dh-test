<template>
  <div id="app" class="app">
    <NavFilter class="app__nav" @change-sort="changeSort" :type="sortType"/>
    <JsonHandler class="app__family" @update="updateTree">
      <FamilyRender :family="familyTree"/>
    </JsonHandler>
  </div>
</template>

<script>
import 'normalize.css'
import familyTree from '@/assets/sample'
import { deepCopy } from '@/utils'

import FamilyRender from '@/components/FamilyRender'
import JsonHandler from '@/components/JsonHandler'
import NavFilter from '@/components/NavFilter'

const sortings = {
  name: (a, b) => a.name > b.name,
  age: (a, b) => a.age - b.age
}

export default {
  name: 'app',
  components: {
    FamilyRender,
    NavFilter,
    JsonHandler
  },
  data () {
    return {
      loadedTree: null,
      familyTree,
      sortType: null
    }
  },
  computed: {
    currentDefaultTree () {
      return this.loadedTree || familyTree
    }
  },
  methods: {
    changeSort (type) {
      if (type === this.sortType) {
        this.sortType = null
        this.familyTree = this.currentDefaultTree
        return
      }

      const tree = deepCopy(this.currentDefaultTree).sort(sortings[type])
      this.familyTree = tree
      this.sortType = type
    },

    updateTree (data) {
      console.log(data)
      this.loadedTree = data
      this.familyTree = data
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
    display flex
</style>
