<template>
<div class="page">
  <Search :title="'Word Relations'" :filters="pageFilters" :oneFilter="true" @filters-updated="updateActiveFilters" @do-search="doSearch"/>
  <div class="graph-container">
    <BarGraph :chart-data="datacollection"></BarGraph>
  </div>
  <div class="upload-container">
    <UploadButton :graphType="'Word Relations'" :words="currentWord" :filters="currentFilterLabel" :graph_data="datacollection"></UploadButton>
  </div>
  <div class="instruction-container">
    <h3>Information</h3>
    <p>Word Relations is a way to visualize links and connections between different words in the scriptures.
    When a word is searched, every verse that contains that word will be searched for other common words. a
    list of these connected words is then returned in order of frequency.</p>
  </div>
</div>
</template>

<script>
import Search from "../components/Search.vue"
import BarGraph from '../components/BarGraph.vue'
import UploadButton from '../components/UploadButton.vue'
import axios from 'axios';

export default {
  name: 'WordRelations',
  components: {
    Search,
    BarGraph,
    UploadButton
  },
  data() {
    return {
      datacollection: null,
      currentFilter: null,
      currentFilterLabel: [],
      currentWord: [],
      wordData: [],
      pageFilters: [
        this.$root.$data.books.ot,
        this.$root.$data.books.nt,
        this.$root.$data.books.bom,
        this.$root.$data.books.dc,
        this.$root.$data.books.pogp,
      ],
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [],
        datasets: []
      };
      let wordData = this.wordData;
      for(let word of wordData) {
        this.datacollection.labels.push(word.word);
      }
      let dataSet = {
        label: "Instances",
        backgroundColor: '#1DC19C',
        data: []
      };
      for(let word of wordData){
        dataSet.data.push(word.instances);
      }
      this.datacollection.datasets.push(dataSet);
    },
    updateActiveFilters(newActiveFilters) {
      this.currentFilter = newActiveFilters[0];
      this.currentFilterLabel = [this.currentFilter.label];
      this.fillData();
    },
    async doSearch(query) {
      this.currentWord = [query];
      try {
        let url = "/api/wordrelations/" + this.currentFilter.apiName + "?word=" + query.toLowerCase();
        let response = await axios.get(url);
        this.wordData = response.data;
        this.fillData();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.graph-container {
  max-width: 900px;
  margin: 20px auto;
}

.upload-container {
  display: flex;
  justify-content:flex-end;
  margin: 0px auto;
}

/*Mobile styles*/
@media only screen and (max-width: 500px) {
  .upload-container {
    width: 90%;
  }
}
/*Desktop styles*/
@media only screen and (min-width: 501px) {
  .upload-container {
    width: 900px;
  }
}
</style>
