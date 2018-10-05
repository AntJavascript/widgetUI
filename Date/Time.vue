<template>
    <div class='wt-date'>
        <div class="flex-wrapper">
          <wt-picker :dataSource="hoursData" @change="hoursChange"></wt-picker>
          <wt-picker :dataSource="minuteData" @change="minuteChange"></wt-picker>
        </div>
    </div>
</template>
<script>
import Picker from './Picker';
export default {
  components: {
    'wt-picker': Picker
  },
  props: {
    section: {
      type: String,
      default: () => {
        return '';
      }
    },
    default: {
      type: String,
      default: () => {
        return '';
      }
    }
  },
  data () {
    return {
      // 小时的的取值范围
      hoursData: [],
      // 选择小时的值
      hoursValue: 0,
      // 分钟的的取值范围
      minuteData: [],
      // 选择分钟的值
      minuteValue: 0,
      // 开始时间(小时)
      begunHours: '',
      // 开始时间(分钟)
      begunMinute: '',
      // 结束时间(小时)
      endHours: '',
      // 结束时间(分钟)
      endMinute: '',
      // 开始区间
      sectionStart: '',
      // 结束区间
      sectionEnd: ''
    };
  },
  created () {
    var self = this;
    var section = '';
    // 如果有指定取值范围
    if (self.section) {
      section = self.section.replace(/[\\[\]]/g, '').split('-');
      self.sectionStart = section[0].split(':');
      self.sectionEnd = section[1].split(':');
      self.hoursData = self.sectionDiff(section);
    } else {
      // 指定小时区间
      self.hoursCount(0, 23);
      // 指定分钟区间
      self.minuteCount(0, 59)
    }
    // 如果没有指定时间，则看有没有区间
    var defulutDate = '';
    if (self.default) {
      defulutDate = self.default;
    } else if (self.section) {
      defulutDate = section[0];
    }
    // 传值给父组件
    self.$emit('change', self.jionParams(self));
  },
  methods: {
    hoursChange (value, index) {
      var self = this;
      self.hoursValue = value;
      if (value <= self.sectionStart[0]) {
        self.minuteData = [];
        var minuteDiffMax = 59 - ~~self.sectionStart[1]; // 小时区间最大值
        for (let i = 0; i <= minuteDiffMax; i++) {
          self.minuteData.push(~~self.sectionStart[1] + i);
        }
      } else if (value === ~~self.sectionEnd[0]) {
        self.minuteData = [];
        for (let i = 0; i <= self.sectionEnd[1]; i++) {
          self.minuteData.push(i);
        }
      } else {
        self.minuteData = [];
        for (let i = 0; i <= 59; i++) {
          self.minuteData.push(i);
        }
      }
      // 传值给父组件
      self.$emit('change', self.jionParams(self));
      this.$children[1].rest(); // 重置分钟选择
    },
    minuteChange (value, index) {
      this.minuteValue = value;
      // 传值给父组件
      this.$emit('change', this.jionParams(this));
    },
    // 指定每月天数
    dayCount (sum) {
      var self = this;
      for (let i = 1; i <= sum; i++) {
        self.dayData.push(i);
      }
    },
    // 指定循环小时
    hoursCount (start, count) {
      var self = this;
      var s = start !== undefined ? start : 0;
      var c = count !== undefined ? count : 23;
      for (let i = s; i <= c; i++) {
        self.hoursData.push(i);
      }
    },
    // 指定循环分钟
    minuteCount (start, count) {
      var self = this;
      var s = start !== undefined ? start : 0;
      var c = count !== undefined ? count : 59;
      for (let i = s; i <= c; i++) {
        self.minuteData.push(i);
      }
    },
    // 拼接参数
    jionParams (self) {
      return {
        value: self.hoursValue + ':' + self.minuteValue,
        hours: self.hoursValue,
        minute: self.minuteValue
      };
    },
    // 选中时间
    currentTime () {},
    // 计算年份区间
    sectionDiff (value) {
      var self = this;
      var begun = value[0].split(':');
      var end = value[1].split(':');
      // 设置小时和分钟的默认值
      self.hoursValue = ~~begun[0];
      self.minuteValue = ~~begun[1];
      var hourDiffMax = ~~end[0] - ~~begun[0]; // 小时区间最大值
      // 小时区间
      var hourSection = [];
      for (let i = 0; i <= hourDiffMax; i++) {
        hourSection.push(~~begun[0] + i);
      }
      var minuteDiffMax = 59 - ~~begun[1]; // 小时区间最大值
      // 分钟区间
      var minuteSection = [];
      for (let i = 0; i <= minuteDiffMax; i++) {
        minuteSection.push(~~begun[1] + i);
      }
      self.minuteData = minuteSection; // 设置分钟区间
      self.begunHours = ~~begun[0]; // 开始时间(小时)
      self.begunMinute = ~~begun[1]; // 开始时间(分钟)
      self.endHours = ~~end[0]; // 结束时间(小时)
      self.endMinute = ~~end[1]; // 结束时间(分钟)
      return hourSection;
    },
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-date {
    display: flex;
    height: 13rem;
    margin-top: 2.5rem;
    position: relative;
    .flex-wrapper {
      display: flex;
      width: 100%;
    }
    &::after {
      content: '';
      background: #f9f9f9;
      height: 2rem;
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      border-bottom: 1px solid #e0dddd;
      border-top: 1px solid #e0dddd;
    }
  }
</style>
