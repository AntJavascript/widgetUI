<template>
    <div class='wt-textarea'>
       <textarea :maxlength="max" v-model="value" :placeholder="placeholder"></textarea>
       <p v-if="tip !=undefined">{{ value.length + '/' + max}}</p>
    </div>
</template>
<script>
export default {
  name: 'wt-textArea',
  props: {
    max: {
      type: String | Number,
      default: () => {
        return 120;
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return '';
      }
    },
    tip: {
      type: String,
      default: () => {
        return undefined;
      }
    }
  },
  data () {
    return {
      value: '' // 输入的值
    };
  },
  methods: {
    // input事件
    input () {
      this.$emit('input', event.target.value);
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
    .wt-textarea {
        width: 100%;
        position: relative;
        padding: 0.5rem;
        box-sizing: border-box;
        height: 5rem;
        textarea {
            width: 100%;
            height: 100%;
            resize: none;
            padding: 0.2rem;
            box-sizing: border-box;
            outline: none;
            border: 1px solid #eee;
            font-size: 0.7rem;
        }
        p {
            font-size: 0.7rem;
            text-align: right;
        }
    }
</style>
