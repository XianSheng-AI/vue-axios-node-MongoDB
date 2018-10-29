<template>
  <div>
    <header class="header">
      <div class="head">
        <div class="head_el-1">
          <div class="head_el-1_chil_1"><a href="javascript:;"><img src="./../assets/img/icon/logo.png" alt=""></a>
          </div>
          <div class="head_el-1_chil_2">
            <ul class="head_el-1_chil_2_ul">
              <li><a href="javascript:;">伊人首页</a></li>
              <li><a href="javascript:;">本周佳品</a></li>
              <li><a href="javascript:;">当月畅销</a></li>
              <li><a href="javascript:;">精选套装</a></li>
              <li><a href="javascript:;">美妆商城</a></li>
              <li><a href="javascript:;">正品保证</a></li>
              <li><a href="javascript:;">联系我们</a></li>
            </ul>

            <div class="regist-user" @click="openLang()">
              <a href="javascript:;" class="regist-user-a" v-show="userNameFlag">{{userName}}</a>
              <a class="regist-user-a" href="javascript:;" v-show="!userNameFlag">请登陆</a>
            </div>
            <a href="javascript:;" class="logout" v-show="userNameFlag" @click="logOut()">登出</a>
            <div class="icon_cart">
              <div class="cart_svg">
                <svg class="icon icon-cart1" aria-hidden="true">　　
                  <use xlink:href="#icon-cart1"></use>
                </svg>
              </div>
              <span class="cart_num">{{productCount}}</span>
              <!--购物车结算-->
              <div class="cart_box" :class="{'cart_box_flag':!userNameFlag}">
                <div class="cart_box_pl_head" v-if="!userNameFlag">
                  <svg class="icon icon-denglu3" aria-hidden="true">
                    <use xlink:href="#icon-denglu3"></use>
                  </svg>
                </div>
                <h2 class="cart_box_pl-text" v-if="!userNameFlag">请登陆后进行查看购物车!</h2>
                <ul class="cart_ul" v-if="userNameFlag">
                  <!--循环购物车列表-->
                  <li v-for="(item,index) in cartListIndex" :key="item.productImg">
                    <div class="cart_ul-img">
                      <img :src="'./../../static/img/shop-list/'+item.productImg" alt="">
                    </div>
                    <div class="cart_ul_li-detal">
                      <h2 class="cart_ul_li-detal-h2_1">{{item.productName}}</h2>
                      <h2 class="cart_ul_li-detal-h2_2">{{item.productTip}}</h2>
                      <div class="cart_ul-price">
                        <span>
                          <svg class="icon icon-qian1" aria-hidden="true">　　
                            <use xlink:href="#icon-qian1"></use>
                          </svg>
                        </span>
                        <h2 class="cart_ul-price-h2">{{item.productPrice}}</h2>
                      </div>
                      <div class="cart_ul-count">
                        <div class="A1 cart_ul-count-same cart_ul-count-redue" @click="editCart('redue',item)">
                          <svg class="icon icon-53" aria-hidden="true">　　
                            <use xlink:href="#icon-53"></use>
                          </svg>
                        </div>
                        <div class="cart_ul-count-same">
                          x{{item.productNum}}
                        </div>
                        <div class="A1 cart_ul-count-same cart_ul-count-add" @click="editCart('add',item)">
                          <svg class="icon icon-54-copy" aria-hidden="true">　　
                            <use xlink:href="#icon-54-copy"></use>
                          </svg>
                        </div>
                      </div>
                      <div class="cart_ul-remove" @click="remData(item.productId,index)">
                        <svg class="icon icon-lajixiang1" aria-hidden="true">　　
                          <use xlink:href="#icon-lajixiang1"></use>
                        </svg>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="go-checked" v-if="userNameFlag">
                  <h2 class="go-checked-total A2"><span class="go-checked-total-he">订单合计:&nbsp;</span>{{totalPrice}}元
                  </h2>
                  <!--<button class="go-checked-subm A2">去结算</button>-->
                  <router-link class="go-checked-subm A2" to="/cart">去结算</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="head_el-2"></div>
        <div class="head_el-3"></div>
      </div>
      <div class="head_img">
        <div>
          <!--图片轮播-->
          <ul>
            <li class="slid_img"><img src="./../../static/img/slider/1.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/2.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/4.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/5.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/6.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/7.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/8.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/9.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/10.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/11.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/12.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/13.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/14.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/15.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/16.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/17.jpg" alt=""></li>
            <li class="slid_img"><img src="./../../static/img/slider/18.jpg" alt=""></li>
            <li class="slid_img slid_img-ani"><img src="./../../static/img/slider/19.jpg" alt=""></li>

          </ul>
        </div>
        <!--上一页||下一页按钮-->
        <div class="slide_next">
          <div class="prev_btn" @click="slideBtn('prev')">
            <svg class="icon icon-icon-arrow-left2" aria-hidden="true">　　
              <use xlink:href="#icon-icon-arrow-left2"></use>
            </svg>
          </div>
          <div class="next_btn" @click="slideBtn('next')">
            <svg class="icon icon-icon-arrow-right2" aria-hidden="true">　　
              <use xlink:href="#icon-icon-arrow-right2"></use>
            </svg>
          </div>
        </div>
        <div class="title_box">
          <h2>
            <img src="./../../static/img/meizhuangwang2018wangmeichengxian/0kaishi.png" alt="">
          </h2>
          <h1>　
            <img src="./../../static/img/meizhuangwang2018wangmeichengxian/wangmei.png" alt="">
          </h1>
          <div class="title_box_btn"><a href="#">查看全部<i></i></a></div>
        </div>
      </div>
    </header>
    <div class="page-content-wrapper"></div>
    <!--floor_1-->
    <div class="floor_1">
      <ul>
        <li>
          <img src="./../assets/img/category-banner/1.jpg" alt="">
          <div>
            <h2>BEAUTY CREAM & LOTION</h2>
            <a href="javascript:;">去购买</a>
          </div>
        </li>
        <li>
          <img src="./../assets/img/category-banner/2.jpg" alt="">
          <div>
            <h2>BEAUTY CREAM & LOTION</h2>
            <a href="javascript:;">去购买</a>
          </div>
        </li>
        <li>
          <img src="./../assets/img/category-banner/3.jpg" alt="">
          <div>
            <h2>BEAUTY CREAM & LOTION</h2>
            <a href="javascript:;">去购买</a>
          </div>
        </li>
      </ul>
    </div>
    <!--floor_1___END-->
    <!--floor_2-->
    <div class="floor_2">
      <div class="floor_2-title">
        <h2>本月最佳</h2>
        <div>
          <svg class="icon icon-cart1" aria-hidden="true">　　
            <use xlink:href="#icon-cart1"></use>
            　　
          </svg>
        </div>
      </div>
      <div class="floor_2-main">
        <div class="floor_2-main_img">
          <img src="./../assets/img/other/deal.png" alt="">
        </div>
        <div class="floor_2-main_msg">
          <font style="vertical-align: inherit;">新品到货</font>
          <h2>Adicted，香水</h2>
          <h4>$60.00</h4>
          <p class="floor_2-main_msg_p1">Lorem存有胡萝卜，增强回扣，但提供更多的信息就来了，谁nostrud锻炼，学区可能无法正常工作aliquip。</p>
          <div class="floor_2-main-time">
            <ul>
              <li>
                <span class="day">00</span>
                <p>天</p>
              </li>
              <li class="hour">
                <span class="day">00</span>
                <p>时</p>
              </li>
              <li class="min">
                <span class="day">00</span>
                <p>分</p>
              </li>
              <li class="sec">
                <span class="day">00</span>
                <p>秒</p>
              </li>
            </ul>
          </div>
          <div class="floor_2-main_msg_btn">
            <a class="addCart" href="javascript:;">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <!--floor_2_END-->
    <!--floor_3-->
    <div class="floor_3">
      <div class="floor_2-title">
        <h2>本月最畅销</h2>
        <div class="floor_3_title">
          <svg class="icon icon-cart1" aria-hidden="true">　　
            <use xlink:href="#icon-cart1"></use>
          </svg>
        </div>
      </div>
      <div class="rotation_btn">
          <span class="rotation_prev" @click="prev('1')"><svg class="icon icon-shuangxianyoujiantou"
                                                              aria-hidden="true">　　
            <use xlink:href="#icon-shuangxianyoujiantou"></use>　　
          </svg></span>
        <span class="rotation_next" @click="next('0')"><svg class="icon icon-shuangxianzuojiantou" aria-hidden="true">　　
            <use xlink:href="#icon-shuangxianzuojiantou"></use>　　
          </svg></span>
      </div>
      <div class="rotation_box">
        <ul class="rotation_single_list">
          <li class="rotation_single_li" v-for="item in sellwellData" :key="item.productImg">
            <i class="good_tip">畅销</i>
            <div class="rotation_img">
              <a href="javascript:;">
                <img :src="'./../static/img/product/'+item.productImg" alt="">
              </a>
              <div class="mask"></div>
            </div>
            <div class="rotation_good_sale">
              <h4>{{item.productName}}</h4>
              <div class="buy_price">
                <span class="item_price">现售:{{item.productPrice}}</span>
                <del>原价:{{item.productOldPrice}}</del>
                <div class="add_cart">
                  <button @click="addWell(item.productId)">加入购物车</button>
                  <a class="mask_add" href="javascript:;"></a>
                </div>
              </div>
            </div>
            <span class="line_b"></span>
          </li>
        </ul>
      </div>
    </div>

    <!--floor_3_END-->
    <!--floor_4-->
    <div class="floor_4">
      <div class="floor_2-title">
        <h2>套装购买</h2>
        <div class="floor_3_title">
          <svg class="icon icon-cart1" aria-hidden="true">　　
            <use xlink:href="#icon-cart1"></use>
          </svg>
        </div>
      </div>
      <!--正文-->
      <div class="floor_4_box">
        <div class="floor_4_box-center">
          <div class="floor_4_box-1 floor_4_box-y" v-for="(item,index) in suitData" :key="index">
            <div class="floor_4-mask">
              <img class="" :src="'./../static/img/adds/'+item.productImg" alt="">
              <div class="hid_text">
                <!--productId-->
                <!--productImg-->
                <!--productName-->
                <!--productOldPrice-->
                <!--productPrice-->
                <!--productTip-->
                <h2>{{item.productName}}</h2>
                <p>{{item.productTip}}</p>
                <span>￥{{item.productPrice}}</span>
                <button class="btn-y" @click="addSuit(item.productId)">添加到购物车</button>
              </div>
            </div>
          </div>
          <!--div hid_text-y
          div  floor_4-mask-s
          -->


          <!--<div class="floor_4_box-2 floor_4_box-y">-->
          <!--<div class="floor_4_box-2_1">-->
          <!--<div class="floor_4-mask floor_4-mask-s">-->
          <!--<img class="" src="./../assets/img/adds/2.jpg" alt="">-->
          <!--<div class="hid_text hid_text-y">-->
          <!--<h2>{{suitData[1].productName}}</h2>-->
          <!--<p>{{suitData[1].productTip}}</p>-->
          <!--<span>￥{{suitData[1].productPrice}}</span>-->
          <!--<button class="btn-y">添加到购物车</button>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="floor_4_box-2_2">-->
          <!--<div class="floor_4-mask floor_4-mask-s">-->
          <!--<img class="" src="./../assets/img/adds/3.jpg" alt="">-->
          <!--<div class="hid_text hid_text-y">-->
          <!--<h2>{{suitData[2].productName}}</h2>-->
          <!--<p>{{suitData[2].productTip}}</p>-->
          <!--<span>￥{{suitData[2].productPrice}}</span>-->
          <!--<button class="btn-y">添加到购物车</button>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="floor_4_box-3 floor_4_box-y">-->
          <!--<div class="floor_4-mask">-->
          <!--<img class="" src="./../assets/img/adds/4.jpg" alt="">-->
          <!--<div class="hid_text">-->
          <!--<h2>{{suitData[3].productName}}</h2>-->
          <!--<p>{{suitData[3].productTip}}</p>-->
          <!--<span>￥{{suitData[3].productPrice}}</span>-->
          <!--<button class="btn-y">添加到购物车</button>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <!--floor_4_END-->
    <!--floor_5-->
    <div class="goodProductPromise">
      <ul class="goodProductPromise_ul">
        <li>
          <div class="goodProductPromise_ul_box">
            <svg class="icon icon-iconzhengpin" aria-hidden="true">
              <use xlink:href="#icon-iconzhengpin"></use>
            </svg>
            <h5>100%正品保证</h5>
          </div>
        </li>
        <li>
          <div class="goodProductPromise_ul_box">
            <svg class="icon icon-icon2" aria-hidden="true">　　
              <use xlink:href="#icon-icon2"></use>
            </svg>
            <h5>质量保证</h5>
          </div>
        </li>
        <li>
          <div class="goodProductPromise_ul_box">
            <svg class="icon icon-favourable_full" aria-hidden="true">　　
              <use xlink:href="#icon-favourable_full"></use>
            </svg>
            <h5>95%好评率以上</h5>
          </div>
        </li>
        <li>
          <div class="goodProductPromise_ul_box">
            <svg class="icon icon-girl" aria-hidden="true">　　
              <use xlink:href="#icon-girl"></use>
            </svg>
            <h5>大多女神专品</h5>
          </div>
        </li>
      </ul>
    </div>
    <div class="floor_5">
      <div class="floor_5-title">
        <svg class="icon icon-vipg" aria-hidden="true">　　
          <use xlink:href="#icon-vipg"></use>
        </svg>
        <h5>每个女人都有追求美的权力<br/>那是每个女性天生的信仰</h5>
      </div>
      <div class="floor_5-shop">
        <h4>官方产品</h4>
      </div>
      <div class="floor_5-main">
        <ul class="floor_5-main_ul">
          <li class="f5" v-for="(item,index) in productList" :key="index" :class="{'fadeIn':fadeInFlag}">
            <div class="f5_img">
              <img v-lazy="'../static/img/shop-list/'+item.productImg" alt="">
              <div class="f5_mask"></div>
              <a href="javascript:;" class="f5_mask-text">
                <svg class="icon icon-ai-camera" aria-hidden="true">　　
                  <use xlink:href="#icon-ai-camera"></use>
                </svg>
              </a>
            </div>
            <div class="f5_msg">
              <div class="f5_msg_evaluate">
                <svg class="icon icon-pingjia2" aria-hidden="true">　　
                  <use xlink:href="#icon-pingjia2"></use>
                </svg>
                <span>（137条用户评价）</span>
              </div>
              <h4>{{item.productName}}</h4>
              <!--<div class="f5_msg-add">-->
              <!--<svg class="icon icon-dingwei" aria-hidden="true">　　-->
              <!--<use xlink:href="#icon-dingwei"></use>-->
              <!--</svg>-->
              <!--<span>广州</span>-->
              <!--</div>-->
              <p>{{item.productTip}}</p>
              <div class="f5_msg_Price">
                <button class="f5_msg_Price_btn" @click="addCart(item.productId)">加入购物车</button>
                <div class="f5_msg_Price_new_old">
                  <del>原价:${{item.productOldPrice}}</del>
                  <span>${{item.productPrice}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!--<cart-confirm :mdShow="mdShowCart" v-on:close="closeModal">-->
        <!--</cart-confirm>-->
        <!--<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">-->
        <!--<img class="loading_" v-show="loading" src="./../../static/loading-svg/loading-bubbles.svg" alt="">-->
        <!--</div>-->
      </div>
    </div>
    <div class="getPromise">
      <ul class="getPromise_ul">
        <li>
          <div class="getPromise_ul-box">
            <svg class="icon icon-feiji4" aria-hidden="true">　　
              <use xlink:href="#icon-feiji4"></use>
            </svg>
            <h5>交货快</h5>
            <h6>3天内获得美妆网产品</h6>
          </div>
        </li>
        <li>
          <div class="getPromise_ul-box">
            <svg class="icon icon-songhuoshangmen2" aria-hidden="true">　　
              <use xlink:href="#icon-songhuoshangmen2"></use>
            </svg>
            <h5>送货和退货</h5>
            <h6>订单满99元免运费</h6>
          </div>
        </li>
        <li>
          <div class="getPromise_ul-box">
            <svg class="icon icon-tuikuan" aria-hidden="true">　　
              <use xlink:href="#icon-tuikuan"></use>
            </svg>
            <h5>退款保证</h5>
            <h6>美妆网的产品是100%真实的</h6>
          </div>
        </li>
        <li>
          <div class="getPromise_ul-box">
            <svg class="icon icon-kefu2" aria-hidden="true">　　
              <use xlink:href="#icon-kefu2"></use>
            </svg>
            <h5>全天候支持</h5>
            <h6>最好的客服服务</h6>
          </div>
        </li>
      </ul>
    </div>
    <div class="show_producter-title">
      <svg class="icon icon-weibiaoti3" aria-hidden="true">　　
        <use xlink:href="#icon-weibiaoti3"></use>
      </svg>
    </div>
    <div class="show_producter">
      <div class="show_producter_img">
        <img src="./../../static/img/show_producter_img/slide1.jpg" alt="">
      </div>
      <ul class="show_producter-ul">
        <li class="show_producter_li" v-for="item in developsData" :key="item.developName">
          <div class="show_producter_li-div">
            <div class="person_img">
              <div class="person_img-animate">
                <div class="over_hiden">
                  <img :src="'./../../static/img/head-img/'+item.developImg" alt="">
                </div>
              </div>
            </div>
            <h5>{{item.developName}}</h5>
            <p>{{item.developMotto}}</p>
            <div class="show_producter_li-div-btn">
              联系她
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--floor_5_END-->
    <land :langFlag="MdlandFlag" @userName="userNamed($event)" @close="closeLangFlag" @cartList="checkLogin()"></land>
    <div class="suc_tip" :class="{'suc_show':suc_showFlag}">
      <div class="suc_tip-svg">
        <svg class="icon icon-dui-copy" aria-hidden="true">　　
          <use xlink:href="#icon-dui-copy"></use>
        </svg>
      </div>
      <span class="suc_tip-span">成功加入购物车！</span>
    </div>
    <!--需进行登陆-->
    <div class="suc_tip" :class="{'suc_show':suc_showFlag_need_land}">
      <div class="suc_tip-svg">
        <svg class="icon icon-jinggao1" aria-hidden="true">　　
          <use xlink:href="#icon-jinggao1"></use>
        </svg>
      </div>
      <span class="suc_tip-span">需要进行登陆！</span>
    </div>
    <!--需进行登陆完成-->
    <div class="go-head" @click="goHead()">
      <svg class="icon icon-dingbu5" aria-hidden="true">　　
        <use xlink:href="#icon-dingbu5"></use>
      </svg>
    </div>
    <footers></footers>
  </div>
</template>
<script>
  import "./../assets/css/shortcode/header.css";
  import "./../assets/css/shortcode/default.css";
  import "./../assets/SVG/iconfont.js";
  import "./../assets/MoveF/velocity.min";
  import "./../assets/css/shortcode/cartConfirm.css"
  import "./../../static/js/jquery-v3.3.1"
  import {util, getStyle} from "./../Util/util.js";
  import {bestSale, copyArr} from "./../Util/util";
  // import {} from "./../Util/util";
  import footers from "./../components/Footer";
  import land from "./../components/Land";
  import axios from "axios";
  // props:["mdShow"];
  export default {
    data() {
      return {
        scroll: 0,
        productList: [],
        sortFlag: 1,
        page: "1",
        pageSize: "8",
        busy: true,
        loading: false,
        mdShow: false,
        mdShowCart: false,
        suitData: [],
        name: '',
        developsData: [],
        MdlandFlag: false,
        openLangFlag: false,
        userName: '',
        userNameFlag: false,
        sliderNum: 17,
        head_falg: true,
        cartListIndex: [],
        fadeInFlag: false,
        tabs: [{
          a: 5
        }, {
          a: 8
        }],
        sellwellData: [],
        suc_showFlag: false,
        suc_showFlag_need_land: false
      }
    },
    components: {
      footers,
      // cartConfirm,
      land

    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      this.getSuitData();
      this.getProductMsg();
      this.getDevelopsData();
      this.checkLogin();
      this.sellWell();
      //定时器轮播(大图)
      this.aniBanner();

      // this.checkCartList();
    },
    computed: {
      //购物车总额
      totalPrice() {
        let money = 0;
        this.cartListIndex.forEach(function (item) {
          money += parseInt(item.productPrice) * parseInt(item.productNum);
        });
        return money;
      },
      //购物车总件数
      productCount() {
        let count = 0;
        this.cartListIndex.forEach(function (item) {
          count += parseInt(item.productNum);
        });
        return count;
      }
    },
    methods: {
      //畅销商品
      sellWell() {
        axios.post("/products/sellWell").then((response) => {
          let res = response.data;
          console.log(res)
          if (res.status == '0') {
// console.log(res)
            this.sellwellData = res.result;
            // console.log(this.sellwellData)
          } else {
            // alert("出错了！");
          }
        })
      },
      //加载购物车列表
      checkCartList(res, _this) {
        axios.post("/products/getCartList", {
          userName: res.result
        }).then((response) => {
          let resp = response.data;
          // console.log(resp);
          if (resp.status == '0') {
            // console.log(resp.result);
            let respData = resp.result.cartList;
            _this.cartListIndex = respData;
            // console.log(_this.cartListIndex[3].productImg)
            // console.log(respData)
            // console.log(_this.cartListIndex)
            // console.log(typeof this.cartListIndex)
            // alert(8)
          } else {

          }

          // console.log(_this.cartListIndex)
        })
        // console.log(this.cartListIndex)
        // alert(this.cartListIndex)
      },
      //处理商品滚动加载
      handleScroll() {
        let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let el_head = document.querySelectorAll('.head')[0];
        let head_class = "head";

        // alert(head_class);
        if (scroll >= 60) {
          if (this.head_falg) {
            el_head.className += " head_ani";
            this.head_falg = false;
          }
          // console.log(el_head)
        } else {
          // console.log(5);
          el_head.className = head_class;
          this.head_falg = true;
        }
      },
      //检查登陆
      checkLogin() {
        // alert(5);
        let _this = this;
        // parentUl.children[0].className="";
        axios.get("/products/checkLogin").then((response) => {
          let res = response.data;

          if (res.status === '0') {
            _this.userName = res.result;
            _this.userNameFlag = true;
            _this.pl_landFlag = true;

            // checkCartList(res);
            //  _this.cartListIndex=copyArr(_this.cartListIndex);
            _this.$options.methods.checkCartList(res, _this);

            // alert(7)
          } else {
            console.log(res)
          }
        })
        // console.log(this.cartListIndex)
      },
      //获取套装的数据
      getSuitData() {
        axios.post("/products/suits").then((responce) => {
          // alert(7)
          let res = responce.data;
          console.log(res)
          // console.log(res);
          this.suitData = res.result;
          // console.log(this.suitData)
          this.name = this.suitData[0].productName;
          // console.log(this.suitData);
          // console.log(this.suitData[0].productName);
        })
      },
      //获取官方商品
      getProductMsg(flag) {
        let params = {
          sortFlag: this.sortFlag,
          page: this.page,
          pageSize: this.pageSize
        };
        axios.post("/products/product", {params: params}).then((responce) => {
          let res = responce.data;
          // console.log(res);
          this.productList = res.result;
          this.loading = true;
          this.fadeInFlag = true;
          // if (responce.data.status == '0') {
          //   if (flag) {
          //     let res = responce.data.result.list;
          //     this.productList = this.productList.concat(res);
          //     this.loading = true;
          //     if (responce.data.result.count < 8) {
          //       this.busy = true;
          //       this.loading = false;
          //       this.fadeInFlag = true;
          //     } else {
          //       this.busy = false;
          //       this.fadeInFlag = true;
          //       // this.loading=true;
          //     }
          //   } else {
          //     let res = responce.data.result.list;
          //     this.productList = res;
          //     this.busy = false;
          //     this.fadeInFlag = true;
          //   }
          // } else {
          //   this.productList = [];
          //   console.log('出错了！');
          // }
        })
      },
      //开发者信息
      getDevelopsData() {
        axios.post('/products/develops').then((response) => {
          let res = response.data;
          this.developsData = res.result;
          // console.log(this.developsData);
        })
      },
      loadMore: function () {
        this.busy = true;
        setTimeout(() => {
          // console.log(5555);
          this.page++;
          this.getProductMsg(true);
          // this.busy = false;
        }, 500);
      },
      openLang() {
        // this.openLangFlag=true;
        this.MdlandFlag = true;
      },
      closeLangFlag() {
        // alert(8);
        // this.openLangFlag=true;
        // this.userName=userName;
        // console.log(this.userName);
        this.MdlandFlag = false;
      },
      userNamed(name) {
        // alert(8);
        // console.log(name);
        this.userName = name;
        this.userNameFlag = true;
        // console.log(this.userName);
      },
      //登出用户
      logOut() {
        axios.post("/products/logout").then((respense) => {
          let res = respense.data;
          // alert(8);
          if (res.status == '0') {
            // alert(212121);
            this.userNameFlag = false;
          }
        })
      },
      prev(str) {
        let el = document.querySelector(".rotation_single_list");
        let dis = parseInt(getStyle(el, "left"));
        this.scroll = dis + 300;
        // alert(this.scroll);
        bestSale(el, this.scroll);
      },
      next(str) {
        let el = document.querySelector(".rotation_single_list");
        let dis = parseInt(getStyle(el, "left"));
        this.scroll = dis - 300;
        bestSale(el, this.scroll);
        // bestSale(el,"translateX("+this.scroll+")");
      },
      closeModal() {
        this.mdShow = true;
        this.mdShowCart = true;
      },
      //头部轮播图
      slideBtn(msg) {
        let oli = document.querySelectorAll('.slid_img');
        // alert(oli.length)
        let oliLen = oli.length;

        if (msg === 'next') {
          // alert(this.sliderNum)
          if (this.sliderNum == 0) {
            this.sliderNum = oliLen;
          }
          for (let i = oliLen - 1; i >= 0; i--) {

            oli[i].className = 'slid_img';
          }
          oli[--this.sliderNum].className += ' slid_img-ani';
        } else {
          // alert(this.sliderNum)
          if (this.sliderNum + 1 == oliLen) {
            this.sliderNum = -1;
          }
          // alert(oliLen)
          for (let j = oliLen - 1; j >= 0; j--) {
            oli[j].className = 'slid_img';
          }
          oli[++this.sliderNum].className += ' slid_img-ani';
          // --this.sliderNum;
        }
      },
      aniBanner() {
        var _this = this;
        setInterval(function () {
          _this.slideBtn("next")
          // _this.$options.methods.slideBtn("next").bind(_this)();
        }, 6000);
      },
      //删除购物车商品
      remData(productId, index) {
        let _this = this;
        axios.post("/products/remData", {
          productId: productId
        }).then((responce) => {
          let res = responce.data;
          if (res.status == '0') {
            // console.log(res);
            setTimeout(function () {
              _this.checkLogin();
              // console.log(index)
            }, 200)
            // parentUl.removeChild(remLi);
            // _this.checkLogin()
          } else {

            // console.log(123456);
          }
        })
      },
      //加入购物车
      addSuit(productId) {
        let _this=this;
        axios.post("/products/addSuit", {
          productId: productId
        }).then((response) => {
          let res = response.data;
          if (res.status === '0') {
            _this.$options.methods.checkLogin.bind(this)();
            _this.suc_showFlag = true;
            // console.log(res);
            setTimeout(function () {
              _this.suc_showFlag = false;
            }, 1500)
          } else {
            _this.suc_showFlag_need_land = true;
            setTimeout(function () {
              _this.suc_showFlag_need_land = false;
            }, 3000)
          }
        })
      },
      addWell(productId) {
        let _this=this;
        axios.post("/products/addWell", {
          productId: productId
        }).then((response) => {
          let res = response.data;
          if (res.status === '0') {
            _this.$options.methods.checkLogin.bind(this)();
            _this.suc_showFlag = true;

            setTimeout(function () {
              _this.suc_showFlag = false;
            }, 1500)
            // console.log(res);
          } else {
            _this.suc_showFlag_need_land = true;
            setTimeout(function () {
              _this.suc_showFlag_need_land = false;
            }, 3000)
          }
        })
      },
      addCart(productId) {
        axios.post("/products/addCart", {
          productId: productId
        }).then((response) => {
          // alert(4);
          let res = response.data;
          // console.log(res);
          let _this = this;
          if (res.status == '0') {
            // alert(8);
            _this.$options.methods.checkLogin.bind(this)();
            _this.suc_showFlag = true;

            setTimeout(function () {
              _this.suc_showFlag = false;
            }, 1500)
          } else {
            _this.suc_showFlag_need_land = true;
            setTimeout(function () {
              _this.suc_showFlag_need_land = false;
            }, 3000)
          }
        })
      },
      //编辑购物车数量
      editCart(swi, item) {
        if (swi === 'add') {
          item.productNum++;
        } else {
          if (item.productNum > 1) {
            item.productNum--;
          } else {
            return;
          }
        }
        axios.post("/products/editCart", {
          productNum: item.productNum,
          productId: item.productId
        }).then((response) => {
          let res = response.data;
          if (res.status === '0') {
            console.log(res);
          }
        })
      },
      goHead() {
        let timer = null;
        let box = document.querySelector(".go-head");
        
          cancelAnimationFrame(timer);
          timer = requestAnimationFrame(function fn() {
            let oTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (oTop > 0) {
              document.body.scrollTop = document.documentElement.scrollTop = oTop - 100;
              timer = requestAnimationFrame(fn);
            } else {
              cancelAnimationFrame(timer);
            }
          });
        
      }
    },
  };
</script>
<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    /*font-size: 28px;*/
    color: #ffffff;
  }

  /*轮播图*/
  .slid_img {
    /*transform: translate(100px, 0) rotate(10deg);*/
    opacity: 0;
    overflow: hidden;
  }

  .slid_img-ani {

    /*transform: translate(0, 0) rotate(0deg);*/
    opacity: 1;
  }

  /*导航栏滚动定住*/
  .head_ani {
    position: fixed;
    top: 0;
  }

  .remSty {
    height: 0px;
    transition-duration: .2s;
    opacity: 0;
    transform: translate(-100px);
    /*display: none;*/
  }

  .fadeIn {
    opacity: 1;
    transition: .5s linear;
  }

  .cart_box_flag {
    height: 200px;
  }

  .cart_ul {
    padding-bottom: 50px;
  }

  .cart_ul::after {
    content: ".";
    clear: both;
    display: block;
    overflow: hidden;
    font-size: 0;
    height: 0;
  }

  .go-head {
    position: fixed;
    right: 50px;
    bottom: 60px;
    /*background: #000;*/
    width: 50px;
    height: 50px;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
  }

  .go-head:hover .icon {
    color: #72946D;
  }

  .go-head .icon {
    font-size: 50px;
    color: #9dc390;
    /*background: #000;*/
  }

  .suc_show {
    opacity: 1;
    -webkit-transform: translateX(-260px);
    -moz-transform: translateX(-260px);
    -ms-transform: translateX(-260px);
    -o-transform: translateX(-260px);
    transform: translateX(-260px);
  }
</style>


