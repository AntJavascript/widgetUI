<template>
    <div class='wt-gridView'>
        <ul>
            <li v-for="(item, index) in dataSource" :key="index" @click="handle(item, index)" :style="{'width': (100 / columns) + '%'}">
               <wt-ink>
                <wt-column>
                    <i :class="item.icon" v-if="item.icon" :style="{'color': item.color}"></i>
                    <span>{{item.title || item}}</span>
                </wt-column>
                </wt-ink>
            </li>
        </ul>
    </div>
</template>
<script>
import Ink from '../InkWell/InkWell';
import Column from '../Column/Column';
export default {
  name: 'mt-gridView',
  components: {
    'wt-ink': Ink,
    'wt-column': Column
  },
  props: {
    dataSource: {
      type: Array,
      default: function () {
        return [];
      }
    },
    columns: {
      type: Number | String,
      default: function () {
        return 3;
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {
    handle (item, index) {
      this.$emit('handle', item, index);
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-gridView {
    ul {
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        &:after {
            transform: scaleY(.5);
            height: 1px;
            content: '';
            // border-bottom: 1px solid #ccc;
            display: block;
            background: #ccc;
        }
        &:before {
            transform: scaleX(0.5);
            height: 100%;
            content: '';
            border-right: 1px solid #ccc;
            display: block;
            position: absolute;
            right: 0;
        }
        li {
            line-height: 2.2rem;
            font-size: 0.8rem;
            text-align: center;
            float: left;
            position: relative;
            i {
                font-size: 1.3rem;
                margin-top: 0.5rem;
            }
            span {
                font-size: 0.8rem;
            }
            &:after {
                transform: scaleY(.5);
                height: 1px;
                content: '';
                border-bottom: 1px solid #ccc;
                display: block;
            }
            &:before {
                transform: scaleX(0.5);
                height: 100%;
                content: '';
                border-right: 1px solid #ccc;
                display: block;
                position: absolute;
            }
        }
    }
}
</style>
