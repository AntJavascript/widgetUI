<template>
    <div class='wt-ink'>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-ink',
  props: {},
  data () {
    return {
    };
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-ink {
    &:active {
        background: rgba(0,0,0,0.1);
    }
}
</style>
