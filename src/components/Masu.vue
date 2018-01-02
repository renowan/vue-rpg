<template lang="html">
  <div class="masu" :class="'png-' + data"></div>
</template>

<script>
export default {
  name: 'masu',
  props: {
    data: { type: String, required: true }
  }
}
</script>

<style lang="scss">
// 480 * 256 // 16px
// 960 * 512
// group 1 ~ 40, no 1 ~ 12

$masuSize: 32px;
.masu {
  float: left;
  width: $masuSize;
  height: $masuSize;
  background-repeat: no-repeat;
  background-size: 960px 512px;
  background-image: url('/static/img/tiles-touka.png');
}

.png-00-00, .png-00-01 {
  background-image: none;
}
</style>
