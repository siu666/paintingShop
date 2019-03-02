<template>
    <div>
      <shop-header></shop-header>
      <breadnav><span>支付成功</span></breadnav>
      <div>
        <div class="container">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>结算</span></h2>
          </div>
          <!-- 进度条 -->
          <div class="check-step">
            <ul>
              <li class="cur"><span>地址确认</span></li>
              <li class="cur"><span>查看商品信息</span></li>

              <li class="cur"><span>订单确认</span></li>
            </ul>
          </div>

          <div class="order-create">
            <div class="order-create-pic"><img src="/static/orderSuc.jpg" alt=""></div>
            <div class="order-create-main">

              <p>
                <span>你的订单号：{{orderId}}</span>
                <span>总消费：{{dingdantotal}}</span>
              </p>
              <div class="order-create-btn-wrap">
                <div class="btn-l-wrap">

                  <router-link class="btn btn--m" to="/">返回主页面</router-link>
                </div>
                <div class="btn-r-wrap">
                  <router-link class="btn btn--m" to="/dingdanList">查看我的订单</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <shop-footer></shop-footer>
    </div>
</template>

<script>
  import  ShopHeader from '@/components/Header.vue'
  import  ShopFooter from  '@/components/Footer'
  import  Breadnav from  '@/components/Breadnav'
  import  Motai from  '@/components/Motai'
  import axios from 'axios'
export default {
    data() {
        return {
          msg: 'hello vue',
          orderId:'',
          dingdantotal:0
        }
    },
    components: {
      ShopHeader,
      ShopFooter,
      Breadnav
    },
   /*computed:{
      orderId(){
        return this.$route.params.orderId
      }
   }*/
   mounted(){
      var orderId = this.$route.params.orderId;
      console.log(this.$route.params.orderId)
      if(!orderId){
        return;
      }
      axios.get("/orders/orderDetail",{
        params:{
          orderId:orderId}
      }).then((response)=>{
        let res = response.data;
        if(res.status=='0'){
            this.orderId=orderId
            this.dingdantotal=res.result.dingdantotal
        }
      })
   }
}
</script>
