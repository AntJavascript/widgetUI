<template>
     <i class='wt-spinner icon-spinner' v-if="type=='1'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
     <i class='wt-spinner icon-spinner2' v-else-if="type=='2'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
     <i class='wt-spinner icon-spinner3' v-else-if="type=='3'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
     <i class='wt-spinner icon-spinner4' v-else-if="type=='4'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
     <i class='wt-spinner icon-spinner5' v-else-if="type=='5'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
     <i class='wt-spinner icon-spinner6' v-else-if="type=='6'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
     <i class='wt-spinner icon-spinner7' v-else-if="type=='7'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
     <i class='wt-spinner icon-spinner8' v-else-if="type=='8'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
     <i class='wt-spinner icon-spinner9' v-else-if="type=='9'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
     <i class='wt-spinner icon-spinner10' v-else-if="type=='10'" :style="{fontSize: size + 'rem',backgroundImage: bgcolor}"></i>
</template>
<script>
export default {
  name: 'wt-spinner',
  props: {
    size: {
      type: Number | String,
      default: () => {
        return '1.5';
      }
    },
    type: {
      type: Number | String,
      default: () => {
        return '1';
      }
    },
    from: {
      type: String,
      default: () => {
        return '#333';
      }
    },
    to: {
      type: String,
      default: () => {
        return '#999';
      }
    }
  },
  data () {
    return {
    };
  },
  computed: {
    bgcolor: function () {
      return '-webkit-gradient(linear, 0 0, 0 bottom, from(' + this.from + '), to(' + this.to + '))';
    }
  },
  methods: {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.wt-spinner {
    animation: spin 1.5s infinite steps(8);
    display: inline-block;
    color: #1BB5F1;
    font-size: 1rem;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#333), to(#999));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
@keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg)
    }
  }
</style>
