<template>
    <div class="pullRefresh" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="pullRefresh-wrapper" :style="{transform: 'translate3d(0px, '+ distance +'px, 0px)'}">
    <div class="refresh">
      <div v-if="status == 'refreshing'" class="refreshing">
        <wt-spinner size="1" type="3" ></wt-spinner>
        <span>{{refreshText}}</span>
      </div>
       <div v-else>
         <i :class="refreshIcon"></i>
         <span>{{refreshText}}</span>
       </div>
      </div>
      <div class="pullRefresh-slide">
        <slot></slot>
      </div>
      <!-- <div class="swiper-slide"  v-for="(item, index) in len" :key="index">{{index}}</div> -->
      <div class="loadmore">
        <div v-if="status == 'loadMoreing'" class="loadMoreing">
          <wt-spinner size="1" type="3" ></wt-spinner>
          <span>{{loadmoreText}}</span>
        </div>
        <div v-else>
          <i :class="loadmoreIcon"></i>
          <span>{{loadmoreText}}</span>
        </div>
      </div>
    </div>
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>
<script>
import Spinner from '../Spinner/Spinner';
export default {
  name: 'wt-pullRefresh',
  components: {
    'wt-spinner': Spinner
  },
  data () {
    return {
      speed: 4, // 速度
      refreshText: '下拉可以刷新',
      refreshIcon: 'icon-down',
      loadmoreText: '上拉加载更多',
      loadmoreIcon: 'icon-up',
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
      isDone: false, // 没有数据可加载了
      status: '', // 当前状态
      startTime: '', // 触摸开始时间
      endTime: '' // 触摸结束时间
    };
  },
  methods: {
    touchStart () {
      // console.log(this.$el.lastChild.children[1].children.length);
      // 触摸坐标
      this.start.X = event.touches[0].clientX;
      this.start.Y = event.touches[0].clientY;
      this.maxDistance = this.$el.lastChild.clientHeight - this.$el.clientHeight;
      this.startTime = new Date().getTime();
    },
    touchMove () {
      var self = this;
      event.preventDefault();
      if (self.status === 'refreshing' || self.status === 'loadMoreing') {
        return;
      }
      self.refreshText = '释放刷新';
      // 滑动时候的坐标
      this.move.X = event.touches[0].clientX;
      this.move.Y = event.touches[0].clientY;
      // 滑动距离
      var tance = this.move.Y - this.start.Y; // 本次滑动距离
      this.distance = this.hisdistance + tance; // 页面滑动距离(上一次滑动距离 + 本次滑动距离)
      if (self.distance > 30) {
        self.refreshText = '松开立即刷新';
        self.refreshIcon = 'icon-up';
      } else if (self.distance < 30 && self.distance > 0) {
        self.refreshText = '下拉可以刷新';
        self.refreshIcon = 'icon-down';
      } else if (Math.abs(self.distance) >= (this.maxDistance + 30)) {
        if (self.isDone) {
          return;
        }
        self.loadmoreText = '松开立即加载';
        self.loadmoreIcon = 'icon-down';
      }
    },
    touchEnd () {
      var self = this;
      self.endTime = new Date().getTime();
      if (self.status === 'refreshing') {
        return;
      }
      // this.move.Y 说明没有滑动
      if (this.move.Y === 0) {
        return;
      }
      // 如果触摸时间超过500ms，则不加速滑动
      if (self.endTime - self.startTime > 500) {
        self.speed = 1;
      } else {
        self.speed = 4;
      }
      self.$el.firstChild.style.transitionDuration = '1000ms';
      if (this.hisdistance + (this.move.Y - this.start.Y) * self.speed >= 0 || Math.abs(this.hisdistance + (this.move.Y - this.start.Y) * self.speed) >= this.maxDistance) {
        self.$el.firstChild.style.transitionDuration = '300ms';
      }
      this.distance = this.hisdistance + (this.move.Y - this.start.Y) * self.speed;
      self.$nextTick(() => {
        // self.distance >= 0 说明滑动到了顶部
        if (self.distance >= 0) {
          // 顶部滑动距离小于30的话，不会触发刷新
          if (self.distance > 30) {
            self.status = 'refreshing';
            self.refreshText = '正在刷新';
            self.distance = 50;
            self.hisdistance = 0; // 清除上一次滑动距离
            self.$emit('refresh');
          } else {
            self.distance = 0;
            self.hisdistance = 0; // 清除上一次滑动距离
          }
          self.isTop = true; // 滑动到了顶部
        } else if (Math.abs(self.distance) >= (this.maxDistance + 30)) {
          self.isBottom = true;
          if (self.isDone) {
            self.distance = -this.maxDistance;
          } else {
            self.distance = -(this.maxDistance + 50);
            self.loadmoreText = '正在加载';
            self.status = 'loadMoreing';
            self.$emit('load');
          }
          self.hisdistance = self.distance; // 记录上次滑动的位置
        } else if (Math.abs(self.distance) >= this.maxDistance && Math.abs(self.distance) < (this.maxDistance + 30)) {
          self.isBottom = true;
          self.distance = -this.maxDistance;
        } else {
          self.isTop = false;
          self.isBottom = false;
          self.hisdistance = self.distance; // 记录上次滑动的位置
        }
      });
      self.move.Y = 0;
    },
    refresh () {
      var self = this;
      self.distance = 0;
      self.refreshText = '刷新成功';
      self.status = '';
      self.isDone = false;
      self.loadmoreText = '上拉加载更多';
      self.loadmoreIcon = 'icon-up';
    },
    load (isDone) {
      var self = this;
      self.isDone = isDone;
      // 每次加载完成多往上滑动20
      self.distance = -self.maxDistance - 20;
      self.loadmoreText = '加载成功';
      setTimeout(function () {
        self.status = '';
        if (isDone) {
          self.loadmoreText = '沒有数据可加载';
          self.loadmoreIcon = '';
        } else {
          self.loadmoreText = '加载更多';
        }
      }, 300);
    }
  }
};
</script>
<style lang='less' scoped>
   .pullRefresh {
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      list-style: none;
      padding: 0;
      height: 100%;
      z-index: 1;
      }
      .pullRefresh-wrapper {
        position: relative;
        background: #fff;
        transition-timing-function: ease-out;
        transition-property: transform;
      }
      .refresh {
        position: absolute;
        line-height: 50px;
        bottom: 100%;
        text-align: center;
        width: 100%;
        font-size: 0.7rem;
        .refreshing {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin: 0 0.2rem;
          }
        }
      }
      .loadmore {
        position: absolute;
        line-height: 50px;
        top: 100%;
        text-align: center;
        width: 100%;
        font-size: 0.7rem;
        .loadMoreing {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin: 0 0.2rem;
          }
        }
      }
</style>
