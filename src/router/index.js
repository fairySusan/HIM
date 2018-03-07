import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
Vue.use(Router)

import Rank from '../components/rank/rank'
import Recommand from '../components/recommend/recommend'
import Search from '../components/search/search'
import Singer from '../components/singer/singer'
export default new Router({
  routes: [
    {
      path:'/',
      component:App,
      children:[
        {
          path: '/recommand',
          component:Recommand
        },
        {
          path:'/singer',
          component:Singer
        },
        {
          path:'/rank',
          component:Rank
        },
        {
          path:'/search',
          component:Search
        }
      ]
    }
  ]
})
