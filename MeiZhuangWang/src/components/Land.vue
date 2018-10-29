<template>
  <div>
    <div :class="{'over_hiden_':langFlag}" @click="closeLand()"></div>
<div class="land-posi" :class="{'land-tip':langFlag}">
  <div class="login-form">
    <div class="close" @click="closeLand()"> </div>
    <div class="clear"> </div>
    <form>
      <input type="text" autocomplete="off" v-model="userName" class="text" value="用户名" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '用户名';}" >
      <div class="key">
        <input type="password" autocomplete="off" v-model="userPwd" class="paw" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}">
      </div>
    </form>
    <div class="signin">
      <button class="signin-btn" @click="login()">
        <svg class="icon icon-denglu" aria-hidden="true">　　
          <use xlink:href="#icon-denglu"></use>
        </svg>
      </button>
    </div>
  </div>
</div>
  </div>
</template>

<script>
  import '../assets/css/shortcode/style.css'
  import axios from "axios"
    export default {
        name: "Land",
      props:['langFlag'],
      data(){
          return {
            langFlag:false,
            userName:'',
            userPwd:'',
            pl_land:false
          }
      },
      methods:{
        closeLand(){
          // alert(7);
          // this.langFlag=false;
          this.$emit("close");
        },
        login(){
            axios.post('products/login',{
              userName:this.userName,
              userPwd:this.userPwd
            }).then((response)=>{
              let res=response.data;
              if(res.status=='0'){
                // alert(5)
                this.userName=res.result.userName;
                // console.log(this.userName)
                // this.langFlag=false;
                this.$emit("userName",this.userName);
                this.$emit("close");
                this.$emit("cartList");
              }else{
                // console.log(787878);
              }
            })
        }
      },
  }
</script>

<style scoped>
.land-posi{
  width: 100%;
  position: fixed;
  /*background: #000;*/
  top: 6%;
  left: 0;
  z-index: 100000000000000;
  opacity: 0;
  visibility: hidden;
  transition-duration: .5s;
}
.land-tip{
  opacity: 1;
  top: 29%;
  -moz-transition-timing-function: ease-in-out;
  transition-duration: .5s;
  visibility: visible;
  z-index: 100000000000000000;
}
  .over_hiden_{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    z-index: 100000000000000;
    -webkit-transition: .4s;
    -moz-transition: .4s;
    -ms-transition: .4s;
    -o-transition: .4s;
    transition: .4s;
  }
  .signin-btn{
    width: 100%;
    /*padding: 1px 0;*/
    background: #A83344;
    -webkit-transition: .4s;
    -moz-transition: .4s;
    -ms-transition: .4s;
    -o-transition: .4s;
    transition: .4s;
    cursor: pointer;

  }
.signin-btn:hover{
  background: #2b8aa5;
}
.signin-btn .icon{
  font-size: 60px;
}
</style>
