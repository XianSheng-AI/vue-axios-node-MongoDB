<template>
  <div>
    <div class="bg">
      <div class="pay_content-wrap">
        <div class="A7 pay_top">
          <div class="pay_top-banner">
            <div class="A8 banner_el">
              <div class="bank_card">
                <div class="bank_card-title">
                  <svg class="icon icon-gongshangyinxing3" aria-hidden="true">　
                    <use xlink:href="#icon-gongshangyinxing3"></use>
                  </svg>
                  <span>工商银行</span>
                </div>
                <h1 class="bank_card-number">CARD NUMBER</h1>
                <h2 class="bank_card-number-text">
                  4215&nbsp;&nbsp;&nbsp;&nbsp;8451&nbsp;&nbsp;&nbsp;&nbsp;2518&nbsp;&nbsp;&nbsp;&nbsp;7846
                </h2>
                <div class="bank_card-date">
                  <h1>EXP DATE</h1>
                  <h2>CCV</h2>
                </div>
                <div class="bank_card-date-text">
                  <h1>08/13</h1>
                  <h2>134</h2>
                </div>
              </div>
            </div>
            <div class="A8 banner_el">
              <div class="bank_card">
                  <div class="bank_card-title">
                    <svg class="icon icon-jiansheyinxing" aria-hidden="true">　
                      <use xlink:href="#icon-jiansheyinxing"></use>
                    </svg>
                    <span>建设银行</span>
                  </div>
                  <h1 class="bank_card-number">CARD NUMBER</h1>
                  <h2 class="bank_card-number-text">
                      1234&nbsp;&nbsp;&nbsp;&nbsp;3435&nbsp;&nbsp;&nbsp;&nbsp;5748&nbsp;&nbsp;&nbsp;&nbsp;4816
                  </h2>
                  <div class="bank_card-date">
                    <h1>EXP DATE</h1>
                    <h2>CCV</h2>
                  </div>
                  <div class="bank_card-date-text">
                    <h1>06/15</h1>
                    <h2>456</h2>
                  </div>
              </div>
            </div>
            <div class="A8 banner_el">
              <div class="bank_card">
                <div class="bank_card-title">
                  <svg class="icon icon-youzhengyinhang1" aria-hidden="true">　
                    <use xlink:href="#icon-youzhengyinhang1"></use>
                  </svg>
                  <span>邮政银行</span>
                </div>
                <h1 class="bank_card-number">CARD NUMBER</h1>
                <h2 class="bank_card-number-text">
                  9876&nbsp;&nbsp;&nbsp;&nbsp;1462&nbsp;&nbsp;&nbsp;&nbsp;4613&nbsp;&nbsp;&nbsp;&nbsp;8167
                </h2>
                <div class="bank_card-date">
                  <h1>EXP DATE</h1>
                  <h2>CCV</h2>
                </div>
                <div class="bank_card-date-text">
                  <h1>01/21</h1>
                  <h2>815</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="banner_prev" @click="prevBtn()"></div>
          <div class="banner_next" @click="nextBtn()"></div>
          <div class="ban_point">
            <ul class="ban_point-ul">
              <li class="ban_point-ul-li"></li>
              <li class="ban_point-ul-li"></li>
              <li class="ban_point-ul-li"></li>
            </ul>
          </div>
        </div>
        <div class="A7 pay_bottom">
          <div class="pay_bottom-box">
                    <h2>￥598.00</h2>
                    <h6>信用卡美妆店&nbsp;&nbsp;&nbsp;01-12</h6>
                    <div class="A9 car_phone">
                      <h3>150****0364(信用卡电话)余额3600万</h3>
                    </div>
                    <div class="A9 yan-zheng-ma">
                      <input class="yan-zheng-ma-inp" v-model="YZM_Number_flag" type="text" placeholder="验证码">
                      <button @click="getYZM()" v-if="YZM" class="yan-zheng-ma-btn">获取验证码</button>
                      <button v-if="!YZM"  class="yan-zheng-ma-btn">正在获取验证码</button>
                    </div>
          </div>
          <div @click="PayNew()" class="pay_btn">
            <!--<button v-if="">立即支付</button>-->
            <button v-if="PayNew_flag">立即支付</button>
            <button v-if="!PayNew_flag">正在支付...</button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <div class="YZM_msg" :class="{'YZM_msg_anim':YZM_msg_flag}">
      <div class="YZM-svg">
        <svg class="icon icon-dui" aria-hidden="true">　
          <use xlink:href="#icon-dui"></use>
        </svg>
      </div>
      <h2>您的验证码为:{{YZM_Number}}</h2>
    </div>
    <!--未输入验证码提示-->
    <div class="YZM_msg" :class="{'YZM_msg_anim':YZM_msg_warning_flag}">
      <div class="YZM-svg">
        <svg class="icon icon-warning" aria-hidden="true">　
          <use xlink:href="#icon-warning"></use>
        </svg>
      </div>
      <h2>请输入您的验证码!</h2>
    </div>
    <!--未输入验证码提示结束-->
    <div class="mask_pay" :class="{'mask_pay_show':!PayNew_flag}"></div>
    <div class="loading-box" :class="{'loading_box_show':!PayNew_flag}">
      <div class="loading-svg">
        <img src="./../../static/loading-svg/grid.svg" alt="">
      </div>
      <h5>正在进行支付...</h5>
    </div>
  </div>
