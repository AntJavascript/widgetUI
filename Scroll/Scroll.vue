<template>
    <div class="wt-scroll"  @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <div class="scroll-wrapper" v-if="direction.toLocaleUpperCase() === 'V'" :style="{transform: 'translate3d(0px, '+ distance +'px, 0px)'}">
        <slot></slot>
      </div>
      <div class="scroll-wrapper horizontal" v-else :style="{transform: 'translate3d('+ -distance +'px, 0px, 0px)'}">
        <slot></slot>
      </div>
    <div v-show="scrollbar" v-if="direction.toLocaleUpperCase() === 'V'" class="scroll-scrollbar" :style="{'height':scrollHeight * 0.98 + 'px', 'top': scrollHeight * 0.01 + 'px'}">
      <div class="scroll-scrollbar-drag"  :style="{'height':scrollHeight * scrollRatio + 'px', transform: 'translate3d(0px, '+ -distance * scrollRatio +'px, 0px)'}"></div>
    </div>
    <div v-show="scrollbar" v-else class="scroll-scrollbar horizontal" >
      <div class="scroll-scrollbar-drag"  
      :style="{'width':scrollWidth + 'px', transform: 'translate3d('+ distance * scrollRatio +'px, 0px, 0px)'}">
      </div>
    </div>
  </div>
