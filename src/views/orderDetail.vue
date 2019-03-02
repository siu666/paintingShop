<template>
  <div>
    <shop-header></shop-header>
    <breadnav>
      <span>订单详情</span>
    </breadnav>
    <div class="container">
      <div class="checkout-order">

        <!-- process step -->

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>订单内容</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>订单内容</li>
                <li>价格</li>
                <li>单品数量</li>
                <li>总价</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in this.list">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img v-bind:src="'/static/'+item.goodsImg" alt="">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.goodsName}}</div>

                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.goodsPrice}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">×{{item.goodsNumber}}</span>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.goodsPrice*item.goodsNumber}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li >
                <span>订单金额:</span>
                <span>{{this.list3.dingdantotal}}元</span>
              </li>
              <li >
                <span>电话:</span>
                <span>{{this.list2.phone}}</span>
              </li>
              <li>
                <span>收件人:</span>
                <span>{{this.list2.receiver}}</span>
              </li>
              <li>
                <span>街道名:</span>
                <span>{{this.list2.streetName}}</span>
              </li>
              <li>
                <span>生成时间:</span>
                <span>{{this.list3.createDate}}</span>
              </li>
              <li>
                <span>订单状态:</span>
                <span v-if="this,list3.orderStatus==1">等待商家处理</span>
                <span v-if="this,list3.orderStatus==2">商家已发货</span>

              </li>
            </ul>
          </div>
        </div>

        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">

            <router-link class="btn btn--m" to="/dizhi">返回地址列表</router-link>
          </div>
          <div class="next-btn-wrap">
            <button class="btn btn--m btn--red" @click="goBack()" >点击返回订单列表</button>

          </div>
        </div>
      </div>
    </div>
    <shop-footer></shop-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import  './../assets/css/product.css'
  import  ShopHeader from '@/components/Header.vue'
  import  ShopFooter from  '@/components/Footer'
  import  Breadnav from  '@/components/Breadnav'
  import  Motai from  '@/components/Motai'
  import  axios from 'axios'
  export default {
    data() {
      return {
        msg: 'hello vue',
        cartList:[],
        deliveryfee:100,
        discount:200,
        tax:40,
        dingdantotal:0,
        list:[],
        list2:[],
        goodstotal:0,
        list3:[],
      }
    },
    components: {
      ShopHeader,
      ShopFooter,
      Breadnav,
      Motai
    },
    created(){},
    computed:{},
    mounted(){
      /*console.log(this.$route.params.orderId)*/
      /*this.getcartList();*/
      this.test();

    },
    methods:{
      test(){
        var orderId=this.$route.params.orderId
        axios.get("orders/getorderInfo",{
             params:{
                 orderId:orderId
             }
        }).then((response)=>{
                  let res =response.data
                  this.list=res.result.totalList[0].goodsList
                  this.list2=res.result.totalList[0].dizhiInfo;
                  this.list3=res.result.totalList[0]
          console.log(this.list3)
        })
      },
     goBack(){
        this.$router.push({path:'/dingdanList'})
     }
    }
  }
</script>
