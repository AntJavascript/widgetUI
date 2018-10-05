<template>
    <div class='wt-align'>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-align',
  props: {},
  data () {
    return {
    };
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-align {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
