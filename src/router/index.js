import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
Vue.use(Router)

import Rank from '../components/rank/rank'
import Recommend from '../components/recommend/recommend'
import Search from '../components/search/search'
import Singer from '../components/singer/singer'
import singerDetail from '../components/singer/singer-detail'
export default new Router({
  routes: [
    {
      path:'/',
      component:App,
      children:[
        {
          path: '/recommend',
          component:Recommend
        },
        {
          path:'/singer',
          component:Singer,
          children:[
            {
              path:':id',
              component:singerDetail
            }
          ]
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
