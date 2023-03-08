<template>
  <div class="admin inner-page">
    <back-button />
    
      <div class="admin-page">
        
        <div class="admin-page-bar">
          <span class="create-btn button asb" @click="$router.push('/admin_1225/create')">Создать упаковку</span>
          <span class="create-btn button asb" @click="$router.push('/admin_1225/gift_1')">Подарок №1</span>
          <span class="create-btn button asb" @click="$router.push('/admin_1225/gift_2')">Подарок №2</span>
        </div>

        <div class="pack-select-wrapper">
          <div v-if="isLoading">
            <loader />
          </div>
          <div class="pack-select" v-else>

              <div v-for="(pack, idx) of $store.state.packsList">

                <span>Перейти на страницу</span> &nbsp;->&nbsp;&nbsp;
                <a class="link" :href="`${url}#/?page=${pack.pageName}`">{{ `${url}#/?page=${pack.pageName}` }}</a>

                <div class="menu-btn mb10" 
                  @click="openEditor(pack.pageName)"
                  :key="pack.title"
                >
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
  data(){
    return {
      url: ''
    }
  },
  computed: {
    ...mapState(["config", 'isLoading'])
  },
  methods: {
    ...mapMutations(["setTitle", "setSubtitle", 'setPageName']),
    ...mapActions(['getAllSeanses' ]),
    openEditor(pageName){
      this.setPageName(pageName)
      window.localStorage.setItem('pageName', pageName)
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