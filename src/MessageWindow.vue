<template>
  <div class="massage" v-if="show">
    {{myMessage}}
  </div>
</template>
<script>
export default {
  name: "MessageWindow",
  props: {
    message: { type: Array, default: () => [] }
  },
  computed: {
    show () {
      return this.message.length > 0
    },
    myMessage () {
      return this.message[this.page]
    }
  },
  data: () => ({
    page: 0
    // show: false
  })
}
</script>
<style lang="scss" scoped>
.massage {
  position: absolute;
  z-index: 9999;
  background-color: rgba(12, 12, 12, 0.85);
  border: 3px solid #ccc;
  width: 440px;
  height: 240px;
  color: #fff;
  font-weight: 700;
  padding: 16px 24px;
  top: 150px;
  left: 20px;
}
</style>
