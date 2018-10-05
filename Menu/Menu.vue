<template>
    <div class="wt-menu">
            <ul>
                <li v-for="(item, index) in dataSource" :key="index" @click="handle(item)">{{item.title}}</li>
            </ul>
    </div>
</template>
<script>
export default {
  name: 'wt-menu',
  props: {
    dataSource: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {
    // 点击选项
    handle (item, index) {
      event.stopPropagation();
      this.$emit('handle', item, index);
    }
  }
};
</script>
<style lang='less' scoped>
.wt-menu {
    ul {
        width: 70%;
        background: #fff;
        z-index: 101;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 5px 0px #ccc;
        box-sizing: border-box;
        li {
            line-height: 2.2rem;
            font-size: 0.8rem;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:after {
                transform: scaleY(.5);
                height: 1px;
                content: '';
                border-bottom: 1px solid #ccc;
                display: block;
            }
            &:last-child:after {
                border-bottom: none;
                height: 0;
            }
        }
    }
}
</style>
