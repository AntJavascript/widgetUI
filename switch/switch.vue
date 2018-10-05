<template>
    <div id="wt-switch">
      <label class="label-switch">
        <input type="checkbox" :disabled="isable" @click="Switch" :checked="checked">
        <div class="checkbox"></div>
      </label>
    </div>
</template>
<script>
export default {
  name: 'wt-switch',
  props: {
    isable: {
      type: Boolean,
      default: function () {
        return false;
      }
    },
    checked: {
      type: Boolean,
      default: function () {
        return false;
      }
    }
  },
  methods: {
    Switch () {
      this.$emit('switch', event.target.checked);
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
 @import './switch.less';
</style>
