<template>
  <div class="homepage">
    <banner-template />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler />
          <local-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocalFeed from '@/components/LocalFeed';
import PopularTags from '@/components/PopularTags';
import BannerTemplate from '@/components/BannerTemplate';
import FeedToggler from '@/components/FeedToggler';

export default {
  name: 'GlobalFeed',
  components: {
    LocalFeed,
    BannerTemplate,
    PopularTags,
    FeedToggler,
  },
  data() {
    return {
      apiUrl: '/articles',
    };
  },
};
</script>
