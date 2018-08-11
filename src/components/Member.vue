<template>
  <component :is="typeComponent" class="member" v-on="on" v-bind="bind">
    <div class="member__name">
      {{ member.name }}
    </div>
    <div class="member__age">
      {{ member.age }}
    </div>
  </component>
</template>

<script>
export default {
  name: 'member',
  props: {
    member: Object,
    family: Array,
    active: Boolean
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
    },
    bind () {
      return {
        class: {
          'member--have_child': this.haveChildren,
          'member--active': this.active
        }
      }
    },
    typeComponent () {
      return this.haveChildren ? 'a' : 'div'
    }
  }
}
</script>

<style lang="stylus">
.member
  display flex
  flex-wrap wrap
  padding 15px 20px
  background white
  border-radius 5px

  &__name
    width 100%
    color $blue
    font-size 24px
    font-weight 500
    line-height 1
    margin-bottom 10px

  &__age
    width 100%
    font-size 24px
    font-weight 500
    line-height 1
    text-align right
    color $red

  &--have_child
    background $yellow
    cursor pointer
    transition transform 0.3s

  &--have_child:hover,
  &--active
    transform translateX(20px)
</style>
