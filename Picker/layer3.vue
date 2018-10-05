<template>
    <div class="flex-wrapper">
      <wt-picker :dataSource="dataSource" @change="change"></wt-picker>
      <wt-picker :dataSource="subDataSource" @change="subChange"></wt-picker>
      <wt-picker :dataSource="ThreeDataSource" @change="threeChange"></wt-picker>
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
      picker3Index: 0, // 第二个选择器选择项的索引
      picker3Text: this.dataSource[0][this.children][0][this.children][0][this.filed],
      subDataSource: [], // 第二个选择器的选项
      ThreeDataSource: [] // 第三个选择器的选项
    };
  },
  created () {
    this.subDataSource = this.dataSource[0][this.children];
    this.ThreeDataSource = this.dataSource[0][this.children][0][this.children];
  },
  mounted () {
  },
  methods: {
    change (item, index) {
      this.pickerText = item[this.filed];
      this.picker2Text = item[this.children][0][this.filed];
      this.picker3Text = item[this.children][0][this.children][0][this.filed];
      // console.log('你选择了：' + this.pickerText + '____' + this.picker2Text + '____' + this.picker3Text);
      this.pickerIndex = index;
      this.picker2Index = 0;
      this.picker3Index = 0;
      this.subDataSource = item[this.children];
      this.ThreeDataSource = item[this.children][0][this.children];
      this.$children[1].rest(); // 重置第二级
      this.$children[2].rest(); // 重置第三级
      var code = {
        one: item,
        two: item[this.children][0],
        three: item[this.children][0][this.children][0]
      };
      this.$emit('change', code, [index, 0, 0]);
    },
    subChange (item, index) {
      this.picker2Text = item[this.filed];
      this.picker3Text = item[this.children][0][this.filed];
      this.picker3Index = 0;
      this.ThreeDataSource = item[this.children];
      // console.log('你选择了：' + this.pickerText + '____' + this.picker2Text + '____' + this.picker3Text);
      this.picker2Index = index;
      this.$children[2].rest(); // 重置第三级
      var code = {
        one: this.dataSource[this.pickerIndex],
        two: item,
        three: item[this.children][0]
      };
      this.$emit('change', code, [this.pickerIndex, index, 0]);
    },
    threeChange (item, index) {
      this.picker3Text = item[this.filed];
      this.picker3Index = index;
      // console.log('你选择了：' + this.pickerText + '____' + this.picker2Text + '____' + this.picker3Text);
      var code = {
        one: this.dataSource[this.pickerIndex],
        two: this.dataSource[this.pickerIndex][this.children][this.picker2Index],
        three: item
      };
      this.$emit('change', code, [this.pickerIndex, this.picker2Index, index]);
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
