<template>
    <div>
      <shop-header></shop-header>
      <breadnav>
        <span>订单列表</span>
      </breadnav>
      <div>

        <div class="container">
          <div class="checkout-order">

            <!-- process step -->


            <!-- order list -->
            <div class="page-title-normal checkout-title">
              <h2><span>订单详情</span></h2>
            </div>
            <div class="item-list-wrap confirm-item-list-wrap">
              <div class="cart-item order-item">
                <div class="cart-item-head">
                  <ul>
                    <li>订单号</li>
                    <li>创建日期</li>
                    <li>订单状态</li>
                    <li>总价</li>
                  </ul>
                </div>
                <ul class="cart-item-list">
                  <li v-for="item in orderList">
                    <div class="cart-tab-1">

                      <div class="cart-item-title">
                        <div class="item-name">{{item.orderId}}</div>

                      </div>
                    </div>
                    <div class="cart-tab-2">
                      <div class="item-price"> {{item.createDate}}</div>
                    </div>
                    <div class="cart-tab-3">
                      <div class="item-quantity">
                        <div class="select-self">

                        </div>
                        <!--<div class="item-stock item-stock-no" v-if="item.orderStatus==1">等待商家确认</div>
                        <div class="item-stock item-stock-no" v-if="item.orderStatus==2">订单已受理</div>
                        -->
                        <div class="item-stock item-stock-no" @click="toorderDetail(item)">点击查看详情</div>
                      </div>
                    </div>
                    <div class="cart-tab-4">
                      <div class="item-price-total">{{item.dingdantotal}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Price count -->

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
          orderList:[],
          dingdantotal:[]
        }
    },
    components: {
      ShopHeader,
      ShopFooter,
      Breadnav,
      Motai
    },
  mounted:function () {
    this.getorderList();
  },
  methods:{
      getorderList(){
        axios.get("/orders/getorderList").then((response)=>{
          let res =response.data;
          var arr2=[];
          var arr4=[];
          res.result.forEach((item)=>{
            arr2.push(item.totalList)
          })
          for(var i=0;i<arr2.length;i++){
            arr4=arr2[i]
               for (let j in arr4){
                 var order={
                   orderId:arr4[j].orderId,
                   orderStatus:arr4[j].orderStatus,
                   dingdantotal:arr4[j].dingdantotal,
                   createDate:arr4[j].createDate
                 }
                 this.orderList.push(order)
               }
          }
        })
      },
       toorderDetail(item){
         console.log(item.orderId)
         this.$router.push({name:'orderDetail',params:{'orderId':item.orderId}})
       }
  }
}
</script>
