<template>
    <div class='wt-date-picker'>
      <div class="head">
        <wt-row>
            <wt-button title="取消" type="default" size="small" style="width: 3rem;" @click.native="cancel"></wt-button>
            <wt-button title="确定" type="primary" size="small" style="width: 3rem;" @click.native="comfirm"></wt-button>
        </wt-row>
      </div>
        <datePicker v-if="type =='date'" @change="change" :section="section"></datePicker>
        <dateTimePicker v-if="type =='dateTime'" @change="change" :section="section"></dateTimePicker>
        <timePicker v-if="type =='time'" @change="change" :section="section"></timePicker>
    </div>
</template>
<script>
import Row from '../Row/Row.vue';
import Button from '../Button/Button.vue';
import datePicker from './Date.vue';
import dateTimePicker from './DateTime.vue';
import timePicker from './Time.vue';
export default {
  name: 'wt-date',
  components: {
    datePicker,
    dateTimePicker,
    timePicker,
    'wt-row': Row,
    'wt-button': Button
  },
  props: {
    type: {
      type: String,
      default: () => {
        return 'date';
      }
    },
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
    },
  },
  data () {
    return {
      pickerValue: ''
    };
  },
  methods: {
    change (value) {
      this.pickerValue = value;
    },
    // 取消按钮
    cancel () {
      this.$emit('cancel');
    },
    // 确定按钮
    comfirm () {
      this.$emit('comfirm', this.pickerValue);
    }
  }
};
</script>
<style lang='less' scoped>
    .wt-date-picker {
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
    }
</style>
