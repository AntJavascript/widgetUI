<template>
    <div class='wt-row'>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-row',
  props: {},
  data () {
    return {
    };
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
 .wt-row {
     display: flex;
     align-items: center;
     height: 100%;
     justify-content: space-between;
 }
</style>
