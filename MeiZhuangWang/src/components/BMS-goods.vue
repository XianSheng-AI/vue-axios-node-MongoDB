<template>
  <div class="sellwell">
    <div class="sw_one">
      <span class="sw_one-spot"></span>
      <span class="sw_one-sp">官方产品</span>
    </div>
    <div class="data_length">
      <h4>{{sendValue.length}}条</h4>
    </div>
    <div class="sw_two">
      <div class="st-upload" @click="uploadBtn()">上传商品</div>
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
          <li class="sth_contain-ul-li" v-for="(item,index) in sendValue" :key="item.productId">
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
              <li class="sc_ul-li">2018-6-20

              </li>
              <li class="sc_ul-li">蔡先佳</li>
              <li class="sc_ul-li">
                <div class="sc_do">
                  <!--<div class="edit" @click="editGoods(item.productId)">-->
                  <!--<svg class="icon icon-bianji5" aria-hidden="true">-->
                  <!--<use xlink:href="#icon-bianji5"></use>-->
                  <!--</svg>-->
                  <!--</div>-->
                  <div class="remove" @click="showConfirm(item.productId)">
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
    <!--遮罩层-->
    <div class="mask_del" :class="{'show_mask':confirmFlag||confirmFlag_upload}" @click="no_del()"></div>
    <!--END-->
    <!--上传商品提示框-->
    <div class="addressAlert" :class="{'addAddress':addAddressFlag}">
      <div class="add_close">
        <span class="add_close-img" @click="no_del()">
           <svg :class="{'check':checkAllFlag}" class="icon icon-guanbi5" aria-hidden="true">　
              <use xlink:href="#icon-guanbi5"></use>
            </svg>
        </span>
      </div>
      <h1 class="add_form-h1">新增商品</h1>
      <div class="add_form">
        <iframe name="testIframeName" style="display: none;"></iframe>
        <form target="testIframeName" action="/admin/uploadgoods" enctype="multipart/form-data" method="post">

          <ul class="add_form-ul">

            <li class="add_form-ul-li">
              <span class="A5">商品ID：</span>
              <input placeholder="请输入商品ID" class="newProduct" v-model="productId" name="productId" type="text">
            </li>
            <li class="add_form-ul-li">
              <span class="A5">商品描述：</span>
              <input placeholder="请输入商品描述" class="newProduct" v-model="productTip" name="productTip" type="text">
              <!--<textarea class="newProduct" name="description" id="" cols="30" rows="10"></textarea>-->
            </li>
            <li class="add_form-ul-li">
              <span class="A5">品牌名：</span>
              <input placeholder="请输入商品品牌" class="newProduct" v-model="productName" name="productName" type="text">
            </li>
            <li class="add_form-ul-li">
              <span class="A5">原价：</span>
              <input placeholder="请输入商品原价" class="newProduct" v-model="productOldPrice" name="productOldPrice"
                     type="text">
            </li>
            <li class="add_form-ul-li">
              <span class="A5">折扣价：</span>
              <input placeholder="请输入商品折扣价" class="newProduct" v-model="productPriced" name="productPrice" type="text">
            </li>
            <li class="add_form-ul-li">
              <span class="A5">上传者：</span>
              <input placeholder="请输入上传者" class="newProduct" v-model="sender" type="text">
            </li>
            <li class="add_form-ul-li">
              <input type="file" name="thumbnail">
              <button type="submit"></button>
            </li>
          </ul>
          <div class="add_form-btn">
            <button class="add_form-btn-yes" value="取消" @click="no_del()">取消</button>
            <button type="submit" class="add_form-btn-no" value="提交" @click="uploadMet()">提交</button>
          </div>
        </form>
      </div>
    </div>
    <!--END-->
    <!--删除成功提示-->
    <div class="land_suc" :class="{'land_suc_secon':land_suc_secon_flag}">
      <div class="ls_svg">

        <svg class="icon icon-duigou1">
          <use xlink:href="#icon-duigou1"/>
        </svg>

      </div>
      <div class="ls_text">删除成功</div>
    </div>
