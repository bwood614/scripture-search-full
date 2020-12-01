<template>
  <div class="page">
    <div class="page-title">
      Graph Gallery
    </div>
    <div class="gallery-container">
      <div class="gallery-item" v-for="item in galleryItems" v-bind:key="item.id">
        <div class="graph-item">
          <BarGraph :chart-data="item.graph_data"></BarGraph>
        </div>
        <div class="info">
          <p><strong>Graph Type:</strong> {{item.graph_type}}</p>
          <p><strong>Words:</strong>
            <span v-for="word in item.words" v-bind:key="word" class="elem">{{word}}</span>
          </p>
          <p><strong>Filters:</strong>
            <span v-for="filter in item.filters" v-bind:key="filter" class="elem">{{filter}}</span>
          </p>
        </div>
        <button type="button" name="button" @click="deleteItem(item)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import BarGraph from '../components/BarGraph.vue'
import axios from 'axios';
export default {
  name: 'Gallery',
  components: {
    BarGraph
  },
  data() {
    return {
      galleryItems: [],
    }
  },
  created() {
    this.getGalleryItems();
  },
  methods: {
    async getGalleryItems() {
      try {
        let response = await axios.get("/api/galleryitems");
        this.galleryItems = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/galleryitems/" + item._id);
        this.getGalleryItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.page-title {
  font-size: 35px;
  font-weight:500;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 35px;
}

.gallery-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery-item {
  display: flex;
  flex-direction: column;
}

.info {
  margin: 0px auto;
  width: 85%;
}

.elem {
  padding: 2px;
  background-color: #b6d2ce;
  margin: 3px;
  border-radius: 5px
}

.upload-container {
  display: flex;
  justify-content:flex-end;
  margin: 0px auto;
}

/*Mobile styles*/
@media only screen and (max-width: 500px) {
  .gallery-item {
    box-shadow: 2px 2px 10px;
    width: 95%;
    margin-bottom: 20px;
  }

  .graph-item {
    max-width: 100%;
  }
}
/*Desktop styles*/
@media only screen and (min-width: 501px) {
  .gallery-item {
    box-shadow: 4px 4px 10px;
    width: 40%;
    margin: 20px;
  }

  .graph-item {
    max-width: 470px;
    margin: 5px auto;
  }
}
</style>
