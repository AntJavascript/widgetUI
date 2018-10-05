<template>
    <div :class="['wt-cell', {'border':border != undefined}]">
        <div class="cell">
            <slot name="left" v-if="slot.left"></slot>
            <div class="left">
                <div class="title">
                <!-- <i :class="icon" v-if="icon != ''"></i> -->
                <span v-if="title != ''">{{title}}</span>
            </div>
                <div class="label">{{label}}</div>
            </div>
            <div class="right">
                <slot name="right" v-if="slot.right"></slot>
                <div class="value" v-else-if="slot.right == null && right != ''">{{right}}</div>
                <div v-if="link != undefined" class="icon-right link"></div>
            </div>
        </div>
        <slot name="bottom"></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-cell',
  props: {
    title: {
      type: String,
      default: () => {
        return '';
      }
    },
    label: {
      type: String,
      default: () => {
        return '';
      }
    },
    right: {
      type: String,
      default: () => {
        return '';
      }
    },
    icon: {
      type: String,
      default: () => {
        return '';
      }
    },
    link: {
      type: String,
      default: () => {
        return undefined;
      }
    },
    border: {
      type: String,
      default: () => {
        return undefined;
      }
    }
  },
  data () {
    return {
      slot: {
        right: null,
        left: null
      }
    };
  },
  methods: {
  },
  created () {
    if (this.$slots.right) {
      this.slot.right = this.$slots.right;
    }
    if (this.$slots.left) {
      this.slot.left = this.$slots.left;
    }
    // console.log(this);
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-cell {
  background: #fff;
  &.border {
    &:after {
      transform: scaleY(0.5);
      height: 1px;
      content: "";
      display: block;
      border-bottom: 1px solid #ccc;
    }
  }
  .cell {
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .left {
      .title {
        display: flex;
        i {
          font-size: 1.2rem;
          margin-right: 0.2rem;
        }
        span {
          font-size: 0.75rem;
        }
      }
    }
    .right {
      display: flex;
      height: 100%;
      align-items: center;
      .value {
        font-size: 0.7rem;
        color: #666;
      }
      .link {
        color: #999;
        margin: 0 0.2rem;
      }
    }
  }
  .label {
    font-size: 0.7rem;
    color: #999;
    margin: 0.2rem 0;
  }
}
</style>
