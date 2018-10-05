<template>
    <div class='wt-picker'>
      <div class="head">
         <wt-row>
        <wt-button title="取消" type="default" size="small" style="width: 3rem;" @click.native="cancel"></wt-button>
        <wt-button title="确定" type="primary" size="small" style="width: 3rem;" @click.native="comfirm"></wt-button>
      </wt-row>
      </div>
     <layer1 :dataSource ="dataSource" :filed="filed" :children="children" v-if="layer == 1" @change="change"></layer1>
     <layer2 :dataSource ="dataSource" :filed="filed" :children="children" v-else-if="layer == 2" @change="change"></layer2>
     <layer3 :dataSource ="dataSource" :filed="filed" :children="children" v-else-if="layer == 3" @change="change"></layer3>
    </div>
</template>
<script>
import Row from '../Row/Row';
import Button from '../Button/Button';
import layer1 from './layer1';
import layer2 from './layer2';
import layer3 from './layer3';
export default {
  components: {
    layer1,
    layer2,
    layer3,
    'wt-row': Row,
    'wt-button': Button
  },
  name: 'wt-picker',
  props: {
    layer: {
      type: Number | String,
      default: () => {
        return 1;
      }
    },
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
      activeIndex: {
        index: '',
        value: '',
        string: ''
      }
    };
  },
  // 默认选中数据
  created () {
    var frist = this.dataSource[0];
    if (this.layer === 1 || this.layer === '1') {
      this.activeIndex.value = frist;
      this.activeIndex.index = 0;
      this.activeIndex.string = frist[this.filed];
    } else if (this.layer === 2 || this.layer === '2') {
      this.activeIndex.index = [0, 0];
      this.activeIndex.value = {
        one: frist,
        two: frist[this.children][0]
      };
      this.activeIndex.string = frist[this.filed] + ',' + frist[this.children][0][this.filed];
    } else if (this.layer === 3 || this.layer === '3') {
      this.activeIndex.index = [0, 0, 0];
      this.activeIndex.value = {
        one: frist,
        two: frist[this.children][0],
        three: frist[this.children][0][this.children][0]
      };
      this.activeIndex.string = frist[this.filed] + ',' + frist[this.children][0][this.filed] + ',' + frist[this.children][0][this.children][0][this.filed];
    };
  },
  methods: {
    // 取消按钮
    cancel () {
      this.$emit('cancel');
    },
    // 确定按钮
    comfirm () {
      this.$emit('comfirm', this.activeIndex);
    },
    // 接收回调选项
    change (value, index) {
      // 为了拷贝整个对象，解除引用类型的关系
      var val = JSON.stringify(value);
      var text = JSON.parse(val);
      var string = '';
      if (this.layer === 1 || this.layer === '1') {
        // 一级picker处理
        string = this.dataSource[index][this.filed];
      } else if (this.layer === 2 || this.layer === '2') {
        string = text.one[this.filed] + ',' + text.two[this.filed];
      } else if (this.layer === 3 || this.layer === '3') {
        string = text.one[this.filed] + ',' + text.two[this.filed] + ',' + text.three[this.filed];
      };
      this.activeIndex = {
        'index': index,
        'value': text,
        'string': string
      };
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-picker {
  position: fixed;
  background: #fff;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 15.5rem;
  .head {
    border-bottom: 1px solid #eee;
    padding: 0.5rem;
    position: absolute;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
  }
  .swiper-slide {
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #8b8b8b;
    font-size: 0.8rem;
    &.swiper-slide-active {
      color: #333;
    }
  }
}
</style>
