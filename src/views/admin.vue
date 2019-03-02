<template>
    <div>
    <div class="admin-header"><p>管理系统 </p></div>
      <breadnav><span>管理系统</span></breadnav>
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
                  <li>用户Id</li>
                  <li>订单状态</li>
                  <li>修改</li>
                </ul>
              </div>
              <ul class="cart-item-list" v-for="item in orderList">
                <li>
                  <div class="cart-tab-1">
                    <div class="cart-item-title">
                      <div class="item-name">{{item.orderId}}</div>
                    </div>
                  </div>
                  <div class="cart-tab-2">
                    <div class="item-price">{{item.userId}}</div>
                  </div>
                  <div class="cart-tab-3">
                    <div class="item-quantity">
                      <div class="select-self">
                      </div>
                      <div class="item-stock item-stock-no" v-for="doc in item.totalList" v-if="doc.orderStatus==1">等待商家确认</div>
                      <div class="item-stock item-stock-no" v-for="doc in item.totalList" v-if="doc.orderStatus==2">已发货</div>
                      <!--<div class="item-stock item-stock-no" >订单已受理</div>-->
                    </div>
                  </div>
                  <div class="cart-tab-4">
                    <div class="item-price-total" v-for="doc in item.totalList">
                     <x-button @click.native="changeSta('deliver',item)" v-if="doc.orderStatus==1">发货</x-button>
                      <x-button @click.native="changeSta('cancel',item)" v-if="doc.orderStatus==2">取消发货</x-button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Price count -->

        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import Breadnav from '@/components/Breadnav'
import {XButton} from 'vux'
export default {

    data() {
        return {
          msg: 'hello vue',
          orderList:[],
          status:''
        }
    },
    components: {
      Breadnav,
      XButton
    },

  mounted(){
      this.getOrder();
  },
  methods:{
    asd(value){
      console.log(value)
    },
      getOrder(){
        axios.get('orders/getAllorder').then((response)=>{
                let res =response.data
                this.orderList=res.result
        })
      },
      changeSta(val,item){
              if(val=='deliver'){
                this.status=2
                console.log(this.status)
                console.log(item.orderId)
              }
              if(val=='cancel'){
                this.status=1
                console.log(this.status)
              }
              axios.post('/orders/changeSta',{
                  status:this.status,
                  orderId:item.orderId
              }).then((response)=>{
                      let res =response.data
                if(res.status=='888'){
                  this.getOrder();
                  alert("123")
                }
              })
      }
  }
}
</script>
<style>
  .admin-header{
    width: 100%;
    height: 50px;
  /*  position: relative;*/
  }
  .admin-header p{
    font-size: 40px;
    font-weight: bold;
    padding-left: 10px;

  }
</style>
