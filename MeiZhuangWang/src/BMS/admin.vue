<template>
  <div class="BMS-bg">
    <div class="admin">
      <!--左边栏-->
      <div class="pos fl">
        <div class="nav_left">
          <div class="nl-logo">
            <div class="nl-logo-icon">
              <svg class="icon icon-houtaiguanli">
                <use xlink:href="#icon-houtaiguanli"/>
              </svg>
            </div>
            <b>美妆网</b>
          </div>
          <!--列表选项-->
          <div class="nl-list">
            <ul class="nl-list-ul">
              <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==1,}" @click="haveAniFlag=1">
                <div class="nl-list-svg">
                  <svg class="icon icon-yqdz_nblt">
                    <use xlink:href="#icon-yqdz_nblt"/>
                  </svg>
                </div>
                <strong class="nl-list-ul-li-text">
                  内部人员
                </strong>
              </li>
              <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==2}"
                  @click="haveAniFlag=2;currTab('sellwell')">
                <div class="nl-list-svg">
                  <svg class="icon icon-chanpin">
                    <use xlink:href="#icon-chanpin"/>
                  </svg>
                </div>
                <strong class="nl-list-ul-li-text">
                  当月畅销
                </strong>
              </li>
              <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==3}"
                  @click="haveAniFlag=3;currTab('suits')">
                <div class="nl-list-svg">
                  <svg class="icon icon-huazhuangpin3">
                    <use xlink:href="#icon-huazhuangpin3"/>
                  </svg>
                </div>
                <strong class="nl-list-ul-li-text">
                  美妆套装
                </strong>
              </li>
              <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==4}"
                  @click="haveAniFlag=4;currTab('goods')">
                <div class="nl-list-svg">
                  <svg class="icon icon-huazhuangpin8">
                    <use xlink:href="#icon-huazhuangpin8"/>
                  </svg>
                </div>
                <strong class="nl-list-ul-li-text">
                  官方产品
                </strong>
              </li>
              <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==5}"
                  @click="haveAniFlag=5;currTab('OM')">
                <div class="nl-list-svg">
                  <svg class="icon icon-dingdan">
                    <use xlink:href="#icon-dingdan"/>
                  </svg>
                </div>
                <strong class="nl-list-ul-li-text">
                  订单管理
                </strong>
              </li>
              <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==6}" @click="haveAniFlag=6">
                <div class="nl-list-svg">
                  <svg class="icon icon-yinliaotigong">
                    <use xlink:href="#icon-yinliaotigong"/>
                  </svg>
                </div>
                <strong class="nl-list-ul-li-text">
                  供应商
                </strong>
              </li>

            </ul>
          </div>
        </div>
        <!---->
      </div>
      <!--提示管理员登陆成功-->
      <div class="land_suc" :class="{'land_suc_secon':land_suc_secon_flag}">
        <div class="ls_svg">

          <svg class="icon icon-duigou1">
            <use xlink:href="#icon-duigou1"/>
          </svg>

        </div>
        <div class="ls_text">登陆成功</div>
      </div>
      <!--END-->
      <!--提示管理员级别-->
      <div class="tip_level" :class="{'tl_text_ani':tl_text_ani_flag}">
        <div class="tl_svg">

          <svg class="icon icon-duihao1">
            <use xlink:href="#icon-duihao1"/>
          </svg>

        </div>
        <div class="tl_text">
          <h4>欢迎使用美妆后台</h4>
          <h5>你的账户权限是admin</h5>
          <h5>同学们喜欢的话多打些分,感激不尽噢！</h5>
        </div>
      </div>
      <!--END-->
      <!--头部-->
      <bmsnavtop class="fr"></bmsnavtop>
      <div class="box">
        <keep-alive>
          <component v-bind:is="currentTabComponent" v-bind:sendValue="Data">
          </component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  import "./../assets/css/BMScss/admin.css"
  import bmsnavleft from "./../components/BMS-nav-left"
  import bmsnavtop from "./../components/BMS-nav-top"
  import BMSsellwell from "./../components/BMS-sellwell"
  import BMSgoods from "./../components/BMS-goods"
  import BMSsuits from "./../components/BMS-suits"
  import BMSomg from "./../components/BMS-OrderManagement"


  import axios from "axios"


  export default {
    name: "BMS",
    data() {
      return {
        currentTab: 'sellwell',
        tabst: ['sellwell', 'goods', 'suits', 'omg'],
        haveAniFlag: 0,
        goodsData: [],
        Data: [],
        land_suc_secon_flag: false,
        tl_text_ani_flag: false
      }
    },
    mounted() {
      this.land_();
    },
    components: {
      BMSsellwell,
      bmsnavleft,
      bmsnavtop,
      BMSgoods,
      BMSsuits,
      BMSomg
    },
    computed: {
      currentTabComponent: function () {
        return 'BMS' + this.currentTab.toLowerCase();
      }
    },
    methods: {
      land_() {
        let _this = this;

        setTimeout(function () {
          _this.land_suc_secon_flag = true;

          setTimeout(function () {
            _this.land_suc_secon_flag = false;
            _this.tl_text_ani_flag = true;
          }, 2000)
          setTimeout(function () {
            _this.tl_text_ani_flag = false;
          }, 5000)
        }, 900)
      },

      currTab(msg) {
        let fla = msg;
        switch (fla) {
          case 'goods':                      //官方产品
            this.currentTab = this.tabst[1];
            axios.post("/admin/goods").then((response) => {
              let res = response.data;
              if (res.status === '0') {
                this.goodsData = res.result;
                this.Data = res.result;
              }
            });
            break;
          case 'suits':                      //美妆套装
            this.currentTab = this.tabst[2];
            axios.post("/admin/suits").then((response) => {
              let res = response.data;
              if (res.status === '0') {
                this.goodsData = res.result;
                this.Data = res.result;
              }
            });
            break;
          case 'sellwell':                   //畅销
            this.currentTab = this.tabst[0];
            axios.post("/admin/sellwell").then((response) => {
              let res = response.data;
              if (res.status === '0') {
                this.goodsData = res.result;
                this.Data = res.result;
              }
            });
            break;
          case 'OM':                   //畅销
            this.currentTab = this.tabst[3];

            axios.post("/admin/ordermanagement").then((response) => {

              let res = response.data;

              console.log(res);
              if (res.status === '0') {
                this.goodsData = res.result;
                this.Data = res.result;
              }
            });
            break;
          default:
            return;
        }
      }
    }
  }
