<template>
<div class="page">
  <Search :title="'Standard Works'" :filters="pageFilters" :oneFilter="false" @filters-updated="updateActiveFilters" @do-search="doSearch"/>
  <div class="search-type">
    <select class="" name="searchType" id="searchType" v-model="searchType">
      <option value="frequency" selected>Frequency</option>
      <option value="wordCount">Word Count</option>
    </select>
  </div>
  <div class="graph-container">
    <BarGraph :chart-data="datacollection"></BarGraph>
  </div>
  <div class="upload-container">
    <UploadButton :graphType="'Standard Works'" :words="wordData.map(x => x.word)" :filters="activeFilters.map(x => x.label)" :graph_data="datacollection"></UploadButton>
  </div>
  <div class="instruction-container">
    <h3>Information</h3>
    <p>The Standard Works word analysis graph lets you compare the frequency and use of single words across the entire
      standard works library including the Old Testament, the New Testament, The Book of Mormon, the Doctrine and
      Covenants and The Pearl of Great Price. Search for any word using the filters to filter by work to see data represented in a bar graph.
      Any number of words can be searched at once to see comparisons between words. Multiple words should be entered as a comma seperated list.</p>
  </div>
</div>
</template>

<script>
import Search from "../components/Search.vue"
import BarGraph from '../components/BarGraph.vue'
import UploadButton from '../components/UploadButton.vue'
import axios from 'axios';

export default {
  name: 'StandardWorks',
  components: {
    Search,
    BarGraph,
    UploadButton
  },
  data() {
    return {
      wordData: [],
      datacollection: null,
      activeFilters: [],
      searchType: "frequency",
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
      for(let word of this.wordData) {
        this.datacollection.labels.push(word.word);
      }
      for(let filter of this.activeFilters) {
        let dataSet = {
          label: filter.label,
          backgroundColor: filter.color,
          data: []
        };
        for(let word of this.wordData){
          dataSet.data.push(word.instances[filter.short]);
        }
        this.datacollection.datasets.push(dataSet);
      }
    },
    updateActiveFilters(newActiveFilters) {
      this.activeFilters = newActiveFilters;
      this.fillData();
    },
    async doSearch(query) {
      var url = "/api/standardworks/";
      if (this.searchType === "frequency") {
        url += "frequency?words=" + query;
      }else {
        url += "instances?words=" + query;
      }
      try {
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

.search-type {
  display: flex;
  justify-content:flex-start;
  margin: 0px auto;
}

/*Mobile styles*/
@media only screen and (max-width: 500px) {
  .upload-container {
    width: 90%;
  }

  .search-type {
    width: 90%;
  }
}
/*Desktop styles*/
@media only screen and (min-width: 501px) {
  .upload-container {
    width: 900px;
  }
  .search-type {
    width: 900px;
  }
}
</style>
