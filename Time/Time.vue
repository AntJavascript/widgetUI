<template>
    <div class='wt-time'>
        <p>{{showTime}}</p>
    </div>
</template>
<script>
import {utils} from '../common/utils';
export default {
  name: 'wt-time',
  props: {
    time: {
      type: String | Number,
      default: () => {
        return utils.getcurrentDate();
      }
    },
    type: {
      type: String,
      default: () => {
        return utils.getcurrentDate('', 'date');
      }
    }
  },
  data () {
    return {
    };
  },
  computed: {
    showTime: function () {
      return utils.getcurrentDate(this.time, this.type);
    }
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>

</style>
