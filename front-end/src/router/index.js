import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ChronologicalAnalysis from '../views/ChronologicalAnalysis.vue'
import StandardWorks from '../views/StandardWorks.vue'
import WordRelations from '../views/WordRelations.vue'
import Gallery from '../views/Gallery.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/standard-works',
    name: 'StandardWorks',
    component: StandardWorks
  },
  {
    path: '/chronological-analysis',
    name: 'ChronologicalAnalysis',
    component: ChronologicalAnalysis
  },
  {
    path: '/word-relations',
    name: 'WordRelations',
    component: WordRelations
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
