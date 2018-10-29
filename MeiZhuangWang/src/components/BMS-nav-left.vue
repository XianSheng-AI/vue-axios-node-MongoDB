<template>
  <div class="pos">
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
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==2}" @click="haveAniFlag=2">
              <div class="nl-list-svg">
                <svg class="icon icon-chanpin">
                  <use xlink:href="#icon-chanpin"/>
                </svg>
              </div>
              <strong class="nl-list-ul-li-text">
                当月畅销
              </strong>
            </li>
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==3}" @click="haveAniFlag=3">
              <div class="nl-list-svg">
                <svg class="icon icon-huazhuangpin3">
                  <use xlink:href="#icon-huazhuangpin3"/>
                </svg>
              </div>
              <strong class="nl-list-ul-li-text">
                美妆套装
              </strong>
            </li>
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==4}" @click="haveAniFlag=4,currentTab('goods')">
              <div class="nl-list-svg">
                <svg class="icon icon-huazhuangpin8">
                  <use xlink:href="#icon-huazhuangpin8"/>
                </svg>
              </div>
              <strong class="nl-list-ul-li-text">
                官方产品
              </strong>
            </li>
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==5}" @click="haveAniFlag=5">
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

            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==7}" @click="haveAniFlag=7">
              <div class="nl-list-svg">
                <svg class="icon icon-yinliaotigong">
                  <use xlink:href="#icon-yinliaotigong"/>
                </svg>
              </div>
              <strong class="nl-list-ul-li-text">
                供应商
              </strong>
            </li>
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==8}" @click="haveAniFlag=8">
              <div class="nl-list-svg">
                <svg class="icon icon-yinliaotigong">
                  <use xlink:href="#icon-yinliaotigong"/>
                </svg>
              </div>
              <strong class="nl-list-ul-li-text">
                供应商
              </strong>
            </li>
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==9}" @click="haveAniFlag=9">
              <div class="nl-list-svg">
                <svg class="icon icon-yinliaotigong">
                  <use xlink:href="#icon-yinliaotigong"/>
                </svg>
              </div>
              <strong class="nl-list-ul-li-text">
                供应商
              </strong>
            </li>
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==10}" @click="haveAniFlag=10">
              <div class="nl-list-svg">
                <svg class="icon icon-yinliaotigong">
                  <use xlink:href="#icon-yinliaotigong"/>
                </svg>
              </div>
              <strong class="nl-list-ul-li-text">
                供应商
              </strong>
            </li>
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==11}" @click="haveAniFlag=11">
              <div class="nl-list-svg">
                <svg class="icon icon-yinliaotigong">
                  <use xlink:href="#icon-yinliaotigong"/>
                </svg>
              </div>
              <strong class="nl-list-ul-li-text">
                供应商
              </strong>
            </li>
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==12}" @click="haveAniFlag=12">
              <div class="nl-list-svg">
                <svg class="icon icon-yinliaotigong">
                  <use xlink:href="#icon-yinliaotigong"/>
                </svg>
              </div>
              <strong class="nl-list-ul-li-text">
                供应商
              </strong>
            </li>
            <li class="nl-list-ul-li" :class="{'haveAni showColor':haveAniFlag==13}" @click="haveAniFlag=13">
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

  </div>
</template>

<script>
  export default {
    name: "BMS",
    data() {
      return {
        haveAniFlag:0
      }
    },
    mounted() {

    },
    components: {},
    computed: {},
    methods: {
      currentTab(msg){
        if(msg==='goods'){
          // alert(666)
          this.$emit("ievent")
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
    /*color: #bfadad;*/
  }
  .pos{
    width: 13%;
  }
.nav_left{
  /*width: 13%;*/
  height: 740px;
  background: #d4d4d4;
}
  .nl-logo{
    width: 100%;
    height: 60px;
    background: #f18200;
  }
  .nl-logo-icon{
    width: 30px;
    height: 30px;
    /*background: #5a5bff;*/
    float: left;
    margin: 14px 10px 0 40px;
  }
  .nl-logo-icon .icon{
    color: #FFFFFF;
    font-size: 28px;
  }
  .nl-logo b{
    color: #FFFFFF;
    font-size: 22px;
    font-weight: bolder;
    line-height: 55px;
    letter-spacing: 2px;
  }
  .nl-list{
    width: 100%;
    height: 680px;
    background: #33383e;
  }
  .nl-list-ul-li{
    cursor: pointer;
    width: 100%;
    height: 50px;
    background: #33383e;
  }
  .nl-list-ul-li:hover {
    background: #1d1d1d;
  }
  .nl-list-ul-li:hover .icon,.nl-list-ul-li-text{
    color: #f18200;
  }
  .nl-list-ul-li:hover .nl-list-ul-li-text{
    color: #f18200;
  }


  .nl-list-svg{
    width: 20px;
    height: 20px;
    float: left;
    margin: 14px 10px 0 48px;
  }
  .nl-list-svg .icon{
    color: #ebedee;
  }
  .nl-list-ul-li-text{
    color: #ebedee;
    line-height: 48px;
    font-size: 14px;

  }
  .showColor .icon,strong{
    color: #f18200;
  }
  .showColor strong{
    color: #f18200;
  }
  /*.showColor{*/
    /*color: #f18200;:import;*/
  /*}*/
  .haveAni{
    background: #1d1d1d;
  }
</style>
