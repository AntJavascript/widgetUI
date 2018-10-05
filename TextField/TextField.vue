<template>
    <div class='wt-TextField'>
        <input :type="type" :maxlength="max" v-model="val" :placeholder="placeholder" @blur="blur" @change="change" @input="input" @focus="focus"/>
        <i class="icon-close-fill" @click="clearValue" v-if="clear != undefined"></i>
    </div>
</template>
<script>
export default {
  name: 'wt-TextField',
  props: {
    type: {
      type: String,
      default: () => {
        return 'text';
      }
    },
    max: {
      type: String | Number,
      default: () => {
        return '';
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return '';
      }
    },
    clear: {
      type: String,
      default: () => {
        return undefined;
      }
    }
  },
  data () {
    return {
      val: '' // 输入框的值
    };
  },
  methods: {
    // 失去焦点
    blur () {
      this.$emit('blur', event.target.value);
    },
    // change事件
    change () {
      this.$emit('change', event.target.value);
    },
    // input事件
    input () {
      this.$emit('input', event.target.value);
    },
    // focus事件
    focus () {
      this.$emit('focus', event.target.value);
    },
    // 清理输入内容
    clearValue () {
      this.val = '';
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
    .wt-TextField {
        height: 1.5rem;
        position: relative;
        padding: 0.5rem;
        display: flex;
        i {
            background: #fff;
            width: 1.5rem;
            line-height: 1.5rem;
            color: #cacaca;
            text-align: center;
        }
        input {
            outline: none;
            -webkit-appearance: none;
            background: #fff;
            border: 0;
            height: 1.5rem;
            width: 100%;
            display: block;
            padding-left: 0.2rem;
            box-sizing: border-box;
            &::-webkit-search-cancel-button{
                display: none;
            }
        }
    }
</style>
