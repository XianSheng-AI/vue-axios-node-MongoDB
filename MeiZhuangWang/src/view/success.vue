<template>
  <div class="suc_bg">
    <div class="suc_bg">
      <div class="suc_box">
        <div class="suc-1">
          <div class="suc-1-svg">
            <svg class="icon icon-songhuoqianshou" aria-hidden="true">　　
              <use xlink:href="#icon-songhuoqianshou"></use>
            </svg>
          </div>
          <h2>支付成功</h2>
          <h6>我们将尽快为您安排发货</h6>
        </div>
        <div class="suc-2">
          <ul>
            <li>
              <div class="suc-2-h6-1">订单号</div>
              <div class="suc-2-h6-2">{{orderId}}</div>
            </li>
            <li>
              <div class="suc-2-h6-1">支付方式</div>
              <div class="suc-2-h6-2">货到付款</div>
            </li>
            <li>
              <div class="suc-2-h6-1">收件人</div>
              <div class="suc-2-h6-2">{{orderUser}}</div>
            </li>
            <li>
              <div class="suc-2-h6-1">联系电话</div>
              <div class="suc-2-h6-2">{{phoneNumber}}</div>
            </li>
            <li>
              <div class="suc-2-h6-1">收货地址</div>
              <div class="suc-2-h6-2">{{address}}</div>
            </li>
            <li>
              <div class="suc-2-h6-1">订单金额</div>
              <div class="suc-2-h6-2">￥{{orderTotal}}</div>
            </li>
            <li>
              <div class="suc-2-h6-1">订单创建时间</div>
              <div class="suc-2-h6-2">{{createDate}}</div>
            </li>
          </ul>
        </div>
        <div class="suc-3">
          <div class="suc-3-marg">
          <button class="suc-3-btn-1">
            <router-link class="suc-3-a-1" to="/">继续购物</router-link>
          </button>
          <div class="suc-3-line"></div>
          <button class="suc-3-btn-2">
            <router-link class="suc-3-a-2" to="/cart">查看购物车</router-link>
          </button>
          </div>
        </div>
        <!---->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    name: "success",
    data() {
      return {
        orderId:'',              //订单号
        orderTotal:'',           //订单金额
        address:'',              //用户地址
        createDate:'',           //订单创建时间
        phoneNumber:'',           //用户手机号
        orderUser:""
      }
    },
    mounted() {
      this.SUC_init()
    },
    computed: {},
    methods: {
      SUC_init() {
        // alert(888)
        axios.post("/users/success").then((response) => {
          let res = response.data;
          console.log(res)
          if (res.status == '0') {
            let Flag=res.result;
            console.log(Flag);
            this.orderId=Flag.orderId;
            this.orderTotal=Flag.orderTotal;
            this.address=Flag.addressInfo.streeName;
            this.phoneNumber=Flag.addressInfo.tel;
            this.createDate=Flag.createDate;
            this.orderUser=Flag.addressInfo.userName;
          } else {
            console.log(res+"err");
          }
        })
      }
    }

  }
</script>

<style scoped>
  .suc_bg {
    width: 100%;
    height: 758px;
    background: linear-gradient(to left, #ffd8ee, #c3fffd);
  }

  .suc_box {
    padding: 22px;
    width: 500px;
    /*height: 452px;*/
    background: #FFFFFF;
    position: fixed;
    top: 20%;
    /*left: 10%;*/
    left: 32.3%;
    border-radius: 10px;
  }

  .suc-1 {
    width: 150px;
    height: 30%;
    margin: 0 auto;
    /*background: #3ea751;*/
    /*border: 1px solid #cccccc;*/
    text-align: center;
  }

  .suc-1 h2 {
    font-size: 18px;
    padding: 18px 0 2px 0;
  }

  .suc-1 h6 {
    font-size: 10px;
    color: #888888;
  }

  .suc-1-svg {

  }

  .suc-1-svg .icon {
    color: #1cc85c;
    font-size: 70px;
  }

  .suc-2 {
    color: #88888888;
    margin-top: 16px;
    width: 100%;
    height: 190px;
    /*background: #000;*/
    border-bottom: 1px solid #ededed;
    /*background: #31B0D5;*/
  }

  .suc-2 li {
    font-size: 14px;
    width: 100%;
    height: 20px;
    float: none;
    margin-top: 6px;
    /*background: #3faa53;*/
  }

  .suc-2-h6-1 {
    float: left;
  }

  .suc-2-h6-2 {
    float: right;
  }

  .suc-3 {
    /*width: 100;*/
    height: 50px;
    margin: 20px auto;
    /*background: #000;*/

  }
  .suc-3-marg{
    height: 100%;
    margin: 0 auto;
    width: 290px;
    /*background: #000;*/
  }

  .suc-3-btn-1 {
    width: 134px;
    height: 50px;
    /*background: #6756ea;*/
    float: left;
    letter-spacing: 2px;
    border-radius: 6px;
    font-size: 16px;
    color: #c95360;
    font-weight: bold;
    cursor: pointer;
  }

  .suc-3-btn-2 {
    width: 134px;
    height: 50px;
    /*background: #ff96d9;*/
    letter-spacing: 2px;
    border-radius: 6px;
    font-size: 16px;
    color: #1bb456;
    font-weight: 600;
    cursor: pointer;
  }

  .suc-3-line {
    width: 1px;
    height: 50px;
    background: #ededed;
    margin: 0 10px;
    float: left;
  }

  .suc-3-a-1 {
    color: #c95360;
  }

  .suc-3-a-2 {
    color: #1bb456;
  }
</style>



































