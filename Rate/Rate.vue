<template>
    <div class='wt-rate'>
      <wt-row>
        <div
        :class="[clicked >= index ? checkedIcon + ' checked' : icon, type]"
        v-for="(item, index) in ~~nubmer"
        @click="handle(item, index)"
        :key="index">
        </div>
      </wt-row>
    </div>
</template>
<script>
import Row from '../Row/Row';
export default {
  components: {
    'wt-row': Row
  },
  name: 'wt-rate',
  props: {
    nubmer: {
      type: Number | String,
      default: () => {
        return 5;
      }
    },
    currentIndex: {
      type: Number | String,
      default: () => {
        return -1;
      }
    },
    disable: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    type: {
      type: String,
      default: () => {
        return 'default';
      }
    },
    icon: {
      type: String,
      default: () => {
        return 'icon-favor';
      }
    },
    checkedIcon: {
      type: String,
      default: () => {
        return 'icon-favor_fill';
      }
    }
  },
  data () {
    return {
      clicked: this._props.currentIndex
    };
  },
  methods: {
    handle (item, index) {
      if (!this.disable) {
        this.clicked = index;
        this.$emit('handle', index + 1);
      }
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
  .wt-rate {
    div {
      color: #999;
    }
    div.checked {
      &.default {
        color: #1BB5F1;
      }
      &.danger {
        color: #ef4f4f;
      }
      &.success {
        color: #37bf4f;
      }
      &.warning {
        color: #FADB14;
      }
    }
  }
</style>
