<template>
    <div class='wt-column'>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-column',
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
    .wt-column {
        align-items: center;
        display: flex;
        justify-content: center;
        height: 100%;
        flex-direction: column;
    }
</style>
