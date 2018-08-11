<template>
  <nav class="nav-filter">
    <h1 class="nav-filter__title">Sort</h1>
    <button class="nav-filter__button"
      v-for="button in buttons"
      :class="setClass(button.type)"
      @click="$emit('change-sort', button.type)"
      :key="button.type">{{ button.title }}</button>
  </nav>
</template>

<script>
export default {
  name: 'nav-filter',
  props: {
    type: String
  },
  data () {
    return {
      buttons: [
        { type: 'name', title: 'By name' },
        { type: 'age', title: 'By age' }
      ]
    }
  },
  methods: {
    setClass (type) {
      return {
        'nav-filter__button--active': type === this.type
      }
    }
  }
}
</script>

<style lang="stylus">
.nav-filter
  display flex
  flex-wrap wrap
  align-items center
  width 100%
  height 40px
  padding 10px 20px
  background-color $light-grey

  &__title
    margin 0
    font-size 18px
    color $red
    margin-right 10px
    line-height 1

  &__button
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

  &__button:hover,
  &__button--active
    background-color $blue

  &__button + &__button
    margin-left 10px
</style>
