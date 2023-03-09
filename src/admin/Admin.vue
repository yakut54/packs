<template>
  <div class="admin inner-page">
    <back-button />

    <div class="admin-page">

      <div class="admin-page-bar">
        <span class="create-btn button asb" @click="create">Создать упаковку</span>
        <span class="create-btn button asb" @click="$router.push('/admin_1225/gift_1')">Подарок №1</span>
        <span class="create-btn button asb" @click="$router.push('/admin_1225/gift_2')">Подарок №2</span>
      </div>

      <div class="pack-select-wrapper">
        <div v-if="isLoading">
          <loader />
        </div>
        <div class="pack-select" v-else>

          <div v-for="(pack, idx) of $store.state.packsList">

            <div class="pack-info row">
              <span>Перейти на страницу</span> &nbsp;->&nbsp;&nbsp;
              <a class="link" :href="`${url}#/?page=${pack.pageName}`">{{ `${url}#/?page=${pack.pageName}` }}</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <span 
                class="copy" 
                title="Скопировать ссылку" 
                @click="copy(`${url}#/?page=${pack.pageName}`, idx)"
                :class="{ 'copy-active': pack.isCopied }"
              ><i class="fa-copy fa"></i></span>&nbsp;&nbsp;
              <span class="copy-text" :class="{ 'copy-active': pack.isCopied }">Ссылка Скопирована</span>
            </div>

            <div class="menu-btn mb10" @click="openEditor(pack.pageName)" :key="pack.title">
              <div class="menu-btn-right">
                <div class="text-block-797" v-html="pack.pageName"></div>
              </div>
              <div class="edit-icon">
                <img src="@/assets/images/pen.png" alt="">
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>


  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: "Admin",
  data() {
    return {
      url: ''
    }
  },
  computed: {
    ...mapState(["config", 'isLoading'])
  },
  methods: {
    ...mapMutations(["setTitle", "setSubtitle", 'setPageName', 'toggleStatus']),
    ...mapActions(['getAllSeanses']),
    async copy(text, idx) {
      await navigator.clipboard.writeText(text)
      this.$store.commit('setIsCopied', idx)
    },
    openEditor(pageName) {
      this.toggleStatus('edit')
      this.setPageName(pageName)
      window.localStorage.setItem('pageName', pageName)
      this.$router.push('/admin_1225/create')
    },
    create() {
      this.toggleStatus('create')
      this.$router.push('/admin_1225/create')
    }
  },
  mounted() {
    this.$store.commit('setAdminTitle', 'Список упаковок')
    this.$title('Список упаковок')
    this.getAllSeanses()
    this.url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'https://marta-ng.com/2023/packs/'
  }
}
</script>

<style>
@import url(./../assets/css/admin.css);
</style>