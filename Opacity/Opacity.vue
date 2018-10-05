<template>
    <div class='wt-opacity' :style="{'opacity':size}">
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-opacity',
  props: {
    size: {
      type: String | Number,
      default: () => {
        return 1;
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>

</style>
