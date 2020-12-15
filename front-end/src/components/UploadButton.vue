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
  inject: ['notyf'],
  methods: {
    async uploadGalleryItem() {
      try {
        if (this.words.length === 0) {
          this.notyf.error('There is no graph to upload');
        }
        else {
          await axios.post('/api/galleryitems', {
            graph_type: this.graphType,
            words: this.words,
            filters: this.filters,
            graph_data: this.graph_data
          });
          this.notyf.success('Graph uploaded to gallery');
        }
      } catch (error) {
        console.log(error);
        this.notyf.error('Graph failed to upload.');
      }
    },
  }
}
</script>

<style scoped>

</style>
