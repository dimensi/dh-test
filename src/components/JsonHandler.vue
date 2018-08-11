<template>
  <div class="json-handler"
    @dragenter="enter"
    @dragover="enter"
    @dragleave="leave"
    @drop="handleFile">
    <slot/>
    <div class="json-handler__area" :class="areaClasses">
      {{ text }}
    </div>
  </div>
</template>

<script>
const isJson = file => file.type === 'application/json'
const isValid = data => Array.isArray(data)
const errors = {
  nothing: 'You drop nothing, try again...',
  notJson: 'Need drop json file.',
  parseError: 'Can\'t parse file...',
  notValid: 'File has wrong structure...'
}

export default {
  name: 'json-handler',
  data () {
    return {
      dropStatus: null
    }
  },
  computed: {
    areaClasses () {
      return {
        'json-handler__area--active': this.dropStatus !== null
      }
    },
    text () {
      const error = errors[this.dropStatus]
      return error || 'Drop json file...'
    }
  },
  methods: {
    enter (e) {
      e.preventDefault()
      e.stopPropagation()
      this.dropStatus = 'start'
    },
    leave (e) {
      e.preventDefault()
      e.stopPropagation()
      if (e.target.closest('.json-handler')) {
        this.dropStatus = null
      }
    },

    startCancel () {
      setTimeout(() => {
        this.dropStatus = null
      }, 2e3)
    },

    async handleFile (/** @type {DragEvent} */ e) {
      e.preventDefault()
      e.stopPropagation()
      const [file] = e.dataTransfer.files
      if (!file) {
        this.dropStatus = 'nothing'
        this.startCancel()
        return
      }

      if (!isJson(file)) {
        this.dropStatus = 'notJson'
        this.startCancel()
        return
      }

      const reader = new FileReader()
      reader.readAsText(file)
      await new Promise(resolve => {
        reader.onload = resolve
      })

      let data = null

      try {
        data = JSON.parse(reader.result)
      } catch (err) {
        this.dropStatus = 'parseError'
        this.startCancel()
        return
      }

      if (!isValid(data)) {
        this.dropStatus = 'notValid'
        this.startCancel()
        return
      }

      this.$emit('update', data)
      this.dropStatus = null
    }
  }
}
</script>

<style lang="stylus">
.json-handler
  position relative

  &__area
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(#fff, 0.5)
    border 5px dashed $red
    display flex
    align-items center
    justify-content center
    opacity 0
    pointer-events none
    transition opacity 0.3s

  &__area--active
    opacity 1
    pointer-events auto
</style>
