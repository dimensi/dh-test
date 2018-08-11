<template>
  <div class="member" v-on="on">
    <div class="member__name">
      {{ member.name }}
    </div>
    <div class="member__age">
      {{ member.age }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'member',
  props: {
    member: Object,
    family: Array
  },
  computed: {
    haveChildren () {
      return this.family.findIndex(child => child.parentId === this.member.id) !== -1
    },
    on () {
      if (!this.haveChildren) return

      return {
        click: () => this.$emit('click', this.member)
      }
    }
  }
}
</script>

<style lang="stylus">
.member
  display flex
  flex-wrap wrap
  padding 10px 20px
  &__name
    width 100%
    color $blue
    font-size 24px
    font-weight 500
    line-height 1
    margin-bottom 10px
  &__age
    text-align right
    color $red
</style>