</template>

<script>
  import PAY from "./../assets/css/shortcode/PAY.css"
import {getStyle} from "./../../src/Util/util"
  import axios from "axios"
  export default {
    name: "PAY",
    data(){
      return{
        arr:[],
        YZM:true,
        YZM_Number:Number,
        YZM_msg_flag:false,
        YZM_Number_flag:null,
        PayNew_flag:true,
        YZM_msg_warning_flag:false
      }
    },
    mounted(){
      this.leftTop()
    },
    computed:{

    },
    methods:{
      payInit(){
        axios.get("/users/payInit",{
          YZM:this.YZM_Number
        }).then((response)=>{
          let res=response.data;
          if(res.status==='0'){

          }
        })
      },
      leftTop(){
        let el=document.querySelectorAll('.banner_el');
        for (let i = 0; i < el.length; i++) {
          this.arr.push(parseInt(getStyle(el[i],'left')))
        }
      },
      nextBtn(){
        let el=document.querySelectorAll('.banner_el');

        this.arr.push(this.arr[0]);
        this.arr.shift();
        for (let i = 0; i < el.length; i++) {
          el[i].style.left=this.arr[i]+'px';
          el[i].style.webkitTransform='scale(.8)';
          el[i].style.zIndex=1;
          el[i].style.boxShadow='none';
          if(parseInt(getStyle(el[i],'left'))==0){
              el[i].style.webkitTransform='scale(1.2)';
            el[i].style.zIndex=100;
            el[i].style.boxShadow='0 0 20px #444'
          }

        }

      },
      prevBtn(){
        let el=document.querySelectorAll('.banner_el');

        this.arr.unshift(this.arr[this.arr.length-1]);
        this.arr.pop();
        for (let i = 0; i < el.length; i++) {
          el[i].style.left=this.arr[i]+'px';
          el[i].style.webkitTransform='scale(.8)';
          el[i].style.zIndex=1;
          el[i].style.boxShadow='none';
          if(parseInt(getStyle(el[i],'left'))==579){
            el[i].style.webkitTransform='scale(1.2)';
            el[i].style.zIndex=100;
            el[i].style.boxShadow='0 0 20px #444'
          }

        }
      },
      getYZM(){
        let timer=Math.floor(Math.random()*10+2);
        this.YZM=false;
        //生成随机6位验证码
        let YZM_Number=Math.floor(Math.random()*1000000+10000);
       let _this=this;
          axios.post("/users/YZMinfo",{
            YZM:YZM_Number
          }).then((response)=>{
            let res=response.data;
            if(res.status==='0'){

            }
          });
          setTimeout(function () {
            _this.YZM=true;
            _this.YZM_msg_flag=true;
            _this.YZM_Number=YZM_Number;
            setTimeout(function () {
              _this.YZM_msg_flag=false;
            },6000)
          },parseInt(timer+'000'))
      },
      PayNew(){

        let _this=this;
        let YZM=_this.YZM_Number_flag;
        // alert(YZM);
        if(!YZM){
          _this.YZM_msg_warning_flag=true;
          setTimeout(function () {
            _this.YZM_msg_warning_flag=false;
          },3000)
          return;
        }
        _this.YZM_msg_warning_flag=false;
        _this.PayNew_flag=false;
        axios.post("/users/payMon",{
          YZM:YZM
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){

          }else{
            console.log(res)
          }
        });
        setTimeout(function () {
          _this.PayNew_flag=true;
          _this.$router.push({
            path:'/success'
          })
        },3000);
      },
    }
  }
</script>

<style scoped>
  /*html,body{*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow-x: scroll;*/
  /*}*/
  .bg { overflow-x: hidden; overflow-y: hidden; }
  .loading_box_show{
    opacity: 1;
    visibility: visible;
  }
  .mask_pay_show{
    opacity: 1;
    visibility: visible;
  }
</style>
