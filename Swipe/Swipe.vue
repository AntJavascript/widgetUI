<template>
<div class="wt-swipe" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="left" :style="{transform: 'translate3d('+ distance +'px, 0px, 0px)'}"><slot name="left"></slot></div>
        <div class="right" :style="{transform: 'translate3d('+ showRight +'px, 0px, 0px)'}">
          <p v-for="(item, index) in swipeRight" :key="index" @click="handle(item, index)" :style="{'background':item.background}">
            {{item.content}}
          </p>
        </div>
  </div>
</template>
<script>
export default {
  name: 'wt-swipe',
  props: {
    swipeRight: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      itemWidth: '', // 每个操作元素的宽
      defaultStance: '',
      start: 0, // 触摸坐标
      move: 0, // 滑动时候的坐标
      startY: 0, // 触摸Y坐标
      moveY: 0, // 滑动时候的Y坐标
      distance: 0, // 滑动距离
      showRight: '' // right元素的滑动距离
    };
  },
  created () {
    // 获取html的fontsize
    this.itemWidth = ~~window.getComputedStyle(document.querySelector('html')).fontSize.replace('px', '');
    this.defaultStance = this.showRight = this.swipeRight.length * (4 * this.itemWidth);
  },
  methods: {
    handle (item, index) {
      item.handle(item, index);
      this.showRight = this.defaultStance;
      this.distance = 0;
    },
    touchStart () {
      // 触摸坐标
      this.start = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchMove () {
      // 滑动时候的坐标
      this.move = event.touches[0].clientX;
      this.moveY = event.touches[0].clientY;
      if (Math.abs(this.startY - this.moveY) > 10) {
        return;
      } else {
        event.preventDefault();
      }
      /*
       * this.distance !== -this.defaultStance 滑动的距离不等于默认可滑动距离
       * this.move - this.start > 0 大于0 说明是往右滑动
       * this.showRight !== 0 说明不是在展开状态
      */
      if (this.distance !== -this.defaultStance && this.move - this.start > 0 && this.showRight !== 0) {
        return false;
      } else {
        // this.showRight === 0 说明侧滑完全展开了
        if (this.showRight === 0) {
          // 关闭侧滑
          if (this.move - this.start > 20) {
            // 全部隐藏
            this.showRight = this.defaultStance;
            this.distance = 0;
          }
          return;
        }
        // 滑动距离
        this.distance = this.move - this.start;
        // right元素的滑动距离
        this.showRight = ~~this.defaultStance + this.distance;
        // 如果 "this.showRight <= 0" 就说明滑动到了最大值,则不允许滑动了
        if (this.showRight <= 0) {
          this.showRight = 0;
          this.distance = -this.defaultStance;
        }
      }
    },
    touchEnd () {
      // 如果滑动距离 > 20 就展示全部
      if (Math.abs(this.distance) > 20) {
        this.showRight = 0;
        this.distance = -this.defaultStance;
      } else {
        // 如果滑动距离 < 20 就全部隐藏
        this.showRight = this.defaultStance;
        this.distance = 0;
      }
    }
  },
  activated () {
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-swipe {
    min-height: 2rem;
    position: relative;
    overflow: hidden;
    .left {
      transition-duration: 300ms;
    }
    .right {
        transition-duration: 300ms;
        display: flex;
        position: absolute;
        height: calc(100% - 1px);
        right: 0;
        top: 0;
      p {
        display: flex;
        width: 4rem;
        font-size: 0.7rem;
        text-align: center;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
      }
    }
}
</style>
