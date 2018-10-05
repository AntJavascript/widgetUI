<template>
    <div class='wt-center'>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-center',
  props: {
  },
  data () {
    return {
    };
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
    .wt-center {
        align-items: center;
        text-align: center;
        display: flex;
        justify-content: center;
    }
</style>
