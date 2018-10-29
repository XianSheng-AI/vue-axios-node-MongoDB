<template>
  <div>

    <div class="login-bg">
      <div class="yuan"></div>
    </div>
    <div class="bms-form" :class="{'bms_form_ani':bms_form_flag}">
      <h4>管理员登陆</h4>
      <div class="A10 userName_inp">
        <div class="user-svg">

          <svg class="icon icon-icon-test24" aria-hidden="true">　　
            <use xlink:href="#icon-icon-test24"></use>
          </svg>

        </div>
        <div class="user-inp">

          <input type="text" id="text" placeholder="请输入用户" v-model="userName">

        </div>
      </div>
      <div class="A10 userPwd_inp">

        <div class="user-svg">

          <svg class="icon icon-mima4" aria-hidden="true">　　
            <use xlink:href="#icon-mima4"></use>
          </svg>

        </div>
        <div class="user-inp">


          <input type="password" placeholder="请输入密码" v-model="userPwd">

        </div>

      </div>

      <!--提交登录请求按钮-->
      <button class="bms_submit" v-if="!bms_submit_falg" @click="admin_login()" >
        登陆
      </button>
      <button class="bms_submit" :class="{'bms_submit_ani':bms_submit_falg}" v-if="bms_submit_falg">
        <img src="./../../static/loading-svg/puff.svg" alt="">
      </button>

    </div>
    <!--提示无此用户-->
    <div class="no_leName" :class="{'no_leName_ani':no_leName_ani_flag}">
      <div class="nl_svg">

        <svg class="icon icon-warning1" aria-hidden="true">　　
          <use xlink:href="#icon-warning1"></use>
        </svg>

      </div>
      <div class="nl_text">账号或密码错误!</div>
    </div>
    <!--END-->
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "BMS-Login",
    data() {
      return {
        bms_form_flag:false,

        bms_submit_falg: false,

        userName: '',
        userPwd: '',

        aaa:'sff',

        no_leName_ani_flag:false


      }
    },
    components: {},
    mounted() {
this.initAni();
    },
    computed: {},
    methods: {
      initAni(){
        let _this=this;
        setTimeout(function () {
          _this.bms_form_flag=true;
        },1000)
      },

      admin_login() {
        let _this = this;
        _this.bms_submit_falg = true;
        axios.post("/loginBms/logins", {
          leName: _this.userName,
          lePwd: _this.userPwd,
        }).then((respose) => {
          let res = respose.data;
          if (res.status === 'YES') {
            // console.log(res);
            setTimeout(function () {
              _this.bms_submit_falg = false;
              _this.$router.push({
                path:"BMS"
              })
            }, 3000)
          } else {
            setTimeout(function () {
              _this.bms_submit_falg = false;
              _this.no_leName_ani_flag=true;
              setTimeout(function () {
                _this.no_leName_ani_flag=false;
              },3000)
            }, 3000)

          }
        })
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

  .login-bg {
    overflow: hidden;
    width: 100%;
    height: 759px;
    background: #3e3b52;
  }

  .yuan {
    width: 100%;
    height: 200%;
    background: #f36273;
    margin: -200px 0 0 300px;
    border-radius: 720px;
  }

  .bms-form {
    /*width: 300px;*/
    /*height: 500px;*/
    width: 200px;
    height: 350px;
    padding: 50px 45px;
    background: #3e3b52;
    position: absolute;
    top: 20%;
    left: 48%;
    /*left: 42%;*/
    box-shadow: 0 0 80px #6e6e6e;
    /*transition-duration: .4s;*/
    transition-duration: 1.8s;
    opacity: 0;
  }

  .bms-form h4 {
    letter-spacing: 2px;
    font-size: 20px;
    color: #FFFFFF;
    /*background: #55a532;*/
    padding-bottom: 70px;
  }

  .A10 {
    width: 100%;
    height: 45px;
    margin-top: 10px;
    /*background: #e4393c;*/
    border-bottom: 2px solid #737583;

  }

  .user-svg {
    width: 16%;
    height: 95%;
    /*background: #000;*/
    line-height: 43px;
    float: left;
  }

  .user-svg .icon {

  }

  .user-inp {
    float: left;
    width: 84%;
    height: 98%;
    /*background: #000;*/
  }

  .user-inp input {
    letter-spacing: 2px;
    color: #9b9b9b;
    /*line-height: 48px;*/
  }

  .bms_submit {

    margin-top: 74px;
    width: 100%;
    /*width: 20%;*/
    height: 45px;
    /*height: 40px;*/
    background: #242234;
    border-radius: 28px;
    color: #FFFFFF;
    line-height: 45px;
    text-align: center;
    font-size: 18px;
    letter-spacing: 4px;
    -webkit-transition: .8s;
    -moz-transition: .8s;
    -ms-transition: .8s;
    -o-transition: .8s;
    transition: .8s;
    cursor: pointer;
  }

  .bms_submit:hover {
    background: #131122;
  }

  .bms_submit_ani {
    width: 20%;
    height: 40px;
  }

  .bms_form_ani {
    opacity: 1;
    transform: translateX(-120px);
  }
  .no_leName{
    width: 160px;
    height: 40px;
    position: absolute;
    top: -40px;
    /*top: 14px;*/
    left: 44.5%;
    background: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0 0 20px #949494;
    visibility: hidden;
    opacity: 0;
    transition-duration: .6s;
  }
  .no_leName_ani{
    top: 14px;
    visibility: visible;
    opacity: 1;
  }
  .nl_svg{
    width: 20%;
    height: 100%;
    /*background: #949494;*/
    float: left;
    line-height: 39px;
    text-align: center;
  }
  .nl_svg .icon{
    color: #3e3b52;
  }
  .nl_text{
    line-height: 36px;
    width: 80%;
    height: 100%;
    /*background: #a71d5d;*/
    float: left;
  }
</style>






































