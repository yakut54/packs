<template>
  <div class="admin inner-page">
    <back-button />
    <div class="admin-gift" style="background: #d5d5d5;padding-left: 10px;padding-right: 10px;padding-bottom: 20px;">
      <loader v-if="isLoading"/>
      <div v-else class="form-block">

        <div class="row form-block-row">
          <div class="flex-form-block">
            <label for="input-2"><span class="label-text">Ссылка подарка №2</span></label>
            <input placeholder="Ссылка подарка №2" id="input-2" class="input" v-model="link">
          </div>
        </div>
        
        <div class="row form-block-row">
          <div class="flex-form-block">
            <label for="input-3"><span class="label-text">Заголовок на кнопке подарка №2</span></label>
            <input placeholder="Заголовок на кнопке подарка №2" id="input-3" class="input" v-model="titleBtn">
          </div>
          <div class="flex-form-block">
            <label for="input-4"><span class="label-text">Подзаголовок на кнопке подарка №2</span></label>
            <input placeholder="Подзаголовок на кнопке подарка №2" id="input-4" class="input" v-model="subtitleBtn">
          </div>
        </div>

        <div class="row form-block-row">
          <div class="row form-block-row">
            <div class="flex-form-block">
              <label for="input-7"><span class="label-text">Изображение на кнопке подарка №2</span></label>
              <input placeholder="Изображение на кнопке подарка №2" id="input-7" class="input" v-model="imgBtn">
            </div>
            <div class="flex-form-block">
              <label for="input-9"><span class="label-text">Красный флаг на кнопке подарка №1</span></label>
              <input placeholder="Красный флаг на кнопке подарка №2" id="input-9" class="input" v-model="redFlagText">
            </div>
          </div>
        </div>

        <div class="menu-btn" :class="{ 'mt-dop': !!redFlagText }">
          <div class="red-dop" v-html="redFlagText" v-if="!!redFlagText"></div>
          <div class="menu-btn-left"></div>
          <div class="menu-btn-center" :style="{ backgroundImage: `url(${imgBtn})` }"></div>
          <div class="menu-btn-right">
            <div class="text-block-797" v-html="titleBtn"></div>
            <div class="text-block-798" v-html="subtitleBtn"></div>
          </div>

        </div>

       

      </div>
      <span class="create-btn button asb mt" @click="save">Сохранить</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isLoading']),
    link: {
      get() {
        return this.$store.state.linkGiftBtn.link
      },
      set(value) {
        this.$store.commit('setGiftLink', value)
      }
    },
    subtitleBtn: {
      get() {
        return this.$store.state.linkGiftBtn.subtitleBtn
      },
      set(value) {
        this.$store.commit('setGiftSubtitleBtn_2', value)
      }
    },
    titleBtn: {
      get() {
        return this.$store.state.linkGiftBtn.titleBtn
      },
      set(value) {
        this.$store.commit('setGiftTitleBtn_2', value)
      }
    },
    imgBtn: {
      get() {
        return this.$store.state.linkGiftBtn.imgBtn
      },
      set(value) {
        this.$store.commit('setGiftImgBtn_2', value)
      }
    },
    redFlagText: {
      get() {
        return this.$store.state.linkGiftBtn.redFlagText
      },
      set(value) {
        this.$store.commit('setGiftRedFlagText_2', value)
      }
    },
  },
  methods: {
    ...mapActions(['setGift_2', 'getGift_2']),
    save(){
      this.setGift_2()
    }
  },
  mounted() {
    this.$store.commit('setAdminTitle', '2 подарок')
    this.$title('2 подарок')
    this.getGift_2()
  }
}
</script>
