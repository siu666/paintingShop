import Vue from 'vue'
import Router from 'vue-router'
import paintlist from '@/views/paintlist'
import Gouwuche from '@/views/Gouwuche'
import DiZhi from  '@/views/DiZhi'
import dingdanConfirm from  '@/views/dingdanConfirm'
import orderCreate from '@/views/orderCreate'
import dingdanList from  '@/views/dingdanList'
import productInfo from '@/views/productInfo'
import orderDetail from '@/views/orderDetail'

import admin from  '@/views/admin'
Vue.use(Router)

export default
new Router({
  routes: [
    {
      path: '/',
      name: 'paintlist',
      component: paintlist
    },
    {
      path: '/gouwuche',
      name: 'Gouwuche',
      component: Gouwuche
    },

    {
      path: '/dizhi',
      name: 'DiZhi',
      component: DiZhi
    },
    {
      path: '/dingdanConfirm',
      name: 'dingdanConfirm',
      component: dingdanConfirm
    },
    {
      path: '/ordercreate',
      name: 'orderCreate',
      component: orderCreate
    },
    {
      path: '/dingdanList',
      name: 'dingdanList',
      component: dingdanList
    },
    {
      path:'/productInfo',
      name:'productInfo',
      component:productInfo
    },

    {
      path:'/admin',
      name:admin,
      component:admin
    },
    {
      path:'/orderDetail',
      name:'orderDetail',
      component:orderDetail
    }


  ]
})
