<template>
  <div class="app">
    <div class="app-wrapper">
      <div class="app-content">
        <DropMenu :toggleDrop="toggleDrop" :isDrop="isDrop" />
        <AppHeader v-if="isAdmin" />
        <AdminHeader v-else />
        <main :id="!isAdmin ? 'main' : ''">
          <div class="page" :id="isAdmin ? 'admin' : ''">
            <router-view />
          </div>
        </main>
        <div class="tipa-footer" v-if="$route.name === 'gift'">
          <div class="w-container"><span class="button-1 _2" @click="$router.push(`/`)">В главное меню</span></div>
        </div>
        <AppFooter />
        <div class="overlay" @click="toggleDrop" :style="{ 'display': isDrop ? 'block' : 'none' }"></div>
      </div>
      <AppSidebar v-if="isAdmin" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import DropMenu from '@/components/Drop.menu.vue'
import AdminHeader from '@/admin/header/AdminHeader.vue'

export default {
  name: 'App',
  setup() {
    const isDrop = ref(false)
    const toggleDrop = () => {
      isDrop.value = !isDrop.value
    }

    return { isDrop, toggleDrop }
  },

  computed: {
    isAdmin() {
      return this.$route.name !== 'admin' && this.$route.name !== 'gift_1' && this.$route.name !== 'gift_2' && this.$route.name !== 'create'
    }
  },

  components: {
    AppFooter,
    AppSidebar,
    DropMenu,
    AppHeader,
    AdminHeader
  },
}
</script>

<style>
@import url(@/assets/css/styles.css);
@import url(@/assets/css/media.css);
</style>
