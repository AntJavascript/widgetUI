<template>
    <div class="wt-step">
     <div class='horizontal' v-if="direction.toLocaleUpperCase() === 'H'">
        <div class="item-wrapper">
        <div class="item" :class="[{current:item.active}]" v-for='(item, index) of dataSource' :key="index" @tap="switchTap(index)">
            <div class="line" v-if="index !=dataSource.length -1"></div>
            <p>{{item.text}}</p>
            <div :class="[{active:item.active}]" v-if="type=='default'">{{index + 1}}</div>
            <div :class="[{active:item.active},{'icon-check':item.active}]" v-else></div>
            </div>
        </div>
     </div>
     <div class='vertical' v-if="direction.toLocaleUpperCase() === 'V'">
        <div class="item-wrapper">
        <div class="item" :class="[{current:item.active}]" v-for='(item, index) of dataSource' :key="index" @tap="switchTap(index)">
            <div class="left">
                <div class="arc" :class="[{active:item.active}]" v-if="type=='default'">{{index + 1}}</div>
                <div class="arc" :class="[{active:item.active},{'icon-check':item.active}]" v-else-if="type=='check'"></div>
                <div class="line" v-if="index !=dataSource.length -1"></div>
            </div>
            <div class="right">
                <div class="title">{{item.text}}</div>
                <div class="desc">{{item.desc}}</div>
            </div>
            </div>
        </div>
     </div>
    </div>
</template>
<script>
export default {
  name: 'wt-step',
  props: {
    dataSource: {
      type: Array
    },
    type: {
      type: String,
      default: () => {
        return 'default';
      }
    },
    direction: {
      type: String,
      default: () => {
        return 'h';
      }
    }
  },
  data () {
    return {
    };
  },
  computed: {
  },
  methods: {
    // 点击事件
    switchTap (index) {
      this.$emit('handle', index);
    }
  },
  mounted () {
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import './step.less';
</style>