</template>
<script>
import {MediaQuery} from 'widgetUI';
export default {
  name: 'wt-scroll',
  props: {
    scrollbar: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    direction: {
      type: String,
      default: () => {
        return 'v';
      }
    }
  },
  data () {
    return {
      speed: 4, // 速度
      translate: 0, // 滑动距离
      isTop: true, // 是否滑动到了顶部
      isBottom: false, // 是否滑动到了底部
      distance: 0, // 滑动距离
      hisdistance: 0, // 上一次滑动距离
      maxDistance: '', // 最大滑动距离
      start: {
        X: 0,
        Y: 0
      },
      move: {
        X: 0,
        Y: 0
      },
      scrollHeight: '', // 滚动条背景高度
      scrollWidth: '', // 滚动条背景宽度
      scrollRatio: '', // 滚动比例
      startTime: '', // 触摸开始时间
      endTime: '' // 触摸结束时间
    };
  },
  mounted () {
    var el = this.$el;
    var wrapper = el.firstChild;
    // 如果是横向滚动
    if (this.direction.toLocaleUpperCase() === 'H') {
      this.$nextTick(() => {
        var itemConutWidth = 0; // wrapper总宽度
        var len = wrapper.childElementCount;
        for (let i = 0; i < len; i++) {
          var marginL= parseFloat(getComputedStyle(wrapper.children[i], false)['marginLeft'].replace('px', ''));
          var marginR= parseFloat(getComputedStyle(wrapper.children[i], false)['marginRight'].replace('px', ''));
          itemConutWidth+= wrapper.children[i].offsetWidth + marginL + marginR;
        }
        wrapper.style.width = itemConutWidth - el.offsetWidth + 'px';
        this.maxDistance = itemConutWidth - el.offsetWidth;
        this.scrollWidth = (el.offsetWidth / this.maxDistance) * el.offsetWidth;
        this.scrollRatio = (el.offsetWidth / itemConutWidth);
      });
      wrapper.style.display = 'flex';
    } else {
      // 如果高度大于整个屏幕高度，则滚动区域高度等于屏幕高度，不能大于屏幕高度
      var elHeight = el.clientHeight < MediaQuery.height ? el.clientHeight : MediaQuery.height;
      this.scrollHeight = elHeight * 0.98;
      this.maxDistance = wrapper.offsetHeight - elHeight;
      this.scrollRatio = this.scrollHeight / wrapper.offsetHeight;
    }
  },
  methods: {
    touchStart () {
      // 触摸坐标
      this.start.X = event.touches[0].clientX;
      this.start.Y = event.touches[0].clientY;
      this.startTime = new Date().getTime();
    },
    touchMove () {
      var self = this;
      event.preventDefault();
      self.$el.firstChild.style.transitionDuration = '0ms';
      self.$el.lastChild.children[0].style.transitionDuration = '0ms';
      // 滑动时候的坐标
      this.move.X = event.touches[0].clientX;
      this.move.Y = event.touches[0].clientY;
      // 滑动距离
      var tance = '';
      if (this.direction.toLocaleUpperCase() === 'H') {
        tance = -(this.move.X - this.start.X); // 本次滑动距离
      } else {
        tance = this.move.Y - this.start.Y; // 本次滑动距离
      }
      this.distance = this.hisdistance + tance; // 页面滑动距离(上一次滑动距离 + 本次滑动距离)
    },
    touchEnd () {
      var self = this;
      self.endTime = new Date().getTime();
      // this.move.Y 说明没有滑动
      if (this.direction.toLocaleUpperCase() === 'H') {
        // if (this.move.X === 0) {
        //   return;
        // }
      } else {
        if (this.move.Y === 0) {
          return;
        }
      }
      // 如果触摸时间超过500ms，则不加速滑动
      if (self.endTime - self.startTime > 500) {
        self.speed = 1;
      } else {
        self.speed = 4;
      }
      self.$el.firstChild.style.transitionDuration = '1000ms';
      self.$el.lastChild.children[0].style.transitionDuration = '1000ms';
      if (this.direction.toLocaleUpperCase() === 'H') {
        if (this.hisdistance + -(this.move.X - this.start.X) * self.speed <= 0 || Math.abs(this.hisdistance + -(this.move.X - this.start.X) * self.speed) >= this.maxDistance) {
          self.$el.firstChild.style.transitionDuration = '300ms';
          self.$el.lastChild.children[0].style.transitionDuration = '300ms';
        }
        this.distance = this.hisdistance + -(this.move.X - this.start.X) * self.speed;
        console.log(this.distance);
      } else {
        if (this.hisdistance + (this.move.Y - this.start.Y) * self.speed >= 0 || Math.abs(this.hisdistance + (this.move.Y - this.start.Y) * self.speed) >= this.maxDistance) {
          self.$el.firstChild.style.transitionDuration = '300ms';
          self.$el.lastChild.children[0].style.transitionDuration = '300ms';
        }
        this.distance = this.hisdistance + (this.move.Y - this.start.Y) * self.speed;
      }
      if (this.direction.toLocaleUpperCase() === 'H') {
        if (self.distance <= 0) {
          self.distance = 0;
          self.hisdistance = 0; // 清除上一次滑动距离
          self.isTop = true; // 滑动到了顶部
        } else if (Math.abs(self.distance) >= this.maxDistance) {
          self.isBottom = true;
          self.distance = this.maxDistance;
          self.hisdistance = self.distance; // 记录上次滑动的位置
        } else {
          self.isTop = false;
          self.isBottom = false;
          self.hisdistance = self.distance; // 记录上次滑动的位置
        }
      } else {
        // self.distance >= 0 说明滑动到了顶部
        if (self.distance >= 0) {
          self.distance = 0;
          self.hisdistance = 0; // 清除上一次滑动距离
          self.isTop = true; // 滑动到了顶部
        } else if (Math.abs(self.distance) >= this.maxDistance) {
          self.isBottom = true;
          self.distance = -this.maxDistance;
          self.hisdistance = self.distance; // 记录上次滑动的位置
        } else {
          self.isTop = false;
          self.isBottom = false;
          self.hisdistance = self.distance; // 记录上次滑动的位置
        }
      }
      if (this.direction.toLocaleUpperCase() === 'H') {
        // 不能设置为0，否则触摸手机边界会有问题，注释掉
        // self.move.X = 0;
      } else {
        self.move.Y = 0;
      }
    }
  }
};
</script>
<style lang='less' scoped>
   .wt-scroll {
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      list-style: none;
      padding: 0;
      height: 100%;
      z-index: 1;
      .scroll-wrapper {
        transition-timing-function: ease-out;
      }
      .scroll-scrollbar {
        position: absolute;
        right: 3px;
        top: 1%;
        z-index: 50;
        width: 5px;
        background: rgba(0,0,0,.1);
        border-radius: 10px;
        overflow: hidden;
        transition-timing-function: ease-out;
        &.horizontal {
          right: initial;
          height: 5px;
          bottom: 1%;
          top: initial;
          width: 100%;
        }
        .scroll-scrollbar-drag {
            transition-duration: 1000ms;
            height: 5px;
            position: relative;
            background: rgba(0,0,0,.5);
            border-radius: 10px;
            left: 0;
            top: 0;
        }
      }
      }
</style>
