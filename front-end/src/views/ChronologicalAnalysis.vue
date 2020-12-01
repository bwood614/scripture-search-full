<template>
<div class="page">
  <Search :title="'Chronological Analysis'" :filters="pageFilters" :oneFilter="true" @filters-updated="updateActiveFilters" @doSearch="doSearch" />
  <div class="graph-container">
    <LineGraph :chart-data="datacollection"></LineGraph>
  </div>
  <div class="instruction-container">
    <h3>Information</h3>
    <p>The Chronological Analysis graph allows you to see how the use of one or more words changes over real time.
      Because the Book of Moromon and the Doctrine and Covenants are the only two works to include both approximate and exact
      dates per chapter, these are the only works available for use with this graph.</p>
  </div>
</div>
</template>

<script>
import Search from "../components/Search.vue"
import LineGraph from '../components/LineGraph.vue'
export default {
  name: 'ChronologicalAnalysis',
  components: {
    Search,
    LineGraph
  },
  data() {
    return {
      datacollection: null,
      currentFilter: null,
      pageFilters: [
        this.$root.$data.books.bom,
        this.$root.$data.books.dc,
        this.$root.$data.books.startYear,
        this.$root.$data.books.endYear,
      ],
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        datasets: []
      };
      let yearData = this.$root.$data.yearData;
      for(let word of yearData) {
        let dataSet = {
          label: word.word,
          borderColor: this.currentFilter.color,
          fill: false,
          data: []
        };
        for(let point of word[this.currentFilter.short]){
          dataSet.data.push({x: point.year, y: point.count});
        }
        this.datacollection.datasets.push(dataSet);
      }
      // this.datacollection = {
      //   // No more "labels" field!
      //   datasets: [{
      //     label: "love",
      //     borderColor: "#1DC19C",
      //     fill: false,
      //     data: [{
      //       x: 1830,
      //       y: 10
      //     }, {
      //       x: 1835,
      //       y: 20
      //     }, {
      //       x: 1836,
      //       y: 30
      //     }, {
      //       x: 1837,
      //       y: 40
      //     }] // Note the structure change here!
      //   }]
      // }
    },
    updateActiveFilters(newActiveFilters) {
      this.currentFilter = newActiveFilters[0];
      this.fillData();
    },
  }
}
</script>

<style scoped>
.graph-container {
  max-width: 900px;
  margin: 20px auto;
}
</style>
