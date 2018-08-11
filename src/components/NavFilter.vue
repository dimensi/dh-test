<template>
  <nav class="nav-filter">
    <h1 class="nav-filter__title">Sort</h1>
    <ButtonUi class="nav-filter__button"
      v-for="button in buttons"
      :active="button.type === type"
      @click="$emit('change-sort', button.type)"
      :key="button.type">{{ button.title }}</ButtonUi>
    <slot></slot>
  </nav>
</template>

<script>
import ButtonUi from '@/components/ButtonUi'

export default {
  name: 'nav-filter',
  components: {
    ButtonUi
  },
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

  &__button + &__button
    margin-left 10px
</style>
