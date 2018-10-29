<template>
  <div class="sellwell">
    <div class="sw_one">
      <span class="sw_one-spot"></span>
      <span class="sw_one-sp">订单管理</span>
    </div>
    <div class="data_length">
      <h4>{{sendValue.length}}条订单</h4>
    </div>
    <div class="sw_two">
      <div class="st-upload" @click="updateOrder()">刷新</div>
    </div>
    <div class="sw_three">
      <div class="sth-table-head">
        <ul class="sth-table-head-ul">
          <li class="A10 sth-table-ul-li">序号</li>
          <li class="A10 sth-table-ul-li">下单时间</li>
          <li class="A10 sth-table-ul-li">姓名</li>
          <li class="A10 sth-table-ul-li">手机号</li>
          <li class="A10 sth-table-ul-li">地址</li>
          <li class="A10 sth-table-ul-li">支付方式</li>
          <li class="A10 sth-table-ul-li">消费金额</li>
          <li class="A10 sth-table-ul-li">订单状态</li>
        </ul>
      </div>
      <div class="sth_contain">
        <ul class="sth_contain-ul">
          
            <transition-group appear>
              <li class="sth_contain-ul-li" v-for="(item,index) in sendValue" :key="item.createDate">
            <ul class="sc_ul">
              <li class="sc_ul-li">
                <span>{{index+1}}</span>
              </li>
              <li class="sc_ul-li">
                {{item.createDate}}
              </li>
              <li class="sc_ul-li">
                {{item.addressInfo.userName}}
              </li>
              <li class="sc_ul-li">
                {{item.addressInfo.tel}}
              </li>
              <li class="sc_ul-li">
                {{item.addressInfo.streeName}}
              </li>
              <li class="sc_ul-li">在线支付</li>
              <li class="sc_ul-li">
                ￥{{item.orderTotal}}
              </li>
              <li class="sc_ul-li">
                <!--delivery  发货-->
                <div class="status_delivery">
                  <svg class="icon icon-fahuo3" aria-hidden="true">　　
                    <use xlink:href="#icon-fahuo3"></use>
                  </svg>
                </div>
              </li>
            </ul>
          </li>
            </transition-group>

        </ul>
      </div>
    </div>
    <div class="sellwell_footer">
      <ul>
        <li>
          <div class="sf_btn"></div>
          <span>正选</span>
        </li>
        <li>
          <div class="sf_btn"></div>
          <span>反选</span>
        </li>
        <li>
          <div class="sf_btn"></div>
          <span>取消</span>
        </li>
        <li>
          <div class="sf_btn"></div>
          <span>删除</span>
        </li>
      </ul>
    </div>

    <div class="updateOrderSuc" :class="{'upd_suc_ani':usa_flag}">
      <div class="uOS-svg">
        <svg class="icon icon-duigou" aria-hidden="true">　　
          <use xlink:href="#icon-duigou"></use>
        </svg>
      </div>
      <div class="uOS-text">
        刷新成功
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "BMS",
    props: ['sendValue'],
    data() {
      return {

        edit_ani_flag: '88887',
        oldProductIdNum: '',

        sc_ul_li_edit_tip_ani_flag: '888888',
        oldProductTip: '',
        sc_ul_li_edit_name_ani_flag: '8888888',
        oldproductNamed: '',
        sc_ul_li_edit_Oprice_ani_flag: '8888888',
        oldProductPriced: '',
        sc_ul_li_edit_price_ani_flag: '8888888',
        productPriced: '',

        countP: 0,
        usa_flag: false
      }
    },
    mounted() {
      this.counted();
    },
    components: {},
    computed: {

    },
    methods: {
      counted() {
        return ++this.count;
      },
      updateOrder() {
        let _this = this;
        _this.usa_flag = true;
        axios.post("/admin/ordermanagement").then((response) => {

          let res = response.data;

          console.log(res);
          if (res.status === '0') {
            // alert(this.sendValue);
            _this.sendValue = res.result;
            setTimeout(function () {
              _this.usa_flag = false;
            }, 1000)


          }
        });
      },
      oldProductId(oldProductId) {

        this.sc_ul_li_edit_name_ani_flag = "88";
        this.sc_ul_li_edit_tip_ani_flag = '88';
        this.sc_ul_li_edit_Oprice_ani_flag = '88';//oldp
        this.sc_ul_li_edit_price_ani_flag = '88';  //pri

        this.oldProductIdNum = oldProductId;
      },
      oldProductTipd(productTip) {
        this.sc_ul_li_edit_name_ani_flag = "88";
        this.edit_ani_flag = '88';
        this.sc_ul_li_edit_Oprice_ani_flag = '88';//oldp
        this.sc_ul_li_edit_price_ani_flag = '88'; //pri

        this.oldProductTip = productTip;
      },
      oldProductName(productName) {
        this.edit_ani_flag = '88';
        this.sc_ul_li_edit_tip_ani_flag = '88';
        this.sc_ul_li_edit_Oprice_ani_flag = '88';//oldp
        this.sc_ul_li_edit_price_ani_flag = '88';  //pri

        this.oldproductNamed = productName;
      },
      oldProductPrice(productOldPrice) {
        this.edit_ani_flag = '88';
        this.sc_ul_li_edit_tip_ani_flag = '88';    //tip
        this.sc_ul_li_edit_name_ani_flag = '88';  //name
        this.sc_ul_li_edit_price_ani_flag = '88';  //pri

        this.oldProductPriced = productOldPrice;
      },
      productPrice(productPrice) {
        this.edit_ani_flag = '88';
        this.sc_ul_li_edit_tip_ani_flag = '88';    //tip
        this.sc_ul_li_edit_name_ani_flag = '88';  //name
        this.sc_ul_li_edit_Oprice_ani_flag = '88';//oldp

        this.productPriced = productPrice;
      },
      editCheck(product, msg) {
        if (msg === 'pId') {
          this.edit_ani_flag = null;
          console.log(this.oldProductIdNum);
          console.log(product);
          axios.post("/admin/updateWellId", {
            oldProductId: this.oldProductIdNum,
            newProductId: product
          }).then((response) => {
            let res = response.data;
            console.log(res);
            this.edit_ani_flag = null;
          }).catch(function (err) {
            console.log(err);
          })
        } else if (msg === 'pTip') {
          this.sc_ul_li_edit_tip_ani_flag = null;
          // console.log(this.edit_ani_flag);
          axios.post("/admin/updateWellTip", {
            oldProductTip: this.oldProductTip,
            newProductTip: product
          }).then((response) => {
            let res = response.data;
            this.sc_ul_li_edit_tip_ani_flag = null;
            console.log(res);
          }).catch(function (err) {
            console.log(err);
          })

        } else if (msg === 'pName') {
          this.sc_ul_li_edit_name_ani_flag = null;
          axios.post("/admin/updateWellName", {
            oldProductName: this.oldproductNamed,
            newProductName: product
          }).then((response) => {
            let res = response.data;
            this.sc_ul_li_edit_name_ani_flag = null;
            console.log(res);
          }).catch(function (err) {
            console.log(err);
          })
        } else if (msg === 'pOprice') {
          this.sc_ul_li_edit_Oprice_ani_flag = null;
          console.log(this.oldProductPriced);
          console.log(product);
          axios.post("/admin/updateWellOldPrice", {
            oldProductPrice: this.oldProductPriced,
            newOldProductPrice: product
          }).then((response) => {
            let res = response.data;
            this.sc_ul_li_edit_Oprice_ani_flag = null;
            console.log(res);
          }).catch(function (err) {
            console.log(err);
          })
        } else if (msg === 'pprice') {
          this.sc_ul_li_edit_price_ani_flag = null;
          axios.post("/admin/updateWellPrice", {
            productPrice: this.productPriced,
            newProductPrice: product
          }).then((response) => {
            let res = response.data;
            this.sc_ul_li_edit_price_ani_flag = null;
            console.log(res);
          }).catch(function (err) {
            console.log(err);
          })
        } else if (msg === '') {

        }
      }
    }
  }
