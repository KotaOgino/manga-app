import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Serise from '../views/Series.vue'
import Book from '../views/Book.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/series/:id',
    name: 'series',
    component: Serise,
    props: true
  },
  {
    path: '/series/:id/book/:bookId',
    name: 'book',
    component: Book,
    props: true
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
