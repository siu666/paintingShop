<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container">
        <a >
          <img class="navbar-brand-logo" src="../../static/shoplogo.png"></a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link"></span>
          <span v-text="loginName" v-if="loginName"></span>
          <a href="javascript:void(0)" class="navbar-link" @click="signupmodalflag=true" v-if="!loginName">注册</a>
          <a href="javascript:void(0)" class="navbar-link" @click="loginmodalflag=true" v-if="!loginName">登陆</a>
          <a href="javascript:void(0)" class="navbar-link" v-if="loginName" @click="logout">注销</a>
          <a href="javascript:void(0)" class="navbar-link" v-if="loginName" @click="toOrderDetail">订单页面</a>
          <a href="javascript:void(0)" class="navbar-link" v-if="loginName" @click="changePwdFlag=true">修改密码</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-if="gwcCount>0">{{gwcCount}}</span>
            <a class="navbar-link navbar-cart-link" @click="toCart">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':loginmodalflag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">Login in</div>
          <button class="md-close" @click="loginmodalflag=false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="loginTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="password" v-model="userPassword" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登  录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':signupmodalflag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">Sign up</div>
          <button class="md-close" @click="signupmodalflag=false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="signupTip">用户已被注册</span>
            </div>
            <ul>

              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="2" name="loginname" v-model="reguserName" class="regi_login_input regi_login_input_left" placeholder="User Name" >
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="3"  name="password" v-model="reguserPassword" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="register">注册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':changePwdFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">changePwd</div>
          <button class="md-close" @click="changePwdFlag=false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="changeTip">旧密码错误</span>
            </div>
            <ul>

              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="2" name="loginname" v-model="oldPassword" class="regi_login_input regi_login_input_left" placeholder="old Password" >
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="3"  name="password" v-model="newPassword" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="changePwd">点击确认</a>
          </div>
        </div>
      </div>
    </div>
    <motai v-bind:mdShow="sucShow" v-on:close="closeModal">
         <span slot="message">
           修改成功，请重新登陆
         </span>
      <div slot="btnList">
        <a class="btn btn--m" href="javascript:;" @click="sucShow = false">关闭</a>
        <!--<router-link class="btn btn&#45;&#45;m" href="javascript:;" to="/gouwuche">查看购物车</router-link>-->
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
    <div class="md-overlay" v-if="loginmodalflag"></div>
    <div class="md-overlay" v-if="signupmodalflag"></div>
  </header>
</template>
<style>
  .header {
    width: 100%;
    background-color: white;
    font-family: "moderat",sans-serif;
    font-size: 16px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 800px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }
  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
    width: 100px;
  }
  .navbar-brand-logo {
    width: 330px;
  }
  .header a, .footer a {
    font-size: 9px;
    color: #666;
    text-decoration: none;
  }
  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }
  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
    margin-left: -40px;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }
  .navbar-link {
    padding-left: 15px;
  }
  .navbar-cart-container {
    position: relative;
  }
  .navbar-cart-count {

    align-items: center;
    position: absolute;
    top: -15px;
    right: -11px;
    width: 20px;
    border-radius: 10px;
    color: white;
    background-color: #000000;
    font-size: 14px;
    font-weight: lighter;
    text-align: center;
  }
  .navbar-cart-logo {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
  }
</style>
<script>
  import './../assets/css/login.css'
  import axios from 'axios'
  import motai from '../components/Motai.vue'
  export default{
    data(){
      return{
        logShow:false,
        oldPassword:'',
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
        newPassword:'',
        changePwdFlag:false,
        sucShow:false,
        changeTip:false
      }

    },
    components:{
      motai
    },
    mounted(){
      this.iflogin();
    },
    computed:{
      gwcCount(){
        return this.$store.state.gwcCount
      }
    },
    methods:{
      toCart(){
        if(this.loginName){
          this.$router.push({path:"/gouwuche"})
        }else{
         this.logShow=true;
        }
      },
      closeModal(){
        this.mdShow=false;
        this.logShow=false;
      },
      changePwd(){
        axios.post("/users/changePwd",{
          oldPassword:this.oldPassword,
          newPassword:this.newPassword
        }).then(response=>{
          let res=response.data
          if(res.status=='800'){
            this.changePwdFlag=false;
           this.sucShow=true;
           this.logout();
          }else if(res.status=='999'){
            this.changeTip=true;
          }
        })
      },
      toOrderDetail(){
        this.$router.push({path:"/dingdanList"})
      },
      register(){
        if(!this.reguserName || !this.reguserPassword){
          this.signupTip=true;
          return;
        }
        console.log("123")
        axios.post("users/register",{
          reguserName:this.reguserName,
          reguserPassword:this.reguserPassword
        }).then((response)=>{
          let res = response.data;
          if(res.status=='456'){
            this.signupmodalflag=false;
            this.signupTip=false;
            this.reguserName='';
            this.reguserPassword='';
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
            /*this.loginTip=false;*/
            this.loginmodalflag=false;
            this.loginTip=false;
            this.userName='';
            this.userPassword='';
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


