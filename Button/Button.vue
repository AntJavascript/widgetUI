<template>
        <div class="wt-button" :class="className()">
          <i :class="icon" v-if="icon"></i>
          {{title}}
          </div>
</template>
<script>
export default {
  name: 'wt-button',
  props: {
    title: {
      type: String,
      default: () => {
        return 'button';
      }
    },
    icon: {
      type: String,
      default: () => {
        return '';
      }
    },
    type: {
      type: String,
      default: () => {
        return 'default';
      }
    },
    size: {
      type: String,
      default: () => {
        return 'normal';
      }
    }
  },
  data () {
    return {};
  },
  methods: {
    // 拼接class
    className () {
      return this.type + ' ' + this.size;
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.wt-button {
        background: #fff;
        color: #333;
        border: 1px solid #eee;
        text-align: center;
        border-radius: 0.2rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          margin: 0 0.2rem;
        }
        &:active {
          background: #eee;
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
        &.normal {
            height: 2rem;
            line-height: 2rem;
            font-size: 0.8rem;
            width: 50%;
        }
        &.small {
            height: 1.5rem;
            line-height: 1.5rem;
            font-size: 0.7rem;
            width: 30%;
        }
        &.large {
            height: 2.5rem;
            line-height: 2.5rem;
            font-size: 0.9rem;
            width: 100%;
        }
}
</style>
