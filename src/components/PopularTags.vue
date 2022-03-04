<template>
  <div>
    <loading-component v-if="isLoading" />
    <error-message v-if="error" />
    <div class="sidebar" v-if="popularTags">
      <p>PopularTags</p>
      <div class="tag-list">
        <router-link
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{name: 'tag', params: {slug: popularTag}}"
          class="tag-default tag-pill"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/popularTags';
import loadingComponent from '@/components/LoadingComponent';
import errorMessage from '@/components/ErrorMessage';
export default {
  name: 'PopularTags',
  components: {
    loadingComponent,
    errorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      error: (state) => state.popularTags.error,
      popularTags: (state) => state.popularTags.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags);
  },
};
</script>
