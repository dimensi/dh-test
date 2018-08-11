<template>
  <button class="button-ui"
    :class="classes"
    @click="$emit('click', $event)"
    type="button"><slot/></button>
</template>

<script>
export default {
  name: 'button-ui',
  props: {
    theme: String,
    active: Boolean
  },
  computed: {
    classes () {
      return [
        this.theme && `button-ui--theme_${this.theme}`,
        this.active && 'button-ui--active'
      ]
    }
  }
}
</script>

<style lang="stylus">
.button-ui
  appearance none
  padding 5px 20px
  color white
  font-size 18px
  line-height 1
  background-color $blue + 30%
  font-family $font
  border none
  border-radius 5px
  transition background-color 0.3s
  cursor pointer

  &:hover,
  &--active
    background-color $blue

  &--theme_red
    background-color $red + 30%

  &--theme_red:hover,
  &--active.&--theme_red
    background-color $red
</style>
