<template lang="html">
  <div class="floor">
    <div class="masu-row clearfix" v-for="(row, index) in floorData" :key="index">
      <masu v-for="(masuData, rowIndex) in row" :data="masuData" :key="rowIndex"></masu>
    </div>
  </div>
</template>

<script>
import masu from './Masu'
export default {
  name: 'floor',
  components: {
    masu
  },
  props: {
    floorData: { type: Array, required: true },
    // characterX: { type: Number, required: true },
    // characterY: { type: Number, required: true },
    constant: { type: Object, required: true }
  },
  computed: {

  }
}
</script>

<style lang="scss" scope>
.floor {
  width: 100%;
  height: 100%;
  position: absolute;
}

.masu-row {
  
}
</style>
