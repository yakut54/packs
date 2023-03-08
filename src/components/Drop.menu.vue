<template>
  <div :class="['drop-menu', isDrop ? 'drop' : '']" @click="toggleDrop">
    <a target="_blank" class="drop-menu-btn" href="https://marta-ng.ru/mini-site/">Служба поддержки</a>
    <a target="_blank" class="drop-menu-btn" href="/audio-katalog/">Официальный сайт</a>
    <a target="_blank" class="drop-menu-btn" href="https://t.me/marta_ng/">ТЕЛЕГРАМ</a>
    <a target="_blank" class="drop-menu-btn" href="https://zen.yandex.ru/marta_ng">Яндекс-Дзен</a>
    <a target="_blank" class="drop-menu-btn" href="http://marta-ng.com/zhenskii_journal/">Женский Журнал</a>
  </div>
  <div class="drop-menu-wrapper">
    <div class="drop-menu-img">
      <img src="@/assets/images/sidebar-img.png" alt="" />
    </div>
    <div class="drop-switch">
      <i 
        @click="toggleDrop"
        :class="['fa', 'switch-btn', isDrop ? 'fa-times' : 'fa-bars']" 
        aria-hidden="true"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isDrop', 'toggleDrop'],
}
</script>

<style scoped>

</style>