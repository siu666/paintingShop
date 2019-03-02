<template>
    <div>
      <shop-header></shop-header>
     <!-- <div><input type="text" v-model="inputContent"/><input type="button" value="123" @click="searchName"/></div>-->

      <breadnav>
        <span>商品</span>
      </breadnav>
      <search :auto-fixed="false"  v-model="inputContent"></search>
     <!-- <button @aaa="asd">123</button>-->
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <a @click="sortpaintlist" href="javascript:void(0)">价格(升/降) <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <input class="nav_input" gtbfieldid="1" size="35" name="firstname" v-model="morethan" type="text">
            <input class="nav_input" gtbfieldid="2" size="35" name="firstname" v-model="lessthan" type="text">
              <!--<select class="select-style" v-model="choosed" @change="setPriceFilter(choosed)" >
                &lt;!&ndash;<option value="all">
                  所有
                </option>&ndash;&gt;
              <option v-for="(item,index) in styleFilter"  :value="index">
               {{item.paintStyle}}
              </option>
            </select>-->
            <input  class="nav-btn" gtbfieldid="3" name="submit" id="submit" value="go" type="submit" @click="search">
            <a href="javascript:void(0)" @click="aaa">分类</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>价格</dt>
                <div>
                  <link rel="stylesheet" title="Default" type="text/css" media="screen">
                  <ol class="clearfix">
                    <li>
                      <label for="firstname">(more-than</label>
                      <input gtbfieldid="1" size="35" name="firstname" v-model="morethan" type="text">
                    </li>
                    <li>
                      <label for="email">less-than)</label>
                      <input gtbfieldid="2" size="35" name="email" v-model="lessthan" type="text">
                    </li>
                    <li >
                      <input gtbfieldid="3" name="submit" id="submit" value="search" type="submit" @click="search">
                    </li>
                  </ol>
                </div>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':styleList=='all'}">所有</a></dd>
                <dd v-for="(item,index) in styleFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':styleList==index}">{{item.paintStyle}}</a>
                </dd>
              </dl>
            </div>
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in paintlist " >
                    <div class="pic">
                      <a href="#"><img v-bind:src="'/static/'+item.goodsImg" @click="toDetail(item)"></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.goodsName}}</div>
                      <!--<router-link :to="{name:'productInfo',query:{'title':item.goodsImg}}"><div >查看详情</div> </router-link>-->
                      <div class="quantity">{{item.goodsType}}</div>
                      <div class="price">{{item.goodsPrice }}</div>

                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addcartList(item.goodsId) ">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <!--<div v-infinite-scroll="loadlist" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  ...
                </div>-->
              </div>
            </div>
          </div>
        </div>
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
      <actionsheet v-model="show5" :menus="styleFilter" show-cancel @on-click-menu="click5"></actionsheet>

<shop-footer></shop-footer>
    </div>
</template>
<style>
  .weui-actionsheet .weui-actionsheet__menu{
    background-color: #ffffff;
  }
</style>
<script>
import './../assets/css/base.css'
import  './../assets/css/product.css'
import  './../assets/css/css3-formular-styles.css'
import  ShopHeader from '@/components/Header.vue'
import  ShopFooter from  '@/components/Footer'
import  Breadnav from  '@/components/Breadnav'
import  Motai from  '@/components/Motai'
import  axios from 'axios'
import {Search,Actionsheet} from 'vux'


export default {
    data() {
        return {
          show5:false,
          paintlist:[],
          sortlist:true,
          page:1,
          pageSize:8,
          inputContent:'',
          busy:true,
          mdShow:false,
          logShow:false,
          styleFilter:[
            {
              label:'所有',
              value:'0'
            },
            {
              label:'油画',
              value:'1'
            },
            {
              label:'素描',
              value:'2'
            },
            {
              label:'油墨',
              value:'3'
            },
          ],
          defaultChoice:'',
          choosed:'0',
          styleList:'0',
          lessthan:'',
          morethan:'',
        }
    },
  components:{
    ShopHeader,
    ShopFooter,
    Breadnav,
    Motai,
    Search,
    Actionsheet
  },
  mounted:function () {
      this.getpaintlist();
  },
  created(){
      this.init();
  },
  watch:{
        inputContent(a){
          if(a !==''){
            this.searchName();
            this.morethan="";
            this.lessthan="";
          }else{
            this.getpaintlist();
          }
        },

  },
  methods:{
    init () {
      document.addEventListener('gesturestart',
        function (e)
        {
          e.preventDefault();
        });
      document.addEventListener('dblclick',
        function (e)
        {
          e.preventDefault();
        });
      document.addEventListener('touchstart',
        function (event)
        {
          if
          (event.touches.length
            > 1) {
            event.preventDefault();
          }
        });
      var
        lastTouchEnd = 0;
      document.addEventListener('touchend',
        function (event)
        {
          var
            now = (new Date()).getTime();
          if
          (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },
        false);
    },
    click5(label,value){
      this.inputContent='';
      this.styleList = value['value'];
      /*this.page = 1;*/
      console.log(this.styleList)
      this.morethan='';
      this.lessthan='';
      this.getpaintlist();
    },
      aaa(){
        this.show5=true
      },
    toDetail(item){

        this.$router.push({name:'productInfo',params:{'name':item.goodsName,'pic':item.goodsImg,'goodsId':item.goodsId}})
      },
      getpaintlist(flag){
        let param = {

          sort:this.sortlist?1:-1,
          paintStyle:this.styleList,
          inputContent:this.inputContent,
          lessthan:this.lessthan,
          morethan:this.morethan
        }
       axios.get("/products/products",{
         params:param
       }).then((list)=>{
         var res = list.data;
         /*console.log(res);
        this.paintlist=res.list;*/
          if(flag){
            this.paintlist=this.paintlist.concat(res.list);
            if(res.count==0){
              this.busy=true
            }else{
              this.busy.false
            }
          }
         else{
         this.paintlist=res.list;
         this.busy=false
          }
         console.log(res);
       });
      },
      sortpaintlist(){
       this.sortlist = !this.sortlist;
       this.page=1;
       this.getpaintlist();
      },
      loadlist(){
            this.busy=true
        setTimeout(() => {
          this.page++;
           this.getpaintlist(true)
        }, 1000);
      },
  setPriceFilter(index){
    this.styleList = index;
    this.page = 1;
    console.log(index)
    this.morethan='';
    this.lessthan='';
    this.getpaintlist();
  },
    addcartList(goodsId){
    axios.post("/users/tocart",{
      goodsId:goodsId,
      goodsNum:''
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
    closeModal(){
      this.mdShow=false;
      this.logShow=false;
    },
    search(lessthan,morethan){
      lessthan=this.lessthan;
      morethan=this.morethan;
      this.inputContent='';
      this.getpaintlist();
    },
    configData (index) {
      console.log(index)

    },
    searchName(inputContent){
     inputContent=this.inputContent
      this.getpaintlist();
    },
  }
}
</script>
