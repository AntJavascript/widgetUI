<template>
<div class="wt-carousel" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="wrapper" :style="{transform: 'translate3d('+ distance +'px, 0px, 0px)'}">
      <slot></slot>
    </div>
    <div class="carousel-pagination" v-if="options.pagination">
      <p v-for="(item, index) in itemCount" :key="index" :class="{'active':index === currentIndex}"></p>
    </div>
  </div>
</template>
<script>
import {MediaQuery} from 'widgetUI';
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          loop: false,
          pagination: false,
          auto: false,
          time: 3000
        }
      }
    }
  },
  name: 'wt-carousel',
  data () {
    return {
      itemWidth:'', // item的宽度
      speed: 1, // 速度
      currentIndex: 0, // 当前处于第几个
      distance: 0, // 滑动距离
      itemCount: 0, // 有多少item
      thisDistance: 0, // 本次滑动距离
      start: {
        X: 0,
        Y: 0
      },
      move: {
        X: 0,
        Y: 0
      },
      slots: [],
      autoPlay: '',
      status: '' // 当前状态
    };
  },
  mounted () {
    this.itemWidth = this.$el.offsetWidth;
    var len = this.$slots.default.length;
    // 处理每个item的宽度
    for (let i = 0; i < len; i++) {
      if (this.$slots.default[i].data && this.$slots.default[i].data.staticClass === 'carousel-item') {
        this.$slots.default[i].elm.style.width = this.itemWidth + 'px';
        this.slots.push(this.$slots.default[i].elm);
        this.itemCount++;
      }
    }
    // 需要重复轮播
    if (this.options.loop) {
      // 克隆第一个item
      var first = this.slots[0].cloneNode(true);
      this.$el.firstChild.appendChild(first);
      // 克隆最后一个item
      var last = this.slots[this.slots.length - 1].cloneNode(true);
      this.$el.firstChild.insertBefore(last, this.$el.firstChild.childNodes[0]);
      this.$el.firstChild.style.transitionDuration = '0ms';
      this.distance = -this.itemWidth;
    }
    // 是否自动轮播
    if (this.options.auto) {
      var self = this;
      this.autoPlay = setInterval(self.autoPlayFn, this.options.time);
    }
  },
  methods: {
    // 定时器函数
    autoPlayFn () {
      var self = this;
      self.$el.firstChild.style.transitionDuration = '300ms';
      // 循环轮播
      if (self.options.loop) {
        self.currentIndex++;
        // 当前索引大于itemCount ，就返回到第一个
        if (self.currentIndex > self.itemCount) {
          self.currentIndex = 0;
          self.$el.firstChild.style.transitionDuration = '0ms';
          self.distance = -self.itemWidth;
        } else {
          this.distance = -((this.currentIndex + 1) * this.itemWidth);
          if (self.currentIndex === self.itemCount) {
            self.currentIndex = 0;
            // 400ms之后滚动到第一张，并且过渡时间为0, 时间一定要设置大于300ms，否则会有闪屏问题
            setTimeout(() => {
              self.$el.firstChild.style.transitionDuration = '0ms';
              self.distance = -self.itemWidth;
            }, 400);
          }
        }
      } else {
        // 不循环轮播
        if (self.currentIndex === (self.itemCount - 1)) {
          self.currentIndex = 0;
          this.distance = -(this.currentIndex * this.itemWidth);
        } else {
          self.currentIndex++;
          this.distance = -(this.currentIndex * this.itemWidth);
        }
      }
      self.$emit('swiper', self.currentIndex);
    },
    touchStart () {
      // 关闭定时器
      clearInterval(this.autoPlay);
      // 触摸坐标
      this.start.X = event.touches[0].clientX;
      this.start.Y = event.touches[0].clientY;
    },
    touchMove () {
      var self = this;
      self.$el.firstChild.style.transitionDuration = '0s';
      // 滑动时候的坐标
      this.move.X = event.touches[0].clientX;
      this.move.Y = event.touches[0].clientY;
      // 如果是横着滑动则阻止浏览器默认行为
      if ((Math.abs(this.move.Y - this.start.Y) < Math.abs(this.move.X - this.start.X))) {
        event.preventDefault();
      } else {
        // 如果是竖着滑动，则 return
        return;
      }
      // 本次滑动距离
      var thisDistance = this.move.X - this.start.X;
      this.thisDistance = thisDistance;
      // 如果是循环轮播，则是currentIndex + 1
      if (this.options.loop) {
        this.distance = -((this.currentIndex + 1) * this.itemWidth) + thisDistance;
      } else {
        this.distance = -(this.currentIndex * this.itemWidth) + thisDistance;
      }
    },
    touchEnd () {
      // 重新开启定时器
      if (this.options.auto) {
        this.autoPlay = setInterval(this.autoPlayFn, this.options.time);
      }
      // 如果是竖着滑动，则 return
      if ((Math.abs(this.move.Y - this.start.Y) > Math.abs(this.move.X - this.start.X))) {
        return;
      }
      var self = this;
      this.start.X = 0;
      this.move.X = 0;
      // 如果this.move.X === 0说明没有移动
      if (this.move.Y === 0) {
        return;
      }
      self.$el.firstChild.style.transitionDuration = '300ms';
      // 往左滑
      if (this.thisDistance < 0) {
        if (this.thisDistance <= -(this.itemWidth / 3)) {
          // 当前index 必须小于item数量减1
          if (this.currentIndex < (this.itemCount - 1)) {
            this.currentIndex++;
          } else {
            if (this.options.loop && this.currentIndex < this.itemCount) {
              this.currentIndex++;
            }
          }
          self.$emit('swiper', self.currentIndex);
          self.isLoop();
        } else {
          // this.distance = -(this.itemWidth * this.currentIndex);
          self.isLoop();
        }
        // 如果是无限循环，则需要把索引变成0
        if (this.options.loop) {
          if (this.itemCount === this.currentIndex) {
            this.currentIndex = 0;
            setTimeout(() => {
              self.$el.firstChild.style.transitionDuration = '0s';
              this.distance = -this.itemWidth;
            }, 300);
          }
        }
      } else {
        // 往右滑
        if (this.thisDistance >= this.itemWidth / 3) {
          // 当前index 必须小于item数量减1
          this.currentIndex--;
          if (!this.options.loop && this.currentIndex <= 0) {
            this.currentIndex = 0;
          }
          self.$emit('swiper', self.currentIndex);
          self.isLoop();
        } else {
          self.isLoop();
        }
        // 如果是无限循环，则需要把索引变成最后一个
        if (this.options.loop) {
          if (this.currentIndex < 0) {
            this.currentIndex = this.itemCount - 1;
            self.$emit('swiper', self.currentIndex);
            setTimeout(() => {
              self.$el.firstChild.style.transitionDuration = '0s';
              this.distance = -(this.itemWidth * (this.currentIndex + 1));
            }, 300);
          }
        }
      }
    },
    // 用于判断是否需要循环轮播的处理，如果需要轮播 currentIndex + 1
    isLoop () {
      if (this.options.loop) {
        this.distance = -(this.itemWidth * (this.currentIndex + 1));
      } else {
        this.distance = -(this.itemWidth * this.currentIndex);
      }
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.wt-carousel {
    width: 100%;
    height: 10rem;
    position: relative;
    overflow: hidden;
  .wrapper {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    transition-duration: 300ms;
    transition-timing-function: ease-out;
    transition-property: transform;
    .carousel-item {
      text-align: center;
      font-size: 0.8rem;
      height: 100%;
      width: 100%;
      background: #fff;
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
  .carousel-pagination {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0.3rem;
    width: 100%;
    p {
      margin: 0.2rem;
      height: 0.3rem;
      width: 0.3rem;
      border-radius: 0.3rem;
      background: #000;
      opacity: 0.4;
      &.active {
        background: #fff;
        opacity: 1;
      }
    }
  }
}
</style>
