<template>
    <div class='wt-font' :style="{'font-size':size + 'rem'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-font',
  props: {
    size: {
      type: String | Number,
      default: () => {
        return 0.8;
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
