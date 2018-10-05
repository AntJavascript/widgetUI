<template>
    <div class='wt-padding' :style="Style">
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-padding',
  props: {
    all: {
      type: String | Number,
      default: () => {
        return '0.2';
      }
    },
    only: {
      type: String | Number,
      default: () => {
        return '';
      }
    }
  },
  data () {
    return {
    };
  },
  computed: {
    // 拼接class
    Style: function () {
      if (this.only === '') {
        return 'padding:' + this.all + 'rem';
      } else {
        var val = this.only.split(' ');
        switch (val.length) {
          case 1:
            return 'padding:' + val[0] + 'rem';
          case 2:
            return 'padding:' + val[0] + 'rem' + ' ' + val[1] + 'rem';
          case 3:
            return 'padding:' + val[0] + 'rem' + ' ' + val[1] + 'rem' + ' ' + val[2] + 'rem';
          case 4:
            return 'padding:' + val[0] + 'rem' + ' ' + val[1] + 'rem' + ' ' + val[2] + 'rem' + ' ' + val[3] + 'rem';
          default:
            return 'padding: 0.2rem';
        }
      }
    }
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
    .wt-padding {
        box-sizing: border-box;
    }
</style>