</script>

<style scoped>
  .BMS-bg {
    background: #f5f5f5;
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

  .tip_level {
    z-index: 1000000000000000000;
    width: 300px;
    height: 80px;
    background: #ffffff;
    position: absolute;
    right: -300px;
    top: 30px;
    box-shadow: 0 0 20px #dddddd;
    border-radius: 4px;
    border-left: 4px solid;
    border-color: #18cb4b;
    opacity: 0;
    visibility: hidden;
    transition-duration: .3s;
  }

  .tl_svg {
    float: left;
    width: 18%;
    height: 100%;
    /*background: #5a5bff;*/
    text-align: center;
    line-height: 66px;
  }

  .tl_svg .icon {
    color: #18cb4b;
    font-size: 28px;

  }

  .tl_text {
    letter-spacing: 1px;
    float: left;
    width: 70%;
    height: 74%;
    /*background: #f53743;*/
    padding-top: 10px;
  }

  .tl_text h4 {
    font-weight: bolder;
    font-size: 14px;
    padding-bottom: 2px;
  }

  .tl_text h5 {
    color: #7e7e7e;
    font-size: 10px;
    font-weight: bolder;
    margin-top: 4px;
  }

  .tl_text_ani {
    right: 10px;
    opacity: 1;
    visibility: visible;
  }

  /*.tl_text h5:nth-child(2){*/
  /**/
  /*}*/
  .box {
    width: 85.4%;
    height: 640px;
    /*background: #5a5bff;*/
    position: absolute;
    top: 72px;
    right: 12px;
    border-radius: 10px 10px 0 0;
    /*overflow: hidden;*/
    background: #FFFFFF;

  }

  .fl {
    display: inline-block;
  }

  .fr {
    /*float: right;*/
    /*clear: left;*/
    /*display: inline-block;*/
  }

  .posi {
    position: absolute;
    top: 0;
    right: 0;
  }

  /*左边栏*/
  .pos {
    width: 13%;
  }

  .nav_left {
    /*width: 13%;*/
    height: 740px;
    background: #d4d4d4;
  }

  .nl-logo {
    width: 100%;
    height: 60px;
    background: #f18200;
  }

  .nl-logo-icon {
    width: 30px;
    height: 30px;
    /*background: #5a5bff;*/
    float: left;
    margin: 14px 10px 0 40px;
  }

  .nl-logo-icon .icon {
    color: #FFFFFF;
    font-size: 28px;
  }

  .nl-logo b {
    color: #FFFFFF;
    font-size: 22px;
    font-weight: bolder;
    line-height: 55px;
    letter-spacing: 2px;
  }

  .nl-list {
    width: 100%;
    height: 698px;
    background: #33383e;
  }

  .nl-list-ul-li {
    cursor: pointer;
    width: 100%;
    height: 50px;
    background: #33383e;
  }

  .nl-list-ul-li:hover {
    background: #1d1d1d;
  }

  .nl-list-ul-li:hover .icon, .nl-list-ul-li-text {
    color: #f18200;
  }

  .nl-list-ul-li:hover .nl-list-ul-li-text {
    color: #f18200;
  }

  .nl-list-svg {
    width: 20px;
    height: 20px;
    float: left;
    margin: 14px 10px 0 48px;
  }

  .nl-list-svg .icon {
    color: #ebedee;
  }

  .nl-list-ul-li-text {
    color: #ebedee;
    line-height: 48px;
    font-size: 14px;

  }

  .showColor .icon, strong {
    color: #f18200;
  }

  .showColor strong {
    color: #f18200;
  }

  /*.showColor{*/
  /*color: #f18200;:import;*/
  /*}*/
  .haveAni {
    background: #1d1d1d;
  }

</style>
