<template>
  <div class="nav_top-f">
    <div class="nav_top">
        <div class="nav_top-left">
          <div class="nav_top-left-img">
            <img :src="'../../static/img/head-img/'+leimg" alt="">
          </div>
          <h6>欢迎登陆</h6>
          <h6>{{leName}}</h6>
        </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "BMS",
    data() {
      return {
        leName:'',
        leimg:''
      }
    },
    mounted() {
      this.initLevelUser();
    },
    components: {},
    computed: {},
    methods: {
      initLevelUser(){
        axios.post("/admin/leUser").then((respose)=>{
          let res=respose.data;
          if(res.status==='0'){
            // console.log(res)
            this.leName=res.result.leName;
            this.leimg=res.result.leimg;
          }else{
            alert("err")
          }
        })
      }
    }
  }
</script>

<style scoped>

.nav_top-f{
  float: right;
  width: 87%;
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
  .nav_top{
    /*width: 82%;*/
    height: 60px;
    background: #FFFFFF;
  }
  .nav_top-left{
    width: 150px;
    height: 40px;
    /*background: #58d7c0;*/
    float: left;
    margin: 10px 0 0 20px;
  }
  .nav_top-left h6{
    line-height: 18px;
    font-size: 10px;
    color: #8b8b8b;
  }
.nav_top-left h6:nth-child(3){
  color: #5e5e5e;
}
.nav_top-left h6:nth-child(2){
  margin-top: 2px;
}
  .nav_top-left-img{
    overflow: hidden;
    width: 30px;
    height: 30px;
    background: #5a5bff;
    margin: 5px 8px 0 15px;
    float: left;
    border-radius: 100%;

  }
</style>
