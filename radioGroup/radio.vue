<template>
    <div class="wt-radio">
        <ul>
          <li v-for="(item, index) in dataSource" :key="index"  @click='handle(item, index)' :class="{'disable': item.disable}">
             <p v-if="showBtn !=undefined" :class="{'icon-check active': index === isActive, 'btn':showBtn !=undefined, 'disable': item.disable}"></p>
              <div class="item-inner">
                <div class="title" :class="{'normal':showBtn !=undefined}">{{item.title}}</div>
                <div class="subtitle" :class="{'normal':showBtn !=undefined}">{{item.desc}}</div>
              </div>
              <p v-if="showBtn ==undefined" :class="{'icon-check active': index === isActive}"></p>
          </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'wt-radio-group',
  props: {
    dataSource: {
      type: Array,
      default: function () {
        return [];
      }
    },
    showBtn: {
      type: String,
      default: function () {
        return undefined;
      }
    }
  },
  data () {
    return {
      isActive: '',
      selected: null
    };
  },
  methods: {
    handle (item, index) {
      if (item.disable) {
        return;
      }
      this.selected = item;
      this.isActive = index;
      this.$emit('handle', item, index);
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
 @import './radio.less';
</style>