</script>

<style scoped>


.v-enter,.v-leave-to{
  transform: translateY(80px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active{
  transition: all 0.6s ease;
}



  .icon {
    cursor: pointer;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    font-size: 20px;
  }

  .sellwell {
    width: 100%;
    height: 100%;
    /*background: #000;*/
    float: right;
  }

  .data_length {
    position: absolute;
    top: 64px;
    left: 50px;
    width: 100px;
    height: 40px;
    border-radius: 20px;
    /*background: #000;*/
    border: 4px solid #fd8937;
    /*background: -webkit-linear-gradient(to right,#df5000,#6e3537);*/
  }

  .data_length h4 {
    line-height: 40px;
    text-align: center;
  }

  .sw_one {
    width: 100%;
    height: 46px;
    border-bottom: 2px solid #f5f5f5;
  }

  .sw_one-spot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #f18200;
    border-radius: 6px;
    margin: 20px 3px 0 22px;
  }

  .sw_one-sp {
    font-weight: 600;
    font-size: 14px;
    width: 60px;
    color: #575757;

  }

  .sw_two {
    width: 100%;
    height: 80px;
    /*background: #58d7c0;*/
    float: left;
  }

  .st-upload {
    border-radius: 17px;
    width: 180px;
    height: 34px;
    background: #f18200;
    text-align: center;
    line-height: 34px;
    color: #FFFFFF;
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: bolder;
    margin: 20px auto;
    transition-duration: .3s;
    cursor: pointer;
  }

  .st-upload:hover {
    background: #ff8600;
  }

  .sw_three {
    clear: both;
    width: 92%;
    /*height: 500px;*/
    /*background: #3ea751;*/
    margin: 0 auto;
    padding: 0 10px;
    border: 1px solid #f5f5f5;
    border-radius: 10px;
    overflow: hidden;
  }

  .sth-table-head {
    width: 100%;
    /*height: 100%;*/
    /*background: #000;*/
  }

  .sth-table-head-ul::after {
    content: ".";
    clear: both;
    display: block;
    overflow: hidden;
    font-size: 0;
    height: 0;

  }

  .sth-table-head-ul {
    background: #8b8b8b;
  }

  .sth-table-head-ul li {
    /*color: #1d1d1d;*/
    width: 129.5px;
    height: 46px;
    /*background: #6e3537;*/
    font-size: 14px;
    font-weight: bolder;
    line-height: 46px;
    border-bottom: 2px solid #f5f5f5;
    /*margin-left: 1px;*/
    text-align: center;
    color: #FFFFFF;

  }

  .sth-table-head-ul li:nth-child(5) {
    width: 287px;
  }

  .sth_contain {
    clear: both;
    width: 100%;
    height: 448px;
    /*background: #000;*/
  }
.status_delivery{
  width: 100%;
  height: 100%;
  /*background: #8ac24a;*/
  line-height: 52px;
}
.status_delivery .icon{
  font-size: 20px;
  color: #18cb4b;
}

  /*.sc_ul:nth-child(odd){*/
  /*background: #c9c9c9;*/
  /*}*/
  .sth_contain-ul > li:nth-child(odd) {
    background: #eeeeee;
  }

  .sc_ul li {
    height: 40px;
    width: 129.5px;
    line-height: 40px;
    color: #000;
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
    font-size: 10px;
    position: relative;
  }

  .sc_ul li:nth-child(5) {
    width: 287px;
    white-space: nowrap;
    /*overflow: hidden;*/
    text-overflow: ellipsis;
  }

  .sc_select {
    width: 12px;
    height: 12px;
    border: 2px solid #d9d9d9;
    border-radius: 4px;
    margin: 12px auto;
  }

  .sc_select:hover {
    border-color: #515151;
  }

  .sc_do {
    width: 10px;
    height: 34px;
    /* background: #000; */
    margin: 3px 0 0 44px;
  }

  /*.edit {*/
  /*width: 50%;*/
  /*height: 100%;*/
  /*!*background: #3faa53;*!*/
  /*float: left;*/
  /*}*/

  /*.edit .icon {*/
  /*color: #d9d9d9;*/
  /*!*font-size: 14px;*!*/
  /*width: 14px;*/
  /*!*background: #7cdbd8;*!*/

  /*}*/

  .remove {
    width: 50%;
    height: 100%;
    /*background: #ee95a8;*/
    float: right;
  }

  .remove .icon {
    color: #8a8a8a;
    width: 15px;
  }

  .sellwell_footer {
    /*width: 200px;*/
    /*height: 20px;*/
    /*background: #868795;*/
    margin: 14px 0 0 37px;
  }

  .sellwell_footer li {
    margin-right: 8px;
    cursor: pointer;
  }

  .sellwell_footer li:hover .sf_btn {
    border-color: #515151;
  }

  .sellwell_footer li:hover span {
    color: #515151;
  }

  .sellwell_footer li span {
    color: #5e5e5e;
    font-size: 10px;
    /*background: #000;*/
  }

  .sf_btn {
    width: 12px;
    height: 12px;
    border: 2px solid #d9d9d9;
    border-radius: 4px;
    float: left;
    margin: 4px 4px 0 4px;
  }

  /*开始*/
  .sc_ul-li a {
    color: #000;
  }

  .sc_ul-li-edit {
    z-index: 10000000;
    width: 130px;
    height: 100px;
    /*background: #f16f75;*/
    position: absolute;
    top: 50px;
    /*top: 40px;*/
    left: -10px;
    visibility: hidden;
    border-radius: 6px;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
    opacity: 0;
  }

  .sc_ul-li-edit_ani {
    background: #ff8600;
    visibility: visible;
    top: 40px;
    opacity: 1;
  }

  .triangle {
    position: absolute;
    top: -20px;
    left: 55px;
    height: 0;
    width: 0;
    border-bottom: 10px solid #ff8600;
    border-left: 10px solid transparent;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
  }

  .sc_ul-li-edit-inp {
    width: 100%;
    height: 40px;
    background: #ff8600;
    margin: 10px auto;
    text-align: center;
    color: #FFFFFF;

  }

  .sc_ul-li-edit-inp_check {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: #515151;
    text-align: center;
    line-height: 40px;
    color: #FFFFFF;
    letter-spacing: 2px;
    font-size: 16px;
    border-radius: 0 0 6px 6px;
    transition-duration: .3s;
    cursor: pointer;
  }

  .sc_ul-li-edit-inp_check:hover {
    background: #878787;
  }

  .sc_ul-li-edit-tip {
    width: 480px;
    height: 86px;
    background: #ff8600;
    position: absolute;
    top: 50px;
    left: 85px;
    visibility: hidden;
    opacity: 0;
    z-index: 10000000000;
    transition-duration: .3s;
    border-radius: 6px;

  }

  .sc_ul-li-edit-inp-tip {
    text-align: center;
    color: #FFFFFF;
    font-size: 16px;
  }

  .sc_ul_li_edit_tip_ani {
    visibility: visible;
    opacity: 1;
    /*background: #000;*/
    top: 40px;
  }

  .sc_ul-li-edit-name {
    width: 180px;
    height: 86px;
    background: #ff8600;
    position: absolute;
    top: 50px;
    left: -10px;
    visibility: hidden;
    opacity: 0;
    z-index: 10000000000;
    transition-duration: .3s;
    border-radius: 6px;
  }

  .sc_ul_li_edit_name_ani {
    visibility: visible;
    opacity: 1;
    /*background: #000;*/
    top: 40px;
  }

  .sc_ul-li-edit-Oprice {
    width: 180px;
    height: 86px;
    background: #ff8600;
    position: absolute;
    top: 50px;
    left: -10px;
    visibility: hidden;
    opacity: 0;
    z-index: 10000000000;
    transition-duration: .3s;
    border-radius: 6px;
  }

  .sc_ul_li_edit_Oprice_ani {
    visibility: visible;
    opacity: 1;
    top: 40px;
  }

  .sc_ul-li-edit-price {
    width: 180px;
    height: 86px;
    background: #ff8600;
    position: absolute;
    top: 50px;
    left: -10px;
    visibility: hidden;
    opacity: 0;
    z-index: 10000000000;
    transition-duration: .3s;
    border-radius: 6px;
  }

  .sc_ul_li_edit_price_ani {
    visibility: visible;
    opacity: 1;
    top: 40px;
  }

  .updateOrderSuc {
    width: 100px;
    height: 100px;
    background: #515151;
    border-radius: 10px;
    position: fixed;
    top: 47%;
    left: 53.3%;
    transition-duration: .3s;
    visibility: hidden;
    opacity: 0;
  }

  .uOS-svg {
    width: 27%;
    height: 50%;
    /*background: #7cdbd8;*/
    line-height: 70px;
    margin: 0 auto;
  }

  .uOS-svg .icon {
    color: #FFFFFF;
    font-size: 28px;
  }

  .uOS-text {
    width: 100%;
    height: 50%;
    /*background: #f53743;*/
    color: #FFFFFF;
    text-align: center;
    line-height: 30px;
  }

  .upd_suc_ani {
    visibility: visible;
    opacity: 1;
  }
</style>













































