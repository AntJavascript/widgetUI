<template>
    <div class='wt-circle' :class="className" :style="{'borderRadius':size + 'rem', 'height':size + 'rem', 'minWidth':size + 'rem'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-circle',
  props: {
    size: {
      type: String | Number,
      default: () => {
        return 2;
      }
    },
    type: {
      type: String,
      default: () => {
        return '';
      }
    }
  },
  data () {
    return {
    };
  },
  computed: {
    // 拼接class
    className: function () {
      return this.type;
    }
  },
  methods: {
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
 .wt-circle {
     overflow: hidden;
     background: #fff;
     display: inline-block;
     &:active {
        background: rgba(0,0,0,0.1);
      }
     &.primary {
        background: #1BB5F1;
        color:#fff;
        border: 0;
        &:active {
            background: #62c3e9;
        }
    }
    &.danger {
        background: #ef4f4f;
        color:#fff;
        border: 0;
        &:active {
            background: #ff6969;
        }
    }
 }
</style>
