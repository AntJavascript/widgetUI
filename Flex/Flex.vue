<template>
    <div class='wt-flex'>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-flex',
  props: {},
  data () {
    return {
    };
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
 .wt-flex {
     display: flex;
     justify-content: space-between;
     flex-direction: column;
     height: 100%;
 }
</style>
