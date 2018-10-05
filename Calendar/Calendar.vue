<template>
  <div class='wt-calendar'>
    <div class="date mint-content">
      <div class="calendar-content">
        <!-- 年份 月份 -->
      <div class="year-month" :class="{'showBtn':showBtn}">
        <wt-button v-if="showBtn" title="取消" type="default" size="small" style="width: 3rem;" @click.native="cancel"></wt-button>
        <div class="month">
            <i class="icon-back" @click="pickPreNext(currentYear,currentMonth,0)">  </i>
            <span>{{ currentYear }} 年 {{ currentMonth }} 月</span>
            <i class="icon-right" @click="pickPreNext(currentYear,currentMonth,42)">  </i>
        </div>
        <wt-button v-if="showBtn" title="确定" type="primary" size="small" style="width: 3rem;" @click.native="comfirm"></wt-button>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
      </ul>
      <!-- 日期 -->
      <div class="bodyDiv" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" :class="classMove">
        <ul class="days" v-for="(value,index1) in daysUL" :key="index1">
          <li @click="pick(day,index+index1*7)" v-for="(day, index) in value" :key="index">
            <!--本月-->
            <div class="dateItem"
               :class="{
                'disabled':disabledClassName(day),
                'other': otherClassNme(day),
                'currentDay': currentDayClassName(day),
                'selected': selectedClassNme(day, index, index1)
                }">
              <span v-if="day==='spaces'"></span>
              <span v-else >{{ day.getDate() }}</span>
           </div>
          </li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from '../Button/Button';
