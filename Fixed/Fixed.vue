<template>
    <div class='wt-fixed' :style="{'bottom':bottom + 'rem', 'top':top + 'rem', 'left':left + 'rem', 'right':right + 'rem', 'z-index':zIndex}">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-fixed',
  props: {
    bottom: {
      type: String
    },
    top: {
      type: String
    },
    left: {
      type: String
    },
    right: {
      type: String
    },
    zIndex: {
      type: String
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
.wt-fixed {
    position: fixed;
    width: 100%;
    z-index: 100;
}
</style>
