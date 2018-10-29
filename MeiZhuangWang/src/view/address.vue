<template>
  <div class="center">
    <div class="cart-head">
      <div class="cart-head-box">
        <div class="cart-head-left">
          <a href="/"> <img src="../../static/img/logo/logo.jpg" alt=""></a>
        </div>
        <div class="cart-head-right"></div>
      </div>
    </div>
    <div class="cart-nav">
      <div class="cart-nav-1">
        <router-link class="cart-nav-1-a" to="/">首页</router-link>&nbsp;/
        <router-link class="cart-nav-1-a" to="/cart">购物车</router-link>
        / <span class="cart-nav-1_car">我的购物地址</span>
      </div>
    </div>
    <div class="conten">
      <div class="conten-title"><h2>收货人地址</h2></div>
      <div class="conten_wrap">
        <div class="addressLiswrap">
          <ul class="addressLiswrap-ul">
            <li class="addressLiswrapul-li" v-for="(item,index) in addressList" :class="{'red':checkIndex==index}" @click="selectAddressId=item.addressId;checkIndex=index;setDefault(item.addressId)">
              <div class="sele_btn">
                <svg class="icon icon-dui7" v-if="item.isDefault" aria-hidden="true">　
                  <use xlink:href="#icon-dui7"></use>
                </svg>
              </div>
              <dl>
                <dt>{{item.userName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.tel}}</dt>
                <dd>{{item.streeName}}</dd>
              </dl>
              <div class="addAddress_btn">
                <button class="A6 addAddress_btn-delete" @click="showConfirm(item.addressId,'del')">
                  <div class="addAddress_btn-delete-box">
                    <span>
                        <svg class="icon icon-lajixiang" aria-hidden="true">　
              <use xlink:href="#icon-lajixiang"></use>
                        </svg>
                      </span>
                    <span>删除</span>
                  </div>
                </button>
                <button class="A6 addAddress_btn-edit">
                  <span>
                        <svg class="icon icon-75bianji" aria-hidden="true">　
              <use xlink:href="#icon-75bianji"></use>
                        </svg>
                      </span>
                  <span>编辑</span>
                </button>
              </div>
            </li>
            <li class="addressLiswrapul-li" @click="showConfirm()">
              <div class="add_address">
                <div class="add_address-svg">
                  <svg class="icon icon-jia20" aria-hidden="true">　
                    <use xlink:href="#icon-jia20"></use>
                  </svg>
                </div>
                <h6 class="">添加新地址</h6>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="address_next_btn" @click="sendPay()">
        <span>提交订单</span>
    </div>
    <div class="mask_del" :class="{'show_mask':confirmFlag}"  @click="no_del()"></div>
    <div class="posi_alert" :class="{'del_show':DelconfirmFlag}">
      <h2 class="posi_alert-title">提示!</h2>
      <h5 class="posi_alert-conten">听说你不要这个地址了?</h5>
      <div class="posi_alert-btn">
        <button class="posi_alert-A" @click="yes_del(DelAddressIdFlag)">是的</button>
        <button class="posi_alert-A" @click="no_del()">不是</button>
      </div>
    </div>
    <!--添加新地址提示框-->
    <div class="addressAlert" :class="{'addAddress':addAddressFlag}">
      <div class="add_close">
        <span class="add_close-img" @click="no_del()">
           <svg :class="{'check':checkAllFlag}" class="icon icon-guanbi6" aria-hidden="true">　
              <use xlink:href="#icon-guanbi6"></use>
            </svg>
        </span>
      </div>
      <div class="add_form">
        <h1 class="add_form-h1">新增收货地址</h1>
        <ul class="add_form-ul">
          <li class="add_form-ul-li">
            <span class="A5">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区</span>
            <input placeholder="请输入您的所在地区" class="inp-add" v-model="area" type="text">
          </li>
          <li class="add_form-ul-li">
            <span class="A5">详细地址</span>
            <input placeholder="请输入您的详细地址" class="inp-add" v-model="detalAddress" type="text">
          </li>
          <li class="add_form-ul-li">
            <span class="A5">邮政编号</span>
            <input placeholder="请输入您的邮政编号" class="inp-add" v-model="zipCode" type="text">
          </li>
          <li class="add_form-ul-li">
            <span class="A5">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
            <input placeholder="请输入您的可爱姓名" class="inp-add" v-model="addressName" type="text">
          </li>
          <li class="add_form-ul-li">
            <span class="A5">手机号码</span>
            <input placeholder="请输入您的手机号码" class="inp-add" v-model="phoneNumber" type="text">
          </li>
        </ul>
        <div class="add_form-btn">
          <button class="add_form-btn-yes" value="取消" @click="no_del()">取消</button>
          <button class="add_form-btn-no" value="提交" @click="SubmitNewAddress()">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import "./../assets/SVG/iconfont.js";
  import "./../assets/css/shortcode/address.css";
  import axios from "axios"

  export default {
    data() {
      return {
        addressList:[],
        checkIndex:'0',
        confirmFlag:false,
        DelconfirmFlag:false,
        DelAddressIdFlag:'',
        addAddressFlag:false,
        area:'',                       //地区
        detalAddress:'',               //详细地址
        zipCode:'',                    //邮编
        addressName:'',                //名字
        phoneNumber:'',                //电话号码
        postCode:100008,                   //地址编号
        selectAddressId:''             //选中得地址ID
      };
    },
    mounted() {
      this.init()
    },
    components: {},
    computed: {},
    methods: {
      init() {
        axios.get("/users/addressList").then((response) => {
          let res = response.data;
          // console.log(res)
          if (res.status === '0') {
            this.addressList = res.result;
          } else {
            console.log('init is bad!')
          }
        })
      },
      setDefault(addressId){
            axios.post("/users/setDefault",{
              addressId:addressId
            }).then((response)=>{

              let res=response.data;
              // console.log(res)
              if(res.status==='0'){
                // console.log(777777777777777)
                this.init();
              }else{
                // console.log(888888888888888888)
              }
            })
      },
      showConfirm(addressId,msg){
        this.confirmFlag=true;
        if(arguments.length==0){
          //添加新地址
          this.addAddressFlag=true;
        }else{
          if(msg==='del'){
            this.DelconfirmFlag=true;
            this.DelAddressIdFlag=addressId;
            console.log(this.DelAddressIdFlag)
          }
        }


      },
      //
      //删除商品
      yes_del(addressId) {
          console.log(addressId);
        //请求
        axios.post("/users/deleAddress",{
          addressId:addressId
        }).then((response)=>{
          let res=response.data;
          if(res.status==='0'){
            console.log(res);
            this.confirmFlag=false;
            this.DelconfirmFlag=false;
            this.init();

          }else{
            console.log(res)
          }
        })
      },
      // showConfirm(productId){
      //   this.confirmFlag=true;
      //   // var productId=productId;
      //   this.productIdTip=productId
      //   // @click="removeData(item.productId)"
      // },
      no_del(){
        this.confirmFlag=false;
        this.DelconfirmFlag=false;
        this.addAddressFlag=false
      },
      SubmitNewAddress(){
        let code=++this.postCode;
        this.postCode=code;
        console.log(code);
        let newAddressObj={
          "addressId" : code,
          "userName" : this.addressName,
          "province" : this.area,
          "streeName" : this.detalAddress,
          "postCode" : this.zipCode,
          "tel" : this.phoneNumber,
          "isDefault" : false
        };
        axios.post("/users/newAddress",{params:newAddressObj}).then((response)=>{
          let res=response.data;
          if(res.status==='0'){
            console.log(newAddressObj.isDefault);
            this.confirmFlag=false;
            this.DelconfirmFlag=false;
            this.addAddressFlag=false;
            this.init();
              this.area='';                   //地区
              this.detalAddress='';               //详细地址
              this.zipCode='';                    //邮编
              this.addressName='';                //名字
              this.phoneNumber=''
          }else{
            console.log(res)
          }
        })
      },
      sendPay(){
        let _this=this;
        let addressId=_this.selectAddressId;
        axios.post("/users/sendPay",{
          addressId:addressId
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            _this.$router.push({
              path:'/PAY'
            })
          }else{
            console.log(res)
          }
        });
      }
    }
  };
</script>
<style scoped="scoped">
  .center {
    width: 100%;
    padding-bottom: 390px;
    background: #f5f7fc;
  }

  .del_show {
    -webkit-transform: translateY(30px);
    -moz-transform: translateY(30px);
    -ms-transform: translateY(30px);
    -o-transform: translateY(30px);
    transform: translateY(30px);
    opacity: 1;
    visibility: visible;
  }

  .show_mask {
    opacity: 1;
    visibility: visible;
  }

  .addAddress {
    -webkit-transform: translateX(30px);
    -moz-transform: translateX(30px);
    -ms-transform: translateX(30px);
    -o-transform: translateX(30px);
    transform: translateX(70px);
    visibility: visible;
    opacity: 1;
  }
  .red{
    border-color: #dd3e3e;
  }
</style>
