<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="150" />
    </div>
    <cx-assets-table v-show="!isLoading" v-bind:assets="assets" />
  </div>
</template>

<script>
import api from '@/api';
import CxAssetsTable from '@/components/CxAssetsTable';

export default {
  name: 'Home',

  components: {
    CxAssetsTable
  },
  data() {
    return {
      isLoading: false,
      assets: []
    };
  },
  created() {
    this.isLoading = true;
    api
      .GetAssets()
      .then(assets => (this.assets = assets))
      .finally(() => {
        this.isLoading = false;
      });
  }
};
</script>
