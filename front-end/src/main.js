import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './swMockData.js'
import yearMockData from './caMockData.js'
import wrMock from './wrMockData.js'

Vue.config.productionTip = false

let data = {
  wordData: mock,
  yearData: yearMockData, //TODO remove mock data
  wrData: wrMock,
  books: {
    ot: {
      label: "Old Testament",
      short: "ot",
      filterId: "otFilter",
      filterType: "checkbox",
      color: "#1DC19C",
      apiName: "OT"
    },
    nt: {
      label: "New Testament",
      short: "nt",
      filterId: "ntFilter",
      filterType: "checkbox",
      color: "#67BE0F",
      apiName: "NT"
    },
    bom: {
      label: "Book of Mormon",
      short: "bom",
      filterId: "bomFilter",
      filterType: "checkbox",
      color: "#ECDF1C",
      apiName: "BoM"
    },
    dc: {
      label: "D&C",
      short: "dc",
      filterId: "dcFilter",
      filterType: "checkbox",
      color: "#F24342",
      apiName: "D&C"
    },
    pogp: {
      label: "Pearl of Great Price",
      short: "pgp",
      filterId: "pogpFilter",
      filterType: "checkbox",
      color: "#38113B",
      apiName: "PGP"
    },
    startYear: {
      name: "Start Year",
      filterId: "startYearFilter",
      filterType: "date",
    },
    endYear: {
      name: "End Year",
      filterId: "endYearFilter",
      filterType: "date",
    }
  }
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
