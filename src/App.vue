<template>
  <div id="app" class="app">
    <NavFilter class="app__nav" @change-sort="changeSort" :type="sortType">
      <ButtonUi theme="red"
        class="app__drop"
        v-if="loadedTree"
        @click="dropTree">Drop loaded data</ButtonUi>
    </NavFilter>
    <JsonHandler class="app__family" @update="updateTree">
      <FamilyRender :family="familyTree" :sort="sortType"/>
    </JsonHandler>
  </div>
</template>

<script>
import 'normalize.css'
import defaultFamilyTree from '@/assets/sample'
import jsonSaver from '@/services/jsonSaver'

import FamilyRender from '@/components/FamilyRender'
import JsonHandler from '@/components/JsonHandler'
import NavFilter from '@/components/NavFilter'
import ButtonUi from '@/components/ButtonUi'

export default {
  name: 'app',
  components: {
    FamilyRender,
    NavFilter,
    JsonHandler,
    ButtonUi
  },
  data () {
    const loadedTree = jsonSaver.get()
    return {
      loadedTree: loadedTree,
      sortType: null
    }
  },
  computed: {
    familyTree () {
      return this.loadedTree || defaultFamilyTree
    }
  },
  methods: {
    changeSort (type) {
      this.sortType = type === this.sortType ? null : type
    },

    updateTree (data) {
      this.loadedTree = data
      jsonSaver.save(data)
    },

    dropTree () {
      this.loadedTree = null
      jsonSaver.remove()
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

  &__drop
    margin-left 10px
</style>
