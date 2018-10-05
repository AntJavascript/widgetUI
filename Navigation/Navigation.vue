<template>
        <div class="wt-navigation">
          <div class="box">
            <div v-for="(list, index) in dataSource" :key="index" :class="[{'active':currentIndex == index}, 'item']" @click="handle(list, index)">
                <i :class="list.icon"></i>
                <p>{{list.title}}</p>
            </div>
          </div>
        </div>
</template>
<script>
export default {
  name: 'wt-Navigation',
  props: {
    dataSource: {
      type: Array,
      default: () => {
        return [];
      }
    },
    currentIndex: {
      type: Number | String,
      default: () => {
        return 0;
      }
    }
  },
  data () {
    return {};
  },
  methods: {
    handle (item, index) {
      this.$emit('handle', item, index);
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.wt-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.2rem;
  background: #fff;
  padding: 0.2rem 0;
  z-index: 100;
  box-shadow: 0 0px 5px #dbdbdb;
  .box {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .item {
      font-size: 0.7rem;
      flex: 1;
      text-align: center;
      &.active {
        color: #1BB5F1;
      }
      i {
        font-size: 1rem;
      }
      p {
        font-size: 0.7rem;
      }
    }
  }
}
</style>
