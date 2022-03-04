<template>
  <div>
    <top-bar />
    <router-view />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import {actionTypes} from '@/store/modules/auth';
export default {
  name: 'App',
  components: {
    TopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>
