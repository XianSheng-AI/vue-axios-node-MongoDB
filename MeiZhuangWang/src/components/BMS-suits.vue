<template>
  <div class="sellwell">
    <div class="sw_one">
      <span class="sw_one-spot"></span>
      <span class="sw_one-sp">美妆套装</span>
    </div>
    <div class="data_length">
      <h4>{{sendValue.length}}条</h4>
    </div>
    <div class="sw_two">
      <div class="st-upload">上传商品</div>
    </div>
    <div class="sw_three">
      <div class="sth-table-head">
        <ul class="sth-table-head-ul">
          <li class="A10 sth-table-ul-li">ID</li>
          <li class="A10 sth-table-ul-li">选择</li>
          <li class="A10 sth-table-ul-li">商品描述</li>
          <li class="A10 sth-table-ul-li">品牌名</li>
          <li class="A10 sth-table-ul-li">原价</li>
          <li class="A10 sth-table-ul-li">折扣价</li>
          <li class="A10 sth-table-ul-li">上传时间</li>
          <li class="A10 sth-table-ul-li">上传者</li>
          <li class="A10 sth-table-ul-li">操作</li>
        </ul>
      </div>
      <div class="sth_contain">
        <ul class="sth_contain-ul">
          <li class="sth_contain-ul-li" v-for="(item,index) in sendValue">
            <ul class="sc_ul">
              <li class="sc_ul-li" @click="edit_ani_flag=index;oldProductId(item.productId)">{{item.productId}}
                <div class="sc_ul-li-edit" :class="{'sc_ul-li-edit_ani':edit_ani_flag==index}">
                  <div class="triangle"></div>
                  <input type="text" class="sc_ul-li-edit-inp" v-model="item.productId">
                  <div class="sc_ul-li-edit-inp_check" @click="editCheck(item.productId,'pId')">确定</div>
                </div>
              </li>
              <li class="sc_ul-li">
                <div class="sc_select"></div>
              </li>
              <li class="sc_ul-li" @click="sc_ul_li_edit_tip_ani_flag=index;oldProductTipd(item.productTip)">
                {{item.productTip}}

                <div class="sc_ul-li-edit-tip" :class="{'sc_ul_li_edit_tip_ani':sc_ul_li_edit_tip_ani_flag==index}">
                  <div class="triangle"></div>
                  <input type="text" class="sc_ul-li-edit-inp-tip" v-model="item.productTip">
                  <div class="sc_ul-li-edit-inp_check" @click="editCheck(item.productTip,'pTip')">确定</div>
                </div>

              </li>
              <li class="sc_ul-li" @click="sc_ul_li_edit_name_ani_flag=index;oldProductName(item.productName)">
                {{item.productName}}
                <div class="sc_ul-li-edit-name" :class="{'sc_ul_li_edit_name_ani':sc_ul_li_edit_name_ani_flag==index}">
                  <div class="triangle"></div>
                  <input type="text" class="sc_ul-li-edit-inp" v-model="item.productName">
                  <div class="sc_ul-li-edit-inp_check" @click="editCheck(item.productName,'pName')">确定</div>
                </div>
              </li>
              <li class="sc_ul-li" @click="sc_ul_li_edit_Oprice_ani_flag=index;oldProductPrice(item.productOldPrice)">
                ￥{{item.productOldPrice}}

                <div class="sc_ul-li-edit-Oprice"
                     :class="{'sc_ul_li_edit_Oprice_ani':sc_ul_li_edit_Oprice_ani_flag==index}">
                  <div class="triangle"></div>
                  <input type="text" class="sc_ul-li-edit-inp" v-model="item.productOldPrice">
                  <div class="sc_ul-li-edit-inp_check" @click="editCheck(item.productOldPrice,'pOprice')">确定</div>
                </div>

              </li>
              <li class="sc_ul-li" @click="sc_ul_li_edit_price_ani_flag=index;productPrice(item.productPrice)">
                ￥{{item.productPrice}}
                <div class="sc_ul-li-edit-price"
                     :class="{'sc_ul_li_edit_price_ani':sc_ul_li_edit_price_ani_flag==index}">
                  <div class="triangle"></div>
                  <input type="text" class="sc_ul-li-edit-inp" v-model="item.productPrice">
                  <div class="sc_ul-li-edit-inp_check" @click="editCheck(item.productPrice,'pprice')">确定</div>
                </div>
              </li>
              <li class="sc_ul-li">2018-6-19</li>
              <li class="sc_ul-li">蔡先佳</li>
              <li class="sc_ul-li">
                <div class="sc_do">
                  <!--<div class="edit">-->
                    <!--<svg class="icon icon-bianji5" aria-hidden="true">　-->
                      <!--<use xlink:href="#icon-bianji5"></use>-->
                    <!--</svg>-->
                  <!--</div>-->
                  <div class="remove">
                    <svg class="icon icon-lajixiang" aria-hidden="true">　
                      <use xlink:href="#icon-lajixiang"></use>
                    </svg>
                  </div>
                </div>
              </li>
            </ul>
          </li>
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

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "BMS",
    props:['sendValue'],
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
      }
    },
    mounted() {

    },
    components: {},
    computed: {},
    methods: {
      oldProductId(oldProductId) {
        this.sc_ul_li_edit_name_ani_flag="88";
        this.sc_ul_li_edit_tip_ani_flag='88';
        this.sc_ul_li_edit_Oprice_ani_flag='88';//oldp
        this.sc_ul_li_edit_price_ani_flag='88';  //pri

        this.oldProductIdNum = oldProductId;
      },
      oldProductTipd(productTip) {
        this.sc_ul_li_edit_name_ani_flag="88";
        this.edit_ani_flag='88';
        this.sc_ul_li_edit_Oprice_ani_flag='88';//oldp
        this.sc_ul_li_edit_price_ani_flag='88'; //pri

        this.oldProductTip = productTip;
      },
      oldProductName(productName) {
        this.edit_ani_flag='88';
        this.sc_ul_li_edit_tip_ani_flag='88';
        this.sc_ul_li_edit_Oprice_ani_flag='88';//oldp
        this.sc_ul_li_edit_price_ani_flag='88';  //pri

        this.oldproductNamed = productName;
      },
      oldProductPrice(productOldPrice) {
        this.edit_ani_flag='88';
        this.sc_ul_li_edit_tip_ani_flag='88';    //tip
        this.sc_ul_li_edit_name_ani_flag='88';  //name
        this.sc_ul_li_edit_price_ani_flag='88';  //pri

        this.oldProductPriced = productOldPrice;
      },
      productPrice(productPrice) {
        this.edit_ani_flag='88';
          this.sc_ul_li_edit_tip_ani_flag='88';    //tip
        this.sc_ul_li_edit_name_ani_flag='88';  //name
        this.sc_ul_li_edit_Oprice_ani_flag='88';//oldp

        this.productPriced = productPrice;
      },
      editCheck(product, msg) {
        if (msg === 'pId') {
          this.edit_ani_flag = null;
          console.log(this.oldProductIdNum);
          console.log(product);
          axios.post("/admin/updateSuitId", {
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
          axios.post("/admin/updateSuitTip", {
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
          axios.post("/admin/updateSuitName", {
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
          axios.post("/admin/updateSuitOldPrice", {
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
          axios.post("/admin/updateSuitPrice", {
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
  .data_length{
    position: absolute;
    top: 58px;
    left: 40px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    /*background: #000;*/
    border: 4px solid #fd8937;
    /*background: -webkit-linear-gradient(to right,#df5000,#6e3537);*/
  }
  .data_length h4{
    line-height: 50px;
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
    font-size: 13px;
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
    height: 448px;
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
    background: #000;
  }

  .sth-table-head-ul li {
    color: #7484a3;
    width: 110px;
    height: 46px;
    /*background: #6e3537;*/
    font-size: 14px;
    font-weight: bolder;
    line-height: 46px;
    border-bottom: 2px solid #f5f5f5;
    /*margin-left: 1px;*/
    text-align: center;
  }

  .sth-table-head-ul li:nth-child(3) {
    width: 300px;
  }

  .sth_contain {
    clear: both;
    width: 100%;
    /*height: 500px;*/
    /*background: #000;*/
  }

  .sc_ul li {
    height: 40px;
    width: 110px;
    line-height: 40px;
    color: #000;
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
    font-size: 10px;
    position: relative;
  }

  .sc_ul li:nth-child(3) {
    width: 300px;
    white-space: normal;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
  }

  .sc_select {
    width: 12px;
    height: 12px;
    border: 2px solid #d9d9d9;
    border-radius: 4px;
    margin: 12px auto;
  }

  .sc_do {
    width: 10px;
    height: 34px;
    /*background: #000;*/
    margin: 3px 0 0 44px;
  }

  .edit {
    width: 50%;
    height: 100%;
    /*background: #3faa53;*/
    float: left;
  }

  .edit .icon {
    color: #d9d9d9;
    /*font-size: 14px;*/
    width: 14px;
    /*background: #7cdbd8;*/

  }

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
  .sellwell_footer{
    /*width: 200px;*/
    /*height: 20px;*/
    /*background: #868795;*/
    margin: 14px 0 0 37px;
  }
  .sellwell_footer li{
    margin-right: 8px ;
    cursor: pointer;
  }
  .sellwell_footer li:hover .sf_btn{
    border-color: #515151;
  }
  .sellwell_footer li:hover span{
    color: #515151;
  }
  .sellwell_footer li span{
    color: #5e5e5e;
    font-size: 10px;
    /*background: #000;*/
  }
  .sf_btn{
    width: 12px;
    height: 12px;
    border: 2px solid #d9d9d9;
    border-radius: 4px;
    float: left;
    margin: 4px 4px 0 4px;
  }

  /*开始*/
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
    width: 860px;
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

</style>













































