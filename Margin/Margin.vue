<template>
    <div class='wt-margin' :style="Style">
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'wt-margin',
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
        return 'margin:' + this.all + 'rem';
      } else {
        var val = this.only.split(' ');
        switch (val.length) {
          case 1:
            return 'margin:' + val[0] + 'rem';
          case 2:
            return 'margin:' + val[0] + 'rem' + ' ' + val[1] + 'rem';
          case 3:
            return 'margin:' + val[0] + 'rem' + ' ' + val[1] + 'rem' + ' ' + val[2] + 'rem';
          case 4:
            return 'margin:' + val[0] + 'rem' + ' ' + val[1] + 'rem' + ' ' + val[2] + 'rem' + ' ' + val[3] + 'rem';
          default:
            return 'margin: 0.2rem';
        }
      }
    }
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
    .wt-margin {
        box-sizing: border-box;
    }
</style>
