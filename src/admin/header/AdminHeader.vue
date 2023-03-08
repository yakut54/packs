<template>
  <div class="admin-header">
    <img src="https://marta-ng.com/recieve/serdcevina-sebya1-3646/img/11style.13e3f1aa.png" alt="" class="admin-title-img">
    <div class="heading-97" v-html="adminTitle"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed:{
    adminTitle(){
      return this.$store.state.Admin.adminTitle
    }
  },
}
</script>