export default {
  components: {
    'wt-button': Button
  },
  name: 'wt-calendar',
  props: {
    isFull: {
      type: String,
      default: () => {
        return undefined;
      }
    },
    section: {
      type: String,
      default: () => {
        return '';
      }
    },
    showBtn: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data () {
    return {
      days: [], // 用于临时存储数据
      daysUL: [],
      isSelected: [],
      currentYear: '',
      currentMonth: '',
      selectIndex: '',
      firstWeek: 1,
      classMove: '',
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      moveing: false,
      sectionBegin: this.section !== '' ? this.section.split('-')[0].replace(/\[/, '') : '',
      sectionEnd: this.section !== '' ? this.section.split('-')[1].replace(/\]/, '') : '',
      beforeSpaces: [], // 前面需要空几天
      currentDate: new Date() // 选中的日期
    };
  },
  created () {
    var self = this;
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
    self.initData(self.formatDate(this.currentYear, this.currentMonth, 1), true);
  },
  methods: {
    // 取消
    cancel () {
      this.$emit('cancel');
    },
    // 确定
    comfirm () {
      this.$emit('comfirm', this.currentDate);
    },
    touchStart () {
      // 开始触摸坐标
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchMove () {
      // 移动触摸坐标
      this.moveX = event.touches[0].clientX;
      this.moveY = event.touches[0].clientY;
      if (Math.abs(this.startY - this.moveY) > 30) {
        return;
      } else {
        event.preventDefault();
      }
      event.preventDefault();
    },
    touchEnd () {
      // 300毫秒内只允许滑动一次，避免滑动过快
      if (this.moveing) {
        return;
      }
      this.moveing = true;
      setTimeout(() => {
        this.moveing = false;
      }, 300);
      var self = this;
      var distance = this.moveX - this.startX;
      // 如果往左滑 < -50 就生成下一月数据
      if (this.moveX !== 0 && distance < -50) {
        // 如果有section参数
        if (self.section) {
          if (self.currentMonth === 12) {
            self.classMove = 'animated fadeInRight';
            if (new Date((self.currentYear + 1) + '/1/1') < new Date(self.sectionEnd)) {
              self.pickPreNext(self.currentYear, self.currentMonth, 42);
            }
          } else if (new Date(self.currentYear + '/' + (self.currentMonth + 1) + '/1') <= new Date(self.sectionEnd)) {
            self.classMove = 'animated fadeInRight';
            self.pickPreNext(self.currentYear, self.currentMonth, 42);
          }
        } else {
          self.classMove = 'animated fadeInRight';
          self.pickPreNext(self.currentYear, self.currentMonth, 42);
        }
      // 如果往左滑 > 50 就生成上一月数据
      } else if (distance > 50) {
        // 如果有section参数
        if (self.section) {
          if (self.currentMonth === 1) {
            self.classMove = 'animated fadeInLeft';
            if (new Date((self.currentYear - 1) + '/12/1') > new Date(self.sectionBegin)) {
              self.pickPreNext(self.currentYear, self.currentMonth, 0);
            }
          } else if (new Date(self.currentYear + '/' + self.currentMonth + '/1') > new Date(self.sectionBegin)) {
            self.classMove = 'animated fadeInLeft';
            self.pickPreNext(self.currentYear, self.currentMonth, 0);
          }
        } else {
          self.classMove = 'animated fadeInLeft';
          self.pickPreNext(self.currentYear, self.currentMonth, 0);
        }
      }
      setTimeout(function () {
        self.classMove = '';
        self.startX = 0;
        self.moveX = 0;
      }, 200);
    },
    // 格式化日期
    formatDate (year, month, day) {
      const y = year;
      let m = month;
      if (m < 10) m = `0${m}`;
      let d = day;
      if (d < 10) d = `0${d}`;
      return `${y}/${m}/${d}`;
    },
    // 初始化日期
    initData (cur, init) {
      var self = this;
      var paramDate = new Date(cur);
      self.currentYear = paramDate.getFullYear();
      self.currentMonth = paramDate.getMonth() + 1;
      self.days.length = 0;
      // 没有的日期用 "spaces" 代替
      self.firstWeek = self.dayWeek(paramDate.getFullYear(), paramDate.getMonth() + 1);
      var beforeSpaces = new Array(self.firstWeek - 1).fill('spaces', 0, self.firstWeek - 1);
      self.beforeSpaces = beforeSpaces;
      // 如果存在 ifFull 参数说明需要显示42天
      if (self.isFull !== undefined) {
        var prevMonth = '';
        // 如果当前月份是1月
        if (self.currentMonth === 1) {
          prevMonth = new Date(self.currentYear - 1, 12, 0).getDate(); // 取上一个月的最后一天
          beforeSpaces.forEach((item, index) => {
            self.days.push(new Date(self.currentYear - 1 + '/' + '12/' + (prevMonth - (beforeSpaces.length - (index + 1)))));
          });
        } else {
          prevMonth = new Date(self.currentYear, self.currentMonth - 1, 0).getDate(); // 取上一个月的最后一天
          beforeSpaces.forEach((item, index) => {
            self.days.push(new Date(self.currentYear + '/' + (self.currentMonth - 1) + '/' + (prevMonth - (beforeSpaces.length - (index + 1)))));
          });
        }
      } else {
        beforeSpaces.forEach((item, index) => {
          self.days.push(item);
        });
      }
      self.isSevenDay();
      // 循环当月总天数
      var curMonthDays = self.getcurMonthDays(self.currentYear, self.currentMonth);
      for (let i = 0; i <= curMonthDays; i += 1) {
        const d = new Date(self.currentYear + '/' + self.currentMonth + '/' + 1);
        if (i < curMonthDays) {
          // 小于当月最大天数，放入数组
          d.setDate(d.getDate() + i);
          self.days.push(d);
        } else {
          // 不足7天用 "spaces" 代替
          for (let j = self.days.length, l = 1; j < 7; j++, l++) {
            // 如果存在 ifFull 参数说明需要显示42天
            if (self.isFull !== undefined) {
              if (self.currentMonth === 12) {
                self.days.push(new Date((self.currentYear + 1) + '/1/' + l));
              } else {
                self.days.push(new Date(self.currentYear + '/' + (self.currentMonth + 1) + '/' + l));
              }
            } else {
              // self.days.push('spaces');
            }
          }
        }
        self.isSevenDay();
      }
      // 如果没有42条数据
      if (self.isFull !== undefined && self.daysUL.length < 6) {
        let lastData = self.daysUL[self.daysUL.length - 1][6]; // 最后一条数据
        for (let j = lastData.getDate(); j < (7 + lastData.getDate()); j++) {
          self.days.push(new Date(lastData.getFullYear() + '/' + (lastData.getMonth() + 1) + '/' + j));
        }
        self.isSevenDay();
      }
      // 如果 self.daysUL[0] 没有值
      if (self.isFull !== undefined && self.daysUL[0].length === 0) {
        self.daysUL.splice(0, 1);
        let lastData = self.daysUL[self.daysUL.length - 1][6]; // 最后一条数据
        for (let j = lastData.getDate(); j < (7 + lastData.getDate()); j++) {
          self.days.push(new Date(lastData.getFullYear() + '/' + (lastData.getMonth() + 1) + '/' + j));
        }
        self.isSevenDay();
      }
    },
    // 某月1号是星期几
    dayWeek (year, month) {
      var week = new Date('' + year + '/' + month + '/' + '1').getDay();
      return week === 0 ? 7 : week;
    },
    // 是否有7天数据，有的话push给 "daysUL"
    isSevenDay () {
      if (this.days.length % 7 === 0) {
        this.daysUL.push(this.days);
        this.days = [];
      }
    },
    // 是否的当天
    isToDay (year, month, day) {
      var toDate = new Date();
      return toDate.getFullYear() === year && toDate.getMonth() + 1 === month && toDate.getDate() === day;
    },
    // 是否的当月
    isToMonth (year, month) {
      var toDate = new Date();
      var day = toDate.getDate();
      if (toDate.getFullYear() === year && toDate.getMonth() + 1 === month) {
        this.selectIndex = day + this.beforeSpaces.length;
        return true;
      } else {
        return false;
      }
    },
    // 获取当月有多少天
    getcurMonthDays (year, month) {
      var curMonthDays = new Date(year, month, 0).getDate();
      return curMonthDays;
    },
    // 上一個月&下一个月   传入当前年份和月份
    pickPreNext (year, month, num) {
      var sectionBeginDate = new Date(this.sectionBegin);
      var sectionEndDate = new Date(this.sectionEnd);
      const d = new Date(this.formatDate(year, month === 0 ? 1 : month, 1));
      if (num === 42) {
        var max = this.getcurMonthDays(year, month);
        d.setDate(max + 1);
      } else {
        d.setDate(num);
      }
      var curmnth = 0;
      if (month === 0) {
        curmnth = d.getMonth();
      } else {
        curmnth = d.getMonth() + 1;
      }
      // 处理点击超出范围逻辑
      if (this.section !== '') {
        if (!(d > sectionBeginDate) || !(d <= sectionEndDate)) {
          alert();
          return;
        }
      }
      this.daysUL = [];
      this.isSelected = [];
      this.selectIndex = '';
      if (this.isToMonth(d.getFullYear(), curmnth)) {
        this.initData(this.formatDate(d.getFullYear(), curmnth, 1), true);
      } else {
        this.initData(this.formatDate(d.getFullYear(), curmnth, 1), true);
      }
    },
    // 返回今天
    returnNow () {
      this.daysUL = [];
      this.initData(null);
    },
    // 当前选择日期
    pick (date, index) {
      if (this.disabledClassName(date)) {
        return;
      }
      if (date === 'spaces') {
        return;
      }
      this.selectIndex = index;
      this.isSelected = [];
      for (let i = 0; i < 42; i++) {
        if (index === i) {
          this.isSelected.push(true);
          continue;
        }
        this.isSelected.push(false);
      }
      this.currentDate = date;
      // 传值父组件
      this.$emit('change', date);
    },
    // 显示 other 类
    otherClassNme (day) {
      var self = this;
      if (new Date(day).getFullYear() === self.currentYear && (day.getMonth() + 1) === self.currentMonth) {
        return false;
      } else {
        return true;
      }
    },
    // 显示 currentDay 类
    currentDayClassName (day) {
      // 年月日都相等，则显示currentDay类，说明是当天
      if (new Date(day).getFullYear() === new Date().getFullYear() && (day.getMonth() + 1) === (new Date().getMonth() + 1) && day.getDate() === new Date().getDate()) {
        return true;
      } else {
        return false;
      }
    },
    /*
     * 年月日都相等
    */
    selectedClassNme (day, index, index1) {
      var self = this;
      var date = new Date();
      if (self.isSelected[(index + index1 * 7)] || (new Date(day).getFullYear() === date.getFullYear() && (day.getMonth() + 1) === (date.getMonth() + 1) && day.getDate() === date.getDate() && self.isSelected.length === 0)) {
        return true;
      } else {
        return false;
      }
    },
    // 超出规定范围，是否允许点击
    disabledClassName (day) {
      var date = new Date(day);
      var sectionBeginDate = new Date(this.sectionBegin);
      var sectionEndDate = new Date(this.sectionEnd);
      if (date < sectionBeginDate || date > sectionEndDate) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted () {
  }
};
</script>
<style scoped lang="less" rel="styleSheet/less">
  @import './calendar.less';
</style>
