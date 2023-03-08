<template>
  <aside>
      <a href="https://marta-ng.com/audio-katalog/" class='aside-logo'>
        <img src="@/assets/images/sidebar-img.png" alt="logo" class="brand-logo"/>
      </a>
      <div class="aside-menu-wrapper">
        <a target="_blank" class="aside-menu-btn" href="/audio-katalog/">Официальный сайт</a>
        <a target="_blank" class="aside-menu-btn" href="https://t.me/marta_ng/">ТЕЛЕГРАМ</a>
        <a target="_blank" class="aside-menu-btn" href="https://zen.yandex.ru/marta_ng">Яндекс-Дзен</a>
        <a target="_blank" class="aside-menu-btn" href="https://marta-ng.com/zhenskii_zhurnal_d/">Женский Журнал</a>
        <a target="_blank" class="aside-menu-btn" style="border-top: 1px dashed #c09d52" href="https://marta-ng.ru/mini-site/">техподдержка</a>
      </div>
      <div class="l" @click="increment"></div>
    </aside>
</template>

<script>
export default {
  name: 'app-idebar',
  data(){
    return {
      count: 0
    }
  },
  methods: {
    increment(){
      this.count++
      if(this.count >= 5) {
        this.$router.push('/admin_1225')
      }
    }
  }
}
</script>

