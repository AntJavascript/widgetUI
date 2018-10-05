<template>
    <div class='wt-card'>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-card',
  props: {},
  data () {
    return {
    };
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-card {
    margin: 0.4rem;
    background: #fff;
    overflow: hidden;
    border-radius: 0.3rem;
    padding: 0.4rem;
    box-shadow: 0 0 0.2rem #ccc;
    border-bottom: 0.1rem solid #ccc;
}
</style>
