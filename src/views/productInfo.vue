<template>
  <div>
    <shop-header></shop-header>
    <breadnav>
      <span>商品详情</span>
    </breadnav>
    <div class="goodsName">{{this.$route.params.name}}</div>
    <div class="pic">
      <img v-bind:src="'/static/'+this.$route.params.pic" >
    </div>
    <div class="buy_con">
      <div class="cart-tab-3">
        <div class="item-quantity">
          <div class="select-self select-self-open">
            <div class="select-self-area">
              <div class="input-sub" @click="editgwc('jian')">-</div>
              <input class="buy_input" type="number" v-model="goodsNum"/>
              <div class="input-add" @click="editgwc('jia')">+</div>
            </div>
          </div>
        </div>
      </div>
      <x-button @click.native="addcartList">加入购物车</x-button>
    </div>

    <motai v-bind:mdShow="mdShow" v-on:close="closeModal">
         <span slot="message">
           加入购物车成功
         </span>
      <div slot="btnList">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
        <router-link class="btn btn--m" href="javascript:;" to="/gouwuche">查看购物车</router-link>
      </div>
    </motai>
    <motai v-bind:mdShow="logShow" v-on:close="closeModal">
         <span slot="message">
           请先登陆
         </span>
      <div slot="btnList">
        <a class="btn btn--m" href="javascript:;" @click="logShow = false">关闭</a>
        <!--<router-link class="btn btn&#45;&#45;m" href="javascript:;" to="/gouwuche">查看购物车</router-link>-->
      </div>
    </motai>

    </div>
</template>
<style>
  .buy_con{
    display: flex;
  }
  .buy_con .cart-tab-3 .item-quantity .select-self-area .buy_input{
    width: 83px;
    font-size: 14px;
  }
  .buy_con .weui-btn{
    width:32%;
    margin-left: 53px;
    margin-top: 20px;
  }
  .buy_con .cart-tab-3{
    margin-top: 25px;
    margin-left: 25px;
  }
  .buy_con .cart-tab-3 .item-quantity .select-self-area{
     display: flex;
    background:none;
    border: 1px solid #f0f0f0;
  }
  .buy_con .cart-tab-3 .item-quantity .select-self-area .input-sub{
     border:1px solid #605F5F;
     text-align: center;
    width: 30px;
    background-color: #C84048;
    font-weight: bold;

   }
  .buy_con .cart-tab-3 .item-quantity .select-self-area .input-add{
     border:1px solid #605F5F;
     text-align: center;
    width: 30px;
    background-color: #C84048;
    font-weight: bold;

   }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
  .pic img{
    position: relative;

    width: 100%;
    height: 300px;
  }
  .goodsName{
    text-align: center;
    font-size:30px;
  }
    </style>
<script>
  import shopHeader from '../components/Header.vue'
  import Breadnav from '../components/Breadnav.vue'
  import './../assets/css/login.css'
  import motai from '../components/Motai.vue'
  import axios from 'axios'
  import {XButton} from 'vux'

  export default{
    data(){
      return{
        goodsNum:1,
        reguserName:'',
        userName:'',
        userPassword:'',
        reguserPassword:'',
        loginmodalflag:false,
        signupmodalflag:false,
        signupTip:false,
        loginTip:false,
        msg:'',
        loginName:'',
        mdShow:false,
        logShow:false,

      }

    },
    mounted(){
      this.iflogin();
    },
    computed:{
      gwcCount(){
        return this.$store.state.gwcCount
      }
    },
    components:{
      XButton,
      Breadnav,
      motai,
      shopHeader
    },
    mounted(){
      console.log()
    },
    methods:{
      editgwc(change,item){
        if(change == 'jia'){
          this.goodsNum++
        }else if(change== 'jian'){
          if(this.goodsNum<=1){
            return;
          }
          this.goodsNum--
        }
      },
      closeModal(){
        this.mdShow=false;
        this.logShow=false;
      },
      addcartList(){
        axios.post("/users/tocart",{
          goodsId:this.$route.params.goodsId,
          goodsNum:Number(this.goodsNum)
        }).then((response)=>{
          let res = response.data;
          if(res.status ==0){
            this.mdShow = true;
            console.log(res.status)
          }else{
            /*alert('未登录')*/
            this.logShow=true;
          }
        })
      },
      register(){
        if(!this.userName || !this.userPassword){
          this.signupTip=true;
          return;
        }
        axios.post("users/register",{
          reguserName:this.reguserName,
          reguserPassword:this.reguserPassword
        }).then((response)=>{
          let res = response.data;
          if(res.status=='456'){
            this.signupmodalflag=false;
          }else{
            this.signupTip=true;
          }

        })
      },
      login(){
        if(!this.userName || !this.userPassword){
          this.loginTip=true;
          return;
        }
        axios.post("users/login", {
          userName:this.userName,
          userPassword:this.userPassword

        }).then((response)=>{
          let res= response.data
          if(res.status == '0'){
            this.loginTip=false;
            this.loginmodalflag=false;
            this.getgwcCount();
            this.loginName = res.result.userName;
            console.log(res.result.userName)
          }else{
            this.loginTip=true;
          }
        })
      },
      logout(){
        axios.post("/users/logout").then((response)=>{
          let res = response.data;
          if (res.status == "111"){
            this.loginName= "";
            this.getgwcCount();
            this.$router.push({
              path:'/'
            })
          }
        })
      },
      iflogin(){
        axios.get("/users/iflogin").then((response)=>{
          let res = response.data;
          if(res.status == 0){
            this.loginName = res.result;
            this.getgwcCount();
            this.$emit("loadgouwuche")
          }
        })
      },
      getgwcCount(){
        axios.get("/users/getgwcCount").then((response)=>{
          let res = response.data;
          this.$store.commit("updategwcCount",res.result)
        })
      }
    }
  }
</script>
