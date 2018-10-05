<template>
    <div class="wt-checkbox">
        <ul>
          <li v-for="(item, index) in dataSource" :key="index"  @click='handle(item, index)'>
              <p :class="{'icon-check acitive': find(item), 'disable': item.disable}"></p>
              <div class="item-inner">
                <div class="title">{{item.title}}</div>
                <div class="subtitle">{{item.desc}}</div>
              </div>
          </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'wt-checkbox-group',
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
      selected: []
    };
  },
  methods: {
    handle (item, index) {
      if (item.disable) {
        return;
      }
      if (!this.find(item)) {
        this.selected.push(item);
      } else {
        var i = this.find(item, true).index;
        this.selected.splice(i, 1);
      }
      this.isActive = index;
      this.$emit('handle', this.selected);
    },
    find (item, remove) {
      var flag = false;
      if (remove) {
        var index;
      }
      for (var i = 0; i < this.selected.length; i++) {
        if (this.selected[i] === item) {
          flag = true;
          index = i;
        }
      }
      if (remove) {
        return {
          flag: flag,
          index: index
        };
      } else {
        return flag;
      }
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
 @import './checkbox.less';
</style>
