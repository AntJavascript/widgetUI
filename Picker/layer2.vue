<template>
    <div class="flex-wrapper">
      <wt-picker :dataSource="dataSource" @change="change"></wt-picker>
      <wt-picker :dataSource="subDataSource" @change="subChange"></wt-picker>
    </div>
</template>
<script>
import layer from './layer1';
export default {
  components: {
    'wt-picker': layer
  },
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
    children: {
      type: String,
      default: () => {
        return 'children';
      }
    }
  },
  data () {
    return {
      lineHeight: '',
      pickerIndex: 0, // 第一个选择器选择项的索引
      pickerText: this.dataSource[0][this.filed],
      picker2Index: 0, // 第二个选择器选择项的索引
      picker2Text: this.dataSource[0][this.children][0][this.filed],
      subDataSource: [] // 第二个选择器的选项
    };
  },
  created () {
    this.subDataSource = this.dataSource[0][this.children];
  },
  mounted () {
  },
  methods: {
    change (item, index) {
      this.pickerText = item[this.filed];
      this.picker2Text = item[this.children][0][this.filed];
      // console.log('你选择了：' + this.pickerText + '____' + this.picker2Text);
      this.pickerIndex = index;
      this.picker2Index = 0;
      this.subDataSource = item[this.children];
      this.$children[1].rest(); // 重置下一级
      var code = {
        one: item,
        two: item[this.children][0]
      };
      this.$emit('change', code, [index, 0]);
    },
    subChange (item, index) {
      this.pickerText = this.dataSource[this.pickerIndex][this.filed];
      this.picker2Text = item[this.filed];
      // console.log('你选择了：' + this.pickerText + '____' + this.picker2Text);
      this.picker2Index = index;
      var code = {
        one: this.dataSource[this.pickerIndex],
        two: item
      };
      this.$emit('change', code, [this.pickerIndex, index]);
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
  .flex-wrapper {
    display: flex;
    justify-content: space-around;
  }
</style>
