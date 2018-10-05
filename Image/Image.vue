<template>
    <img :src='src' class="wt-image" :style="{width, height}" />
</template>
<script>
export default {
  name: 'wt-image',
  props: {
    src: {
      type: String,
      default: () => {
        return '';
      }
    },
    width: {
      type: String | Number,
      default: () => {
        return '';
      }
    },
    height: {
      type: String | Number,
      default: () => {
        return '';
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
    .nvx-image {
      display: block;
    }
</style>
