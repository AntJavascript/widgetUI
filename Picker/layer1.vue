<template>
    <div class="picker" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="picker-wrapper" :style="{transform: 'translate3d(0px, '+ distance +'px, 0px)'}">
            <div class="picker-item" v-for="(item, index) in dataSource" :key="index" :class="{'active': currentIndex === index}">
                {{ showFiled(item) }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => {
        return [];
      }
    },
    filed: {
      type: String,
      default: () => {
        return 'text';
      }
    },
    isSub: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data () {
    return {
      activeIndex: 0,
      itemWidth: '',
      speed: 1, // 速度
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
      status: '', // 当前状态
      currentIndex: 0 // 当前处于第几个
    };
  },
  created () {
    // 获取html的fontsize
    this.itemWidth = ~~window.getComputedStyle(document.querySelector('html')).fontSize.replace('px', '');
    this.maxDistance = (this.itemWidth * 2) * (this.dataSource.length - 1);
  },
  mounted () {
  },
  methods: {
    showFiled: function (item) {
      if (this.filed !== '') {
        return item[this.filed];
      } else {
        return item;
      }
    },
    touchStart () {
      // console.log(this.$el.lastChild.children[1].children.length);
      // 触摸坐标
      this.start.X = event.touches[0].clientX;
      this.start.Y = event.touches[0].clientY;
    },
    touchMove () {
      var self = this;
      self.$el.firstChild.style.transitionDuration = '0s';
      event.preventDefault();
      // 滑动时候的坐标
      this.move.X = event.touches[0].clientX;
      this.move.Y = event.touches[0].clientY;
      // 滑动距离
      var tance = (this.move.Y - this.start.Y) * this.speed; // 本次滑动距离
      this.distance = this.hisdistance + tance; // 页面滑动距离(上一次滑动距离 + 本次滑动距离)
    },
    touchEnd () {
      var self = this;
      if (self.move.Y === 0) {
        return;
      }
      // this.move.Y 说明没有滑动
      if (this.move.Y === 0) {
        return;
      }
      self.$el.firstChild.style.transitionDuration = '300ms';
      // self.distance >= 0 说明滑动到了顶部
      if (self.distance >= 0) {
        // 顶部滑动距离小于30的话，不会触发刷新
        if (self.distance > 30) {
          self.distance = 0;
          self.hisdistance = 0; // 清除上一次滑动距离
        } else {
          self.distance = 0;
          self.hisdistance = 0; // 清除上一次滑动距离
        }
        self.isTop = true; // 滑动到了顶部
      } else if (Math.abs(self.distance) >= (this.maxDistance)) {
        self.isBottom = true;
        // 当前处于第几个 item
        this.currentIndex = Math.abs(Math.round(this.maxDistance / (this.itemWidth * 2)));
        self.distance = -this.currentIndex * (this.itemWidth * 2);
        // self.distance = -this.maxDistance;
        // 记录上次滑动的位置
        self.hisdistance = self.distance;
      } else if (Math.abs(self.distance) >= this.maxDistance && Math.abs(self.distance) < (this.maxDistance)) {
        self.isBottom = true;
        // self.distance = -this.maxDistance;
        this.currentIndex = Math.abs(Math.round(this.maxDistance / (this.itemWidth * 2)));
        // 滑动距离
        self.distance = -this.currentIndex * (this.itemWidth * 2);
      } else {
        self.isTop = false;
        self.isBottom = false;
        // 当前处于第几个 item
        this.currentIndex = Math.abs(Math.round(self.distance / (this.itemWidth * 2)));
        // 记录上次滑动的位置
        self.hisdistance = -this.currentIndex * (this.itemWidth * 2); // 记录上次滑动的位置
      }
      self.move.Y = 0;
      // 当前处于第几个 item
      this.currentIndex = Math.abs(Math.round(self.distance / (this.itemWidth * 2)));
      // 滑动距离
      self.distance = -self.currentIndex * (self.itemWidth * 2);
      self.$emit('change', self.dataSource[self.currentIndex], self.currentIndex);
    },
    // 重置
    rest () {
      this.$nextTick(() => {
        this.distance = 0;
        this.currentIndex = 0;
        this.maxDistance = (this.itemWidth * 2) * (this.dataSource.length - 1);
        this.hisdistance = 0;
      });
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.picker {
    display: flex;
    height: 13rem;
    margin-top: 2.5rem;
    position: relative;
    overflow: hidden;
    flex: 1;
    &::after {
      content: '';
      background: #f4f4f4;
      height: 2rem;
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      border-bottom: 1px solid #e0dddd;
      border-top: 1px solid #e0dddd;
      box-sizing: border-box;
      z-index: 1;
  }
  .picker-wrapper {
      width: 100%;
      position: relative;
      top: calc(50% - 1rem);
      z-index: 2;
      .picker-item {
          white-space: nowrap;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #8b8b8b;
          font-size: 0.8rem;
          line-height: 2rem;
          &.active {
              color: #333;
          }
      }
  }
}
</style>
