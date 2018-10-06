<template>
    <div class='wt-date'>
        <div class="flex-wrapper">
          <wt-picker :dataSource="yearData" @change="yaerChange"></wt-picker>
          <wt-picker :dataSource="monthData" @change="monthChange"></wt-picker>
          <wt-picker :dataSource="dayData" @change="dayChange"></wt-picker>
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
      yearData: [], // 年份的取值范围
      yearValue: '', // 选择年份的值
      monthData: [],
      monthValue: '1', // 选择月份的值
      dayData: [], // 某月的总数量
      dayValue: '1', // 选择某日的值
      curTime: '', // 设定默认选定时间
      begunYear: '', // 开始时间(年)
      endYear: '', // 结束时间(年)
      begunMonth: '', // 开始时间(月)
      endMonth: '', // 结束时间(月)
      begunDay: '', // 开始时间(日)
      endDay: '' // 结束时间(日)
    };
  },
  created () {
    var self = this;
    var section = '';
    // 如果有指定取值范围
    if (self.section) {
      section = self.section.replace(/[\\[\]]/g, '').split('-');
      self.yearData = self.sectionDiff(section);
      // 指定默认时间
      self.curTime = self.currentTime(section[0]);
      if (self.yearValue === self.begunYear) {
        // 指定月份，小于指定区间月份则不显示
        for (let i = self.begunMonth; i <= self.endMonth; i++) {
          self.monthData.push(i);
        }
        var maxDay = self.getMaxDay(self.yearValue, self.begunMonth);
        // 指定每月天数
        for (let i = self.begunDay; i <= maxDay; i++) {
          self.dayData.push(i);
        }
      }
    } else {
      // 如果没有指定取值范围
      var year = new Date().getFullYear(); // 当前年份
      var month = new Date().getMonth() + 1; // 当前月份
      // 没有指定取值范围则取当前年份的前后各10年
      section = [year - 10, year + 10];
      // 赋值年份初始值
      self.yearValue = section[0];
      for (let i = 0; i <= ~~section[1] - ~~section[0]; i++) {
        self.yearData.push(~~section[0] + i);
      }
      // 指定月份，固定的12个月
      for (let i = 1; i <= 12; i++) {
        self.monthData.push(i);
      }
      var maxDay = self.getMaxDay(year, month);
      // 指定每月天数
      for (let i = 1; i <= maxDay; i++) {
        self.dayData.push(i);
      }
      // 指定默认时间
      self.curTime = self.currentTime(defulutDate);
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
    // 获取某月的最大天数
    getMaxDay: (year, month) => {
      var date = new Date(year, month, 0);
      return date.getDate();
    },
    // 格式化日期
    fomatDate: (year, month, day) => {
      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return '';
      }
      var y = year;
      var m = month >= 10 ? month : '0' + month;
      var d = day >= 10 ? day : '0' + day;
      return y + '/' + m + '/' + d;
    },
    // 拼接参数
    jionParams (self) {
      return {
        value: '' + self.yearValue + '/' + self.monthValue + '/' + self.dayValue,
        year: self.yearValue,
        month: self.monthValue,
        day: self.dayValue
      };
    },
    // 获取当前时间
    currentTime (val) {
      var self = this;
      var date = '';
      // 如果有值的话
      if (val) {
        date = new Date(val);
      } else {
        // 如果没有值，则获取10年前的1月1号
        date = new Date(this.yearData[0] + '/01/01');
      }
      var year = date.getFullYear(); // 当前年份
      var month = date.getMonth() + 1; // 当前月份
      var day = date.getDate(); // 当前是几号
      // 设置默认值
      self.yearValue = year;
      self.monthValue = month;
      self.dayValue = day;
      return {
        year,
        month,
        day
      };
    },
    yaerChange (value, index) {
      var self = this;
      // 选中年份的值
      this.yearValue = value;
      // 如果有限制区间选择
      if (self.section) {
        self.monthData = []; // 清空月份数据
        self.dayData = []; // 清空日期数据
        if (this.yearValue <= self.begunYear) {
          // 指定月份，小于指定区间月份则不显示
          for (let i = self.begunMonth; i <= 12; i++) {
            self.monthData.push(i);
          }
          var maxDay = self.getMaxDay(this.yearValue, self.begunMonth);
          // 指定每月天数
          for (let i = self.begunDay; i <= maxDay; i++) {
            self.dayData.push(i);
          }
          this.monthValue = self.begunMonth; // 指定月份
          this.dayValue = self.begunDay; // 指定日期
        } else if (this.yearValue >= self.endYear) {
          // 指定月份，固定的12个月
          for (let i = 1; i <= self.endMonth; i++) {
            self.monthData.push(i);
          }
          this.monthValue = self.endMonth; // 指定月份
          this.dayValue = self.endDay; // 指定日期
          var maxDay = self.getMaxDay(this.yearValue, 1);
          // 区间最后月份大于 <= 1 就要计算日期数量
          if (self.endMonth <= 1) {
            // 指定每月天数
            for (let i = 1; i <= self.endDay; i++) {
              self.dayData.push(i);
            }
          } else {
            // 指定每月天数
            for (let i = 1; i <= maxDay; i++) {
              self.dayData.push(i);
            }
          }
        } else {
          // 指定月份，固定的12个月
          for (let i = 1; i <= 12; i++) {
            self.monthData.push(i);
          }
          this.monthValue = 1; // 指定月份
          this.dayValue = 1; // 指定日期
          var maxDay = self.getMaxDay(this.yearValue, 1);
          // 指定每月天数
          for (let i = 1; i <= maxDay; i++) {
            self.dayData.push(i);
          }
        }
        this.$children[1].rest(); // 重置月份选择
        this.$children[2].rest(); // 重置日期选择
      }
      // 传值给父组件
      this.$emit('change', this.jionParams(this));
    },
    monthChange (value, index) {
      var self = this;
      // 选中月份的值
      this.monthValue = value;
      var maxDay = this.getMaxDay(this.yearValue, this.monthValue);
      // 如果有限制区间选择
      if (self.section) {
        self.dayData = []; // 清空日期数据
        if (this.yearValue <= self.begunYear && self.monthValue <= self.begunMonth) {
          this.dayValue = self.begunDay; // 指定日期
          var maxDay = self.getMaxDay(self.monthValue, self.begunMonth);
          // 指定每月天数
          for (let i = self.begunDay; i <= maxDay; i++) {
            self.dayData.push(i);
          }
        } else if (this.yearValue === self.endYear && self.monthValue >= self.endMonth) {
          this.dayValue = 1; // 指定日期
          // 指定每月天数
          self.dayCount(self.endDay);
        } else {
          this.dayValue = 1; // 指定日期
          // 指定每月天数
          self.dayCount(maxDay);
        }
        this.$children[2].rest(); // 重置日期选择
      } else {
        this.dayData = []; // 清空日期数据
        // 指定每月天数
        self.dayCount(maxDay);
      }
      this.$children[2].rest(); // 重置日期选择
      // 传值给父组件
      this.$emit('change', this.jionParams(this));
    },
    dayChange (value, index) {
      this.dayValue = value;
      // 传值给父组件
      this.$emit('change', this.jionParams(this));
    },
    // 计算年份区间
    sectionDiff (value) {
      var self = this;
      var begun = new Date(value[0]).getFullYear(); // 开始时间
      var end = new Date(value[1]).getFullYear(); // 结束时间
      var section = end - begun;
      var yearSection = [];
      for (let i = 0; i <= section; i++) {
        yearSection.push(begun + i);
      }
      self.begunYear = begun; // 开始时间(年)
      self.endYear = end; // 结束时间(年)
      self.begunMonth = new Date(value[0]).getMonth() + 1; // 开始时间(月)
      self.endMonth = new Date(value[1]).getMonth() + 1; // 结束时间(月)
      self.begunDay = new Date(value[0]).getDate(); // 开始时间(日)
      self.endDay = new Date(value[1]).getDate(); // 结束时间(日)
      return yearSection;
    },
    // 指定每月天数
    dayCount (sum) {
      var self = this;
      for (let i = 1; i <= sum; i++) {
        self.dayData.push(i);
      }
    }
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
