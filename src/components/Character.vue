<template lang="html">
  <div class="character" :class="'d-' + charDir"></div>
</template>

<script>
export default {
  name: 'character',
  props:{
    charDir: { type: Number, required: true }
  }
}
</script>

<style lang="css" scope>
.character {
  width: 32px;
  height: 32px;
  /* background-color: red; */
  position: absolute;
  
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/static/img/you_down_1.png');
  top: 192px;
  left: 224px;
}

.d-0 {
  background-image: url('/static/img/you_down_1.png');
}
.d-1 {
  background-image: url('/static/img/you_left_1.png');
}
.d-3 {
  background-image: url('/static/img/you_right_1.png');
}
.d-2 {
  background-image: url('/static/img/you_up_1.png');
}
</style>
