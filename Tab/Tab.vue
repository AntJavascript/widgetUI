<template>
    <div class="wt-tab">
        <div class="tab">
            <ul :class="type">
                <li v-for="(item, index) in dataSource" :key="index" @click="handle(item, index)" :class="{active:active == index}">
                    {{item.text}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'wt-tab',
  props: {
    dataSource: {
      type: Array,
      default: () => {
        return [];
      }
    },
    currIndex: {
      type: Number | String,
      default: () => {
        return 0;
      }
    },
    type: {
      type: String,
      default: () => {
        return 'default';
      }
    }
  },
  data () {
    return {
      active: ''
    };
  },
  created () {
    this.active = this._props.currIndex;
  },
  methods: {
    handle (item, index) {
      this.active = index;
      this.$emit('handle', item, index);
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
 .wt-tab {
     width: 100%;
     .tab {
         background: #fff;
        //  border-bottom: 1px solid #ebebeb;
         &::after {
              transform: scaleY(.5);
              height: 1px;
              content: '';
              border-bottom: 1px solid #ccc;
              display: block;
          }
         ul {
             display: flex;
             font-size: 0.7rem;
             &.default {
                 justify-content: space-around;
             }
             &.full {
                 justify-content: space-between;
                 li {
                     flex: 1;
                     text-align: center;
                 }
             }
             li {
                 height: 2rem;
                 line-height: 2rem;
                &.active {
                    border-bottom: 2px solid #1BB5F1;
                    margin-bottom: -1px;
                    color: #1BB5F1;
                }
             }
         }
     }
 }
</style>
