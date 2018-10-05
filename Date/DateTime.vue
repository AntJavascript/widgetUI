<template>
    <div class='wt-date'>
        <div class="flex-wrapper">
          <wt-picker :dataSource="yearData" @change="yaerChange"></wt-picker>
          <wt-picker :dataSource="monthData" @change="monthChange"></wt-picker>
          <wt-picker :dataSource="dayData" @change="dayChange"></wt-picker>
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
      // 年份的取值范围
      yearData: [],
      // 选择年份的值
      yearValue: '',
      // 月份的的取值范围
      monthData: [],
      // 选择月份的值
      monthValue: '1',
      // 日期的的取值范围
      dayData: [],
      // 选择某日的值
      dayValue: '1',
      // 设定默认选定时间
      curTime: '',
      // 开始时间(年)
      begunYear: '',
      // 结束时间(年)
      endYear: '',
      // 开始时间(月)
      begunMonth: '',
      // 结束时间(月)
      endMonth: '',
      // 开始时间(日)
      begunDay: '',
      // 结束时间(日)
      endDay: '',
      // 小时的的取值范围
      hoursData: [],
      // 选择小时的值
      hoursValue: '',
      // 分钟的的取值范围
      minuteData: [],
      // 选择分钟的值
      minuteValue: '',
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
      self.sectionStart = new Date(section[0]);
      self.sectionEnd = new Date(section[1]);
      self.yearData = self.sectionDiff(section);
      // 指定默认时间
      self.curTime = self.currentTime(section[0]);
      if (self.yearValue === self.begunYear) {
        // 指定月份，小于指定区间月份则不显示
        for (let i = self.begunMonth; i <= 12; i++) {
          self.monthData.push(i);
        }
        var maxDay = self.getMaxDay(self.yearValue, self.begunMonth);
        // 指定每月天数区间
        for (let i = self.begunDay; i <= maxDay; i++) {
          self.dayData.push(i);
        }
        // 指定小时区间
        for (let i = self.hoursValue; i <= 23; i++) {
          self.hoursData.push(i);
        }
        // 指定分钟区间
        for (let i = self.minuteValue; i <= 59; i++) {
          self.minuteData.push(i);
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
      self.dayCount(maxDay);
      // 指定小时区间
      self.hoursCount(0, 23);
      // 指定分钟区间
      self.minuteCount(0, 59)
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
        value: '' + self.yearValue + '/' + self.monthValue + '/' + self.dayValue + ' ' + self.hoursValue + ':' + self.minuteValue,
        year: self.yearValue,
        month: self.monthValue,
        day: self.dayValue,
        hours: self.hoursValue,
        minute: self.minuteValue
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
      var hours = date.getHours(); // 当前小时
      var minute = date.getMinutes(); // 当前分钟
      // 设置默认值
      self.yearValue = year;
      self.monthValue = month;
      self.dayValue = day;
      self.hoursValue = hours; // 小时
      self.minuteValue = minute; // 分钟
      return {
        year,
        month,
        day,
        hours,
        minute
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
        self.hoursData = []; // 清空小时数据
        self.minuteData = []; // 清空分钟数据
        if (this.yearValue <= self.begunYear) {
          self.monthValue = self.begunMonth; // 指定月份
          self.dayValue = self.begunDay; // 指定日期
          self.hoursValue = self.begunHours; // 小时
          self.minuteValue = self.begunMinute; // 分钟
          // 指定月份，小于指定区间月份则不显示
          for (let i = self.begunMonth; i <= 12; i++) {
            self.monthData.push(i);
          }
          var maxDay = self.getMaxDay(this.yearValue, self.begunMonth);
          // 指定每月天数
          for (let i = self.begunDay; i <= maxDay; i++) {
            self.dayData.push(i);
          }
          // 指定小时
          self.hoursCount(self.begunHours, 23);
          // 指定分钟
          self.minuteCount(self.begunMinute, 59);
        } else if (this.yearValue >= self.endYear) {
          self.monthValue = 1; // 指定月份
          self.dayValue = 1; // 指定日期
          self.hoursValue = 0; // 小时
          self.minuteValue = 0; // 分钟
          // 指定月份
          for (let i = 1; i <= self.endMonth; i++) {
            self.monthData.push(i);
          }
          if (this.monthValue < self.endMonth) {
            // 指定小时
            self.hoursCount();
            // 指定分钟
            self.minuteCount();
          } else {
            // 指定小时
            self.hoursCount(self.endHours, 23);
            // 指定分钟
            self.minuteCount(self.endMinute, 59);
          }
          var maxDay = self.getMaxDay(this.yearValue, 1);
          // 区间最后月份大于 <= 1 就要计算日期数量
          if (self.endMonth <= 1) {
            // 指定每月天数
            self.dayCount(self.endDay);
          } else {
            // 指定每月天数
            self.dayCount(maxDay);
          }
        } else {
          // 指定月份，固定的12个月
          for (let i = 1; i <= 12; i++) {
            self.monthData.push(i);
          }
          // 指定小时
          self.hoursCount();
          // 指定分钟
          self.minuteCount();
          this.monthValue = 1; // 指定月份
          this.dayValue = 1; // 指定日期
          self.hoursValue = 0; // 小时
          self.minuteValue = 0; // 分钟
          var maxDay = self.getMaxDay(this.yearValue, 1);
          // 指定每月天数
          self.dayCount(maxDay);
        }
        this.$children[1].rest(); // 重置月份选择
        this.$children[2].rest(); // 重置日期选择
        this.$children[3].rest(); // 重置小时选择
        this.$children[4].rest(); // 重置分钟选择
      } else {}
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
        self.hoursData = []; // 清空小时数据
        self.minuteData = []; // 清空分钟数据
        if (this.yearValue <= self.begunYear && self.monthValue <= self.begunMonth) {
          self.dayValue = self.begunDay; // 指定日期
          self.hoursValue = self.begunHours; // 小时
          self.minuteValue = self.begunMinute; // 分钟
          var maxDay = self.getMaxDay(self.monthValue, self.begunMonth);
          // 指定每月天数
          for (let i = self.begunDay; i <= maxDay; i++) {
            self.dayData.push(i);
          }
          // 指定小时
          self.hoursCount(self.begunHours, 23);
          // 指定分钟
          self.minuteCount(self.begunMinute, 59);
        } else if (this.yearValue === self.endYear && self.monthValue >= self.endMonth) {
          self.dayValue = self.endDay; // 指定日期
          self.hoursValue = self.endHours; // 小时
          self.minuteValue = self.endMinute; // 分钟
          // 指定每月天数
          self.dayCount(self.endDay);
          if (self.dayValue >= self.endDay) {
            // 指定小时
            self.hoursCount();
            // 指定分钟
            self.minuteCount();
          } else {
            // 指定小时
            self.hoursCount(self.endHours, 23);
            // 指定分钟
            self.minuteCount(self.endMinute, 59);
          }
        } else {
          this.dayValue = 1; // 指定日期
          self.hoursValue = 0; // 小时
          self.minuteValue = 0; // 分钟
          // 指定每月天数
          self.dayCount(maxDay);
          // 指定小时
          self.hoursCount();
          // 指定分钟
          self.minuteCount();
        }
        this.$children[2].rest(); // 重置日期选择
        this.$children[3].rest(); // 重置小时选择
        this.$children[4].rest(); // 重置分钟选择
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
      var self = this;
      this.dayValue = value;
      if (self.section) {
        self.hoursData = []; // 清空小时数据
        self.minuteData = []; // 清空分钟数据
        self.hoursValue = 0; // 指定日期
        self.minuteValue = 0; // 分钟
        if (this.yearValue <= self.begunYear && self.monthValue <= self.begunMonth && self.dayValue <= self.begunDay) {
          // 指定小时
          self.hoursCount(self.begunHours, 23);
          // 指定分钟
          self.minuteCount(self.begunMinute, 59);
        } else if (this.yearValue === self.endYear && self.monthValue >= self.endMonth && self.dayValue >= self.endDay) {
          // 指定小时
          self.hoursCount(0, self.endHours);
          // 指定分钟
          self.minuteCount(0, self.endMinute);
        } else {
          // 指定小时
          self.hoursCount();
          // 指定分钟
          self.minuteCount();
        }
      }
      this.$children[3].rest(); // 重置小时选择
      this.$children[4].rest(); // 重置分钟选择
      // 传值给父组件
      this.$emit('change', this.jionParams(this));
    },
    hoursChange (value, index) {
      var self = this;
      this.hoursValue = value;
      // 传值给父组件
      this.$emit('change', this.jionParams(this));
    },
    minuteChange (value, index) {
      this.minuteValue = value;
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
      self.begunHours = new Date(value[0]).getHours(); // 开始时间(小时)
      self.begunMinute = new Date(value[0]).getMinutes(); // 开始时间(分钟)
      self.endHours = new Date(value[1]).getHours(); // 结束时间(小时)
      self.endMinute = new Date(value[1]).getMinutes(); // 结束时间(分钟)
      return yearSection;
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
