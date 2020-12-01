<template>
<div class="wrapper">
  <button type="button" name="button" @click="uploadGalleryItem">Upload Graph</button>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UploadButton',
  props: {
    graphType: String,
    words: Array,
    filters: Array,
    graph_data: Object
  },
  data() {
    return {

    }
  },
  methods: {
    async uploadGalleryItem() {
      try {
        await axios.post('/api/galleryitems', {
          graph_type: this.graphType,
          words: this.words,
          filters: this.filters,
          graph_data: this.graph_data
        });
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>

</style>
