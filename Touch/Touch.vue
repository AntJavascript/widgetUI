<template>
    <div class='wt-touch'>
        <wt-ink>
        <div class="touch">
            <slot></slot>
        </div>
        </wt-ink>
    </div>
</template>
<script>
import Ink from '../InkWell/InkWell';
export default {
  name: 'wt-touch',
  props: {},
  components: {
    'wt-ink': Ink
  },
  data () {
    return {
    };
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-touch {
    .touch {
        min-width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
