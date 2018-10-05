<template>
    <div class='wt-search'>
        <div class="placeholder" v-show="!isblur" @click="handle" >
            <i class="icon-search"></i>
            <span>{{placeholder}}</span>
        </div>
        <i class="icon-search"></i>
        <form action="" @submit="submit">
            <input type="search" ref="search" v-model="val"/>
        </form>
        <i class="icon-close-fill" @click="clear"></i>
        <wt-ink @click.native="cancel">
            <div class="btn">取消</div>
        </wt-ink>
    </div>
</template>
<script>
import Ink from '../InkWell/InkWell';
export default {
  name: 'wt-search',
  props: {
    placeholder: {
      type: String,
      default: () => {
        return '搜索';
      }
    }
  },
  components: {
    'wt-ink': Ink
  },
  data () {
    return {
      val: '',
      isblur: false // 是否有获取焦点
    };
  },
  methods: {
    handle () {
      this.isblur = true;
      this.$refs.search.focus();
    },
    submit () {
      event.preventDefault();
      this.$emit('submit', this.val);
      return false;
    },
    // 清理输入内容
    clear () {
      this.val = '';
    },
    // 取消
    cancel () {
      this.isblur = false;
      this.val = '';
      this.$emit('cancel');
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
    .wt-search {
        height: 1.5rem;
        position: relative;
        padding: 0.5rem;
        background: #EFEFF4;
        display: flex;
        .icon-search {
            font-size: 0.8rem;
            width: 1rem;
            line-height: 1.5rem;
            color: #999;
            margin-left: 0.2rem;
            padding: 0 0.2rem;
            background: #fff;
            border-top-left-radius: 0.4rem;
            border-bottom-left-radius: 0.4rem;
        }
        .icon-close-fill {
            background: #fff;
            border-top-right-radius: 0.4rem;
            border-bottom-right-radius: 0.4rem;
            width: 1.5rem;
            line-height: 1.5rem;
            color: #cacaca;
            text-align: center;
        }
        .btn {
            font-size: 0.7rem;
            min-width: 2rem;
            line-height: 1.5rem;
            text-align: center;
        }
        form {
            background: #fff;
            border: 0;
            line-height: 1.5rem;
            width: 100%;
            display: block;
        }
        input {
            outline: none;
            -webkit-appearance: none;
            background: #fff;
            border: 0;
            height: 1.5rem;
            width: 100%;
            display: block;
            &::-webkit-search-cancel-button{
                display: none;
            }
        }
        .placeholder {
            position: absolute;
            width: 100%;
            width: calc(100% - 1rem);
            top: 0.5rem;
            font-size: 0.8rem;
            color: #999;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            height: 1.5rem;
            align-items: center;
            background: #fff;
            left: 0.5rem;
            border-radius: 0.4rem;
            i {
                display: inline-block;
                margin-right: 5px;
            }
            span {
                display: inline-block;
                font-size: 0.7rem;
            }
        }
    }
</style>
