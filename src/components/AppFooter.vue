<template>
  <footer :id="!isAdmin ? 'footer' : ''">
    <div class="max960">
      <div class="row">
        <div class="footer-item left">
          <span>Бесплатный звонок по России <a href="tel:8 800 350 79 63">8 800 350 79 63</a> </span>
          <span>MARTA-NG ©Все права защищены</span>
        </div>
        <div class="footer-item right">
          <a class="footer__item-img z" href="https://zen.yandex.ru/marta_ng/"></a>
          <a class="footer__item-img youtube1" href="https://www.youtube.com/channel/UCcAXS8DjSnp1k1l_Q2f4JEQ"></a>
          <a class="footer__item-img telegram" href="https://t.me/marta_ng/"></a>
          <a class="footer__item-img logo5" href="https://marta-ng.com/zhenskii_zhurnal_d/"></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    isAdmin() {
      return  this.$route.name !== 'admin' && this.$route.name !== 'gift_1' && this.$route.name !== 'gift_2' && this.$route.name !== 'create'
    }
  },
}

</script>
