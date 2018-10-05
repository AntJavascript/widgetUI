<template>
    <div class='wt-divider'>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-Divider',
  data () {
    return {
    };
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-divider {
    display: table;
    white-space: nowrap;
    background: #fff;
    &::after {
        transform: scaleY(.5) translateY(-50%);
        height: 1px;
        content: '';
        display: table-cell;
        position: relative;
        border-bottom: 1px solid #ccc;
        width: 50%;
        top:50%;
    }
    &::before {
        transform: scaleY(.5) translateY(-50%);
        height: 1px;
        content: '';
        display: table-cell;
        position: relative;
        border-bottom: 1px solid #ccc;
        width: 50%;
        top:50%;
    }
}
</style>
