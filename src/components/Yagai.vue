<template>
  <div class="yagai field" :style="floorStyle">
    <Floor :floorData="baseLayer" :constant="constant"></Floor>
    <Floor :floorData="objLayer" :constant="constant"></Floor>
  </div>
</template>

<script>
import Floor from './Floor'

export default {
  name: 'yagai',
  components: {
    Floor
  },
  props: {
    baseLayer: { type: Array, required: true },
    objLayer:  { type: Array, required: true },
    characterX: { type: Number, required: true },
    characterY: { type: Number, required: true },
    constant: { type: Object, required: true }
  },
  computed: {
    floorStyle () {
      const { SQUARES_WIDTH, SQUARES_HEIGHT, OFF_SET_X, OFF_SET_Y } = this.constant
      const myTop = (this.characterY * SQUARES_HEIGHT - (OFF_SET_X * SQUARES_HEIGHT)) * -1
      const myLeft = (this.characterX * SQUARES_WIDTH - (OFF_SET_Y * SQUARES_WIDTH)) * -1
      return {
        top: `${myTop}px`,
        left: `${myLeft}px`,
      }
    },
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
