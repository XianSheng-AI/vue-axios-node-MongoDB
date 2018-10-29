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
        <router-link class="cart-nav-1-a" to="/">首页</router-link>
        / <span class="cart-nav-1_car">我的购物车</span>
      </div>
    </div>
    <div class="conten">
      <h2 class="conten-h2">购物车</h2>
      <div class="conten_thead">
        <ul class="conten_thead-ul">
          <li><h6>商品</h6></li>
          <li><h6>价格</h6></li>
          <li><h6>数量</h6></li>
          <li><h6>小计</h6></li>
          <li><h6>删除</h6></li>
        </ul>
      </div>
      <div class="product_list" v-for="(item,index) in cartListData">
        <ul class="product_list-ul">
          <li class="product_list-ul-li">
            <div class="cart-tab-1 A4">
              <a class="selec_a A3" href="javascript:;" @click="editNum('selec',item)">
                <svg class="icon icon-duigou1" :class="{'check':item.checked==='1'}" aria-hidden="true">
                  <use xlink:href="#icon-duigou1"></use>
                </svg>
              </a>
              <div class="cart-tab-1-img A3">
                <img :src="'./../../static/img/shop-list/'+item.productImg" alt="">
              </div>
              <div class="cart-tab-1-detal A3">
                <h5 class="cart-tab-1-detal-name">{{item.productTip}}</h5>
                <div class="cart-tab-1-detal-p">
                  <svg class="icon icon-tian" aria-hidden="true">　　
                    <use xlink:href="#icon-tian"></use>
                  </svg>
                  <span class="day_7">7天无理由退货</span>
                </div>
              </div>
            </div>
            <div class="cart-tab-2 A4 te_al">
              <div class="cart-tab-2-price">￥{{item.productPrice}}</div>
            </div>
            <div class="cart-tab-3 A4 te_al">
              <div class="cart-tab-3-count">
                <div class="cart-tab-3-count-reduce A4" @click="editNum('reduce',item)">
                  <svg class="icon icon-jian10" aria-hidden="true">　　
                    <use xlink:href="#icon-jian10"></use>
                  </svg>
                </div>
                <div class="cart-tab-3-count-num A4 te_al hov">x{{item.productNum}}</div>
                <div class="cart-tab-3-count-add A4 hov" @click="editNum('add',item)">
                  <svg class="icon icon-jia11" aria-hidden="true">　　
                    <use xlink:href="#icon-jia11"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="cart-tab-4 A4 te_al">
              <div class="cart-tab-4-num">￥{{item.productNum*item.productPrice}}</div>
            </div>
            <div class="cart-tab-5 A4 te_al">
              <!--@click="removeData(item.productId)"-->
              <div class="cart-tab-5-throw" @click="showConfirm(item.productId)">
                <svg class="icon icon-lajixiang" aria-hidden="true">　　
                  <use xlink:href="#icon-lajixiang"></use>
                </svg>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="flag"></div>
      <div class="product_computed">
        <div class="product_computed-left">
          <a href="/">
            <button class="product_computed-left-goBack">返回继续购买</button>
          </a>
        </div>
        <div class="product_computed-1">
          <ul class="product_computed-1-ul">
            <li class="product_computed-1-ul-li">
              <span>商品小计:</span>
              <span>￥{{totalPrice.total}}</span>
            </li>
            <li class="product_computed-1-ul-li">
              <span>优惠券抵扣:</span>
              <span>-￥{{coupon}}</span>
            </li>
            <li class="product_computed-1-ul-li">
              <span>运费:</span>
              <span>+￥{{freight}}</span>
            </li>
            <li class="product_computed-1-ul-li">
              <span>税费:</span>
              <span>+￥{{taxation}}</span>
            </li>
            <li class="product_computed-1-ul-li">
              <span>订单总额:</span>
              <span>￥{{totalPrice.totalOrder}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="flag"></div>
      <div class="cart-foot-wrap">
        <div class="cart-foot-left" @click="ToggleCheck()">
          <div class="sele_all_svg A4">
            <svg :class="{'check':checkAllFlag}" class="icon icon-duigou1" aria-hidden="true">　
              <use xlink:href="#icon-duigou1"></use>
            </svg>
          </div>
          <div class="sele_all_text">选择全部商品</div>
        </div>
        <div class="cart-foot-right">
          <span class="A4-1 A4">应付金额:&nbsp;</span>
          <span class="A4-1 A4 ">￥{{totalPrice.totalOrder}}</span>
            <div class="true_chedkout te_al" :class="{'btn__dis':checkCount==0}" @click="checkOut()">继续付款</div>
        </div>
      </div>
    </div>
    <div class="mask_del" :class="{'show_mask':confirmFlag}"></div>
    <div class="posi_alert" :class="{'del_show':confirmFlag}">
      <h2 class="posi_alert-title">提示!</h2>
      <h5 class="posi_alert-conten">您确定删除此商品?</h5>
      <div class="posi_alert-btn">
        <button class="posi_alert-A" @click="yes_del()">删除</button>
        <button class="posi_alert-A" @click="no_del()">不要</button>
      </div>
    </div>

  </div>

</template>
<script>
  import "./../assets/SVG/iconfont.js";
  import "./../assets/css/shortcode/checkout.css";
  import axios from "axios";

  export default {
    data() {
      return {
        cartListData: [],
        checkFlag: false,
        total: 0,         //商品小计
        coupon: 40,       //优惠卷抵扣
        freight: 18,      //运费
        taxation: 4,     //税费
        totalOrder: 0,    //订单总额
        confirmFlag: false,   //
        productIdTip: '',
        addAddressFlag: false,
      };
    },
    mounted() {
      this.init()
    },
    components: {},
    computed: {
      checkAllFlag() {
        return this.checkCount === this.cartListData.length
      },
      checkCount() {
        let i = 0;
        this.cartListData.forEach((item) => {
          if (item.checked === '1') i++;
        });
        return i;
      },
      totalPrice() {
        this.total = 0;
        this.cartListData.forEach((item) => {
          if (item.checked === '1') {
            this.total += parseInt(item.productPrice) * parseInt(item.productNum);
          }

        });
        this.totalOrder = this.total - this.coupon + this.freight + this.taxation;
        let priceObj = {
          total: this.total,
          totalOrder: this.totalOrder
        };
        return priceObj;
      }
    },
    methods: {
      init() {
        axios.post("/users/cartList").then((response) => {
          let res = response.data;
          if (res.status === '0') {
            this.cartListData = res.result;
          } else {
            console.log(-1);
          }
        })
      },
      //数量编辑
      editNum(msg, item) {
        if (msg === 'add') {
          item.productNum++;
        } else if (msg === 'reduce') {
          if (item.productNum > 1) {
            item.productNum--;
          }
        } else {
          item.checked = item.checked === '1' ? '0' : '1';
        }
        console.log(item.checked)
        axios.post("/users/editnum", {
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked
        }).then((response) => {
          let res = response.data;
          if (res.status === '0') {
            console.log(item.checked)
          }
        })
      },
      //删除商品
      removeData(productId) {
        axios.post("/users/removedata", {
          productId: productId
        }).then((response) => {
          let res = response.data;
          console.log(res);
          if (res.status === '0') {
            console.log(res);
            this.init();
          }
        })
      },
      showConfirm(productId) {
        this.confirmFlag = true;
        // var productId=productId;
        this.productIdTip = productId
        // @click="removeData(item.productId)"
      },
      no_del() {
        this.confirmFlag = false;
        this.addAddressFlag = false
      },
      yes_del() {
        this.confirmFlag = false;
        this.removeData(this.productIdTip);
      },
      //全选商品
      ToggleCheck() {
        let _this = this;
        let check = !_this.checkAllFlag;
        _this.cartListData.forEach(function (item) {
          item.checked = check == true ? '1' : '0';
          console.log(item.checked)
        });
        _this.checkAllFlag = check;
        // console.log(_this.checkAllFlag);
        axios.post("/users/editCheckAll", {
          checked: check == true ? '1' : '0',
        }).then((response) => {
          let res = response.data;
          if (res.status === '0') {
            console.log(res);
          }
          console.log(res);
        })
      },
      checkOut() {
        if (this.checkCount > 0) {
          this.$router.push({
            path: '/address'
          })
        }
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

  .check {
    opacity: 1;
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
    transform: translateX(206px);
    opacity: 1;
    visibility: visible;
  }

  .btn__dis {
    background: #cccccc;
    cursor: not-allowed;
  }
</style>
