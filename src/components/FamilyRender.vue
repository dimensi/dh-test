<template>
  <main class="family-render">
    <FamilyBlock v-for="(parent, index) in path"
      class="family-render__item"
      :family="family"
      :parent="parent"
      :active-member-id="path[index + 1]"
      :key="index"
      @click="changePath($event, index)"/>
  </main>
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
      const alreadyHave = this.path.findIndex(id => id === member.id) !== -1
      const newPath = [...this.path.slice(0, parentIndex + 1)]
      if (!alreadyHave) newPath.push(member.id)

      this.path = newPath
      this.updateRoute(newPath)
    },
    updateRoute (path) {
      const url = new URL(location)
      if (path.length < 2) {
        url.search = ''
      } else {
        url.searchParams.set('path', path)
      }

      history.pushState(path, '', url.toString())
    },
    setPathFromQs () {
      const url = new URL(location)
      const path = url.searchParams.get('path')
      if (path == null) return

      const arrPath = path.replace(/^,/, '').split(',').map(Number)
      this.path = [null, ...arrPath]
    }
  },
  created () {
    this.setPathFromQs()
    const changePath = e => {
      this.path = Array.isArray(e.state) ? e.state : [null]
    }
    window.addEventListener('popstate', changePath)
    this.$emit('hook:destroyed', () => {
      window.removeEventListener('popstate', changePath)
    })
  }
}
</script>

<style lang="stylus">
.family-render
  display flex

  &__item
    flex 0 0 auto
</style>
