<template>
  <main class="family-render">
    <FamilyBlock v-for="(parent, index) in path"
      class="family-render__item"
      :family="currentFamily"
      :parent="parent"
      :active-member-id="path[index + 1]"
      :key="index"
      @click="changePath($event, index)"/>
  </main>
</template>

<script>
import FamilyBlock from '@/components/FamilyBlock'

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

const sortings = {
  name: (a, b) => a.name > b.name,
  age: (a, b) => a.age - b.age
}

export default {
  name: 'family-render',
  props: {
    family: Array,
    sort: String
  },
  components: {
    FamilyBlock
  },
  data () {
    return {
      path: [null]
    }
  },
  computed: {
    currentFamily () {
      if (this.sort === null) {
        return this.family
      }

      return deepCopy(this.family).sort(sortings[this.sort])
    }
  },
  watch: {
    family (fm) {
      this.path = [null]
      this.updateRoute(this.path)
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
