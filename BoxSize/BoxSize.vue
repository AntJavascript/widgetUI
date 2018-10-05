<template>
    <div class='wt-box-size' :style="{width: width + 'rem',height: height + 'rem'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-boxSize',
  props: {
    width: {
      type: String | Number,
      default: () => {
        return 0;
      }
    },
    height: {
      type: String | Number,
      default: () => {
        return 0;
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
  .wt-box-size {
    overflow: hidden;
  }
</style>
