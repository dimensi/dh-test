<template>
  <div id="app" class="app">
    <FamilyRender :family="familyTree"/>
  </div>
</template>

<script>
import 'normalize.css'
import familyTree from '@/assets/sample'

import FamilyRender from '@/components/FamilyRender'

export default {
  name: 'app',
  components: {
    FamilyRender
  },
  data () {
    return {
      familyTree
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
  background $grey
  font-family 'Roboto', sans-serif

.app
  display flex
  flex-wrap wrap
  height 100vh
</style>
