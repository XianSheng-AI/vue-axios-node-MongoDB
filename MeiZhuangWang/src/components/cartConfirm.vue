<template>
  <div>
    <!--<div class="cart-confirm" :class="{'md-show':mdShow}">-->
    <div class="f5_cart" :class="{'f5_cart_animate':scrollFlag}">
      <!--</div>-->
      <div class="checkout" :class="{'checkout--active':closeFlag}">
        <a class="checkout__button" @click="closeFlag=true" href="javascript:;"><!-- Fallback location -->
          <span class="checkout__text">
							<span class="checkout__text-inner checkout__initial-text" :class="{'aaa':closeFlag}">购物车</span>
							<span class="checkout__text-inner checkout__final-text">$40.70
                <svg class="icon icon-cart" aria-hidden="true">
              <use xlink:href="#icon-cart"></use>
            </svg>
              </span>
						</span>
        </a>
        <div class="checkout__order">
          <div class="checkout__order-inner">
            <table class="checkout__summary">
              <thead>
              <tr>
                <th>商品</th>
                <th>数量</th>
                <th>价格</th>
                <th>&nbsp;</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Imitations <span>Mark Lanegan</span></td>
                <td>1</td>
                <td>$12.90</td>
                <td>
                  <button class="checkout__action">
                    <svg class="icon icon-lajixiang1" aria-hidden="true">　　
                      <use xlink:href="#icon-lajixiang1"></use>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Out Of Exile <span>Audioslave</span></td>
                <td>1</td>
                <td>$15.90</td>
                <td>
                  <button class="checkout__action">
                    <svg class="icon icon-lajixiang1" aria-hidden="true">　　
                      <use xlink:href="#icon-lajixiang1"></use>
                      　　
                    </svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Cure For Pain <span>Morphine</span></td>
                <td>1</td>
                <td>$11.90</td>
                <td>
                  <button class="checkout__action">
                    <svg class="icon icon-lajixiang1" aria-hidden="true">　　
                      <use xlink:href="#icon-lajixiang1"></use>
                    </svg>
                  </button>
                </td>
              </tr>
              </tbody>
            </table><!-- /checkout__summary -->
            <button class="checkout__close checkout__cancel" @click="checkBtn()">
              <svg class="icon icon-guanbi2" aria-hidden="true">　　
                <use xlink:href="#icon-guanbi2"></use>
              </svg>
            </button>
          </div><!-- /checkout__order-inner -->
        </div><!-- /checkout__order -->
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    props: ["mdShow"],
    name: "cartConfirm",
    data() {
      return {
        closeFlag: false,
        scrollFlag: false,
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    computed:{

    },
    methods: {
      checkBtn() {
        this.closeFlag = false;
      },
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >=2000) {
          this.scrollFlag = true
        } else {
          this.scrollFlag = false
        }
      },
    }
  }
</script>

<style scoped>

</style>
