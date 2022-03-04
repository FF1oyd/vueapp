<template>
  <div>
    <loading-component v-if="isLoading" />
    <article-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm';
import LoadingComponent from '@/components/LoadingComponent';
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/editArticle';
export default {
  name: 'EditArticle',
  components: {
    ArticleForm,
    LoadingComponent,
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug;
      this.$store
        .dispatch(actionTypes.updateArticle, {slug, articleInput})
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}});
        });
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
      validationErrors: (state) => state.editArticle.validationErrors,
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
};
</script>
