<template>
    <div class="wt-badge" :class="type">
        {{title}}
    </div>
</template>
<script>
export default {
  name: 'wt-badge',
  props: {
    title: {
      type: String | Number,
      default: () => {
        return '';
      }
    },
    type: {
      type: String,
      default: () => {
        return 'default';
      }
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .wt-badge {
    padding: 0.3rem;
    display: inline-block;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 0.6rem;
    min-width: 0.6rem;
    min-height: 0.6rem;
    box-sizing: border-box;
    line-height: 0.4rem;
    text-align: center;
    &.default {
        background: #ef4f4f;
    }
    &.primary {
        background: #1BB5F1;
    }
  }
</style>
