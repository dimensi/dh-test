<template>
  <article class="family-block">
    <h1 class="family-block__title">{{ parentName }}</h1>
    <Member v-for="member in members"
      class="family-block__member"
      :member="member"
      :family="family"
      :key="member.id"
      @click="$emit('click', $event)"/>
  </article>
</template>

<script>
import Member from '@/components/Member'

export default {
  name: 'family-block',
  components: {
    Member
  },
  props: {
    parent: Number,
    family: Array
  },
  computed: {
    parentName () {
      if (this.parent === null) return 'Root'
      const member = this.family.find(member => member.id === this.parent)
      return member.name
    },
    members () {
      return this.family.filter(member => member.parentId === this.parent)
    }
  }
}
</script>

<style lang="stylus">
.family-block
  display block
  padding 20px 40px
  min-width 250px
  box-shadow 5px 0px 10px rgba(0, 0, 0, 0.25)

  &__title
    margin 0
    font-size 24px
    color $red
    line-height 1
    font-weight 900
    margin-bottom 20px
</style>