<!--END-->
    <!--删除提示框-->
    <div class="posi_alert" :class="{'del_show':confirmFlag}">
      <h2 class="posi_alert-title">警告!</h2>
      <h5 class="posi_alert-conten">您即将删除此商品?</h5>
      <div class="posi_alert-btn">
        <button class="posi_alert-A" @click="yes_del()">删除</button>
        <button class="posi_alert-A" @click="no_del()">不要</button>
      </div>
    </div>
    <!--END-->
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    props: ['sendValue'],
    name: "BMS",
    data() {
      return {
        confirmFlag: false,
        productIdTip: '',
        addAddressFlag: false,
        confirmFlag_upload: false,
        file: '',
        src: '',
        //新增商品表单数据
        productName: '',
        productOldPrice: '',
        roductPrice: '',
        productId: '',
        productTip: '',
        productImg: '',
        sender: '',

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

        land_suc_secon_flag:false

      }
    },
    mounted() {

    },
    components: {},
    computed: {},
    methods: {
      init() {
        axios.post("/admin/goods").then((response) => {
          let res = response.data;
          this.sendValue = res.result;
        })
      },
      showConfirm(productId) {
        this.confirmFlag = true;
        // var productId=productId;
        this.productIdTip = productId
        // @click="removeData(item.productId)"
      },
      removeData(productId) {
        let _this = this;
        axios.post("/admin/removedata", {
          productId: productId
        }).then((response) => {
          let res = response.data;
          console.log(res);
          if (res.status === '0') {
            console.log(res);
            _this.init();
          }
        })
      },
      no_del() {
        this.confirmFlag = false;
        this.confirmFlag_upload = false;
        this.addAddressFlag = false;

      },
      yes_del() {
        let _this=this;
        _this.confirmFlag = false;
        _this.confirmFlag_upload = false;
        _this.addAddressFlag = false;

        _this.removeData(_this.productIdTip);

        _this.land_suc_secon_flag=true;

        setTimeout(function () {
          _this.land_suc_secon_flag=false;
        },2000)
      },
      uploadBtn() {
        this.addAddressFlag = true;
        this.confirmFlag_upload = true;
      },
      //上传商品
      uploadMet() {
        this.addAddressFlag = false;
        this.confirmFlag_upload = false;
        setTimeout(function () {
          this.init();
        }, 1000)

      },
      uploading(event) {
        this.file = event.target.files[0];//获取文件
        let windowURL = window.URL || window.webkitURL;
        this.file = event.target.files[0];
        //创建图片文件的url
        this.src = windowURL.createObjectURL(event.target.files[0]);
      },
      submit() {
        event.preventDefault();//取消默认行为
        let formdata = new FormData();
        formdata.append('file', this.file);
//此处必须设置为  multipart/form-data

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
          }
        };
        this.$http.post('/admin/uploadgoods', formData, config).then((res) => {
          // console.log(res);
          let resp = res.data;
          // console.log(resp);
          //做处理
        }).catch((error) => {   //捕获异常


        });
      },
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
          axios.post("/admin/updateId", {
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
          axios.post("/admin/updateTip", {
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
          axios.post("/admin/updateName", {
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
          axios.post("/admin/updateOldPrice", {
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
          axios.post("/admin/updatePrice", {
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
  /*input{*/
  /*font-size: 0;*/
  /*}*/
  /*input::-webkit-file-upload-button {*/
  /*background: #efeeee;*/
  /*color: #333;*/
  /*border: 0;*/
  /*padding: 40px 100px;*/
  /*border-radius: 5px;*/
  /*font-size: 12px;*/
  /*box-shadow: 1px 1px 5px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.12);*/
  /*}*/
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #FFFFFF;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #FFFFFF;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #FFFFFF;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #FFFFFF;
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

  .sw_one {
    width: 100%;
    height: 46px;
    border-bottom: 2px solid #f5f5f5;
  }

  .data_length {
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

  .data_length h4 {
    line-height: 50px;
    text-align: center;
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
    /*background: #8b8b8b;*/
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
    width: 103%;
    height: 448px;
    /*background: #000;*/
    overflow-y: scroll;
    /*margin-left: 26px;*/
  }

  .sc_ul-li-edit {
    z-index: 10000000;
    width: 130px;
    height: 100px;
    /*background: #f16f75;*/
    position: absolute;
    top: 50px;
    /*top: 40px;*/
    left: 10px;
    visibility: hidden;
    border-radius: 6px;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
    opacity: 0;
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

  .sth_contain-ul li:hover {
    background: #e6e6e6;
  }

  /*提示框*/
  .mask_del {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    opacity: 0;
    transition-duration: .3s;
    visibility: hidden;
    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
  }

  .posi_alert {
    position: fixed;
    left: 41.6%;
    top: 32%;
    width: 248px;
    height: 122px;
    background: #FFFFFF;
    border-radius: 4px;
    padding: 12px;
    transition-duration: .3s;
    opacity: 0;
    visibility: hidden;
  }

  .posi_alert-title {
    /*background: #8bc34a;*/
    font-size: 20px;
    color: #C54D54;
    border-bottom: 1px dashed #D9534F;
    padding: 0 0 10px 0;
  }

  .posi_alert-conten {
    padding: 16px 0;
    text-indent: 20px;
    /*background: #000;*/
  }

  .posi_alert-btn {
    width: 100%;
    height: 30px;
    /*background: #dd3e3e;*/
    float: right;
  }

  .posi_alert-A {
    width: 50%;
    float: left;
    height: 34px;
    background: none;
    border-radius: 4px;
    -webkit-transition: .2s;
    -moz-transition: .2s;
    -ms-transition: .2s;
    -o-transition: .2s;
    transition: .2s;
    cursor: pointer;
  }

  .posi_alert-btn button:nth-child(1) {
    color: #868795;

  }

  .posi_alert-btn button:nth-child(1):hover {
    background: #C54D54;
    color: #FFFFFF;
  }

  .posi_alert-btn button:nth-child(1):active {
    background: #6e3537;
  }

  .posi_alert-btn button:nth-child(2) {
    color: #868795;
  }

  .posi_alert-btn button:nth-child(2):hover {
    background: #ff9997;
    color: #FFFFFF;
  }

  .posi_alert-btn button:nth-child(2):active {
    background: #955655;
  }

  /*END*/
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

  .addressAlert {
    width: 800px;
    height: 640px;
    background: #FFFFFF;
    position: fixed;
    top: 4%;
    left: 20%;
    border-radius: 10px;
    transition-duration: .3s;
    visibility: hidden;
    opacity: 0;

  }

  .add_close {
    width: 100%;
    height: 30px;
    padding: 10px 0 0 0;
    /*background: #ee7a23;*/
    border-radius: 10px 10px 0 0;
  }

  .add_close-img {
    float: right;
    margin-right: 10px;

  }

  .add_close .icon {
    color: #f86060;
  }

  .add_form {
    width: 100%;
    /*height: 400px;*/
    background: #FFFFFF;
    margin: 50px auto;
  }

  .add_form-h1 {
    font-size: 30px;

    text-align: left;
    font-weight: bold;
    /*background: #cdffbd;*/
    /*padding-bottom: 20px;*/
    padding-bottom: 4px;
    margin-left: 13px;
    color: #F45859;
    border-bottom: 2px solid #F45859;
    width: 97%;

    /*position: absolute;*/

  }

  .add_form-ul-li {
    float: none;
    height: 40px;
    width: 100%;
    /*background: #6e3537;*/
    margin-top: 18px;
  }

  .add_form-ul li:nth-child(1) {
    width: 100%;
    /*height: 200px;*/
    /*background: #8a8a8a;*/
  }

  .add_form-ul li:last-child {
    margin: 20px auto;
    width: 22%;
    /*background: #000;*/
  }

  .A5 {
    display: inline-block;
    font-size: 14px;
    /*background: #58d7c0;*/
    height: 100%;
    width: 16%;
    line-height: 34px;
    text-align: right;
    float: left;
    font-weight: bolder;
    color: #797072;
  }

  /*#797072  #8a8f91*/
  .newProduct {
    /*font: inherit;*/
    font-size: 12px;
    text-align: center;
    display: block;
    width: 67%;
    height: 34px;
    float: left;
    margin-left: 6px;
    background: #8a8f91;
    color: #FFFFFF;
    border-radius: 4px;
    /*border: 1px solid #31B0D5;*/
    letter-spacing: 2px;
  }

  .newProduct:focus {
    border-color: #F45859;
  }

  .add_form-btn {
    width: 50%;
    height: 50px;
    margin: 30px auto;

    /*background: #000;*/
  }

  .add_form-btn button {
    width: 30%;
    height: 80%;
    background: #8a8f91;
    margin-left: 51px;
    border-radius: 4px;
    color: #FFFFFF;
    letter-spacing: 2px;
    cursor: pointer;
    transition-duration: .3s;
  }

  .add_form-btn button:hover {
    background: #F45859;
  }

  .add_form-btn button:active {
    background: #ff9997;
  }

  .conten_wrap {
    width: 100%;
    height: 400px;
    background: #f5f7fc;
    /*margin-top: 20px;*/
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

  .sc_ul-li-edit_ani {
    background: #ff8600;
    visibility: visible;
    top: 40px;
    opacity: 1;
  }

  .triangle {
    position: absolute;
    top: -20px;
    left: 35px;
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

  .land_suc {
    position: absolute;
    top: -35px;
    left: 46.7%;
    /*background: #ff8600;*/
    width: 100px;
    height: 35px;
    border-radius: 4px;
    box-shadow: 0 0 40px #c8c8c8;
    transition-duration: .3s;
    opacity: 0;
    visibility: hidden;
  }

  .land_suc_secon {
    top: 11px;
    opacity: 1;
    visibility: visible;
  }

  .ls_svg {
    float: left;
    width: 28%;
    height: 100%;
    /*background: #000;*/
    text-align: center;
    line-height: 31px;
  }

  .ls_svg .icon {
    font-size: 13px;
  }

  .ls_text {
    float: left;
    width: 72%;
    height: 100%;
    /*background: #4FC1F0;*/
    font-size: 13px;
    line-height: 32px;
  }
</style>













































