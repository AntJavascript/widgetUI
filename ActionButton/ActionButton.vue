<template>
    <div class='wt-actionButton' :class="className" :style="{zIndex: zIndex, bottom:bottom + 'rem', right:right + 'rem'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-actionButton',
  props: {
    type: {
      type: String,
      default: () => {
        return '';
      }
    },
    zIndex: {
      type: String | Number,
      default: () => {
        return 100;
      }
    },
    bottom: {
      type: String | Number,
      default: () => {
        return 2.8;
      }
    },
    right: {
      type: String | Number,
      default: () => {
        return 0.5;
      }
    }
  },
  computed: {
    // 拼接class
    className: function () {
      return this.type;
    }
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
    .wt-actionButton {
        position: fixed;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 2.2rem;
        background: #fff;
        box-sizing: border-box;
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
