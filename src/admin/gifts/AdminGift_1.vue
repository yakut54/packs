<template>
  <div class="admin inner-page">
    <back-button />
    <loader v-if="isLoading"/>
    <div v-else class="admin-gift" style="background: #d5d5d5;padding-left: 10px;padding-right: 10px;padding-bottom: 20px;">
      <div class="form-block">
        <label for="text-1"><span class="label-text">Описание сеанса подарка №1</span></label>
        <textarea placeholder="Описание сеанса подарка №1" id="text-1" class="textarea" v-model="text_1"></textarea>
      </div>
      <div class="form-block">
        <label for="text-2"><span class="label-text">Текст в синем прямоугольнике подарка №1</span></label>
        <textarea placeholder="Текст в синем прямоугольнике подарка №1" id="text-2" class="textarea" v-model="text_2"></textarea>
      </div>
      <div class="form-block">
        <label for="text-3"><span class="label-text">Текст над youtube подарка №1</span></label>
        <textarea placeholder="Текст над youtube подарка №1" id="text-3" class="textarea" v-model="text_3"></textarea>
      </div>
      <div class="form-block">

        <div class="row form-block-row">
          <div class="flex-form-block">
            <label for="input-1"><span class="label-text">Заголовок подарка №1</span></label>
            <input placeholder="Заголовок подарка №1" id="input-1" class="input" v-model="title">
          </div>
          <div class="flex-form-block">
            <label for="input-2"><span class="label-text">Подзаголовок подарка №1</span></label>
            <input placeholder="Подзаголовок подарка №1" id="input-2" class="input" v-model="subtitle">
          </div>
        </div>
        
        <div class="row form-block-row">
          <div class="flex-form-block">
            <label for="input-3"><span class="label-text">Заголовок на кнопке подарка №1</span></label>
            <input placeholder="Заголовок на кнопке подарка №1" id="input-3" class="input" v-model="titleBtn">
          </div>
          <div class="flex-form-block">
            <label for="input-4"><span class="label-text">Подзаголовок на кнопке подарка №1</span></label>
            <input placeholder="Подзаголовок на кнопке подарка №1" id="input-4" class="input" v-model="subtitleBtn">
          </div>
        </div>

        <div class="row form-block-row">
          <div class="row form-block-row">
            <div class="flex-form-block">
              <label for="input-7"><span class="label-text">Изображение на кнопке подарка №1</span></label>
              <input placeholder="Изображение на кнопке подарка №1" id="input-7" class="input" v-model="imgBtn">
            </div>
            <div class="flex-form-block">
              <label for="input-9"><span class="label-text">Красный флаг на кнопке подарка №1</span></label>
              <input placeholder="Красный флаг на кнопке подарка №1" id="input-9" class="input" v-model="redFlagText">
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

        <div class="row form-block-row">
          <div class="flex-form-block">
            <label for="input-8"><span class="label-text">Изображение подарка №1</span></label>
            <input placeholder="Изображение подарка №1" id="input-8" class="input" v-model="img">
            <div class="flex-form-block">
              <img :src="img" alt="" class="flex-form-block-img-large">
            </div>
          </div>
          <div class="flex-form-block">
            <label for="input-6"><span class="label-text">Youtube</span></label>
            <input placeholder="Youtube" id="input-6" class="input" v-model="youtube">
            <div class="thumb-wrap">
              <iframe :src="`https://www.youtube.com/embed/${youtube}`" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        </div>
        
        <div class="row form-block-row">
          <div class="flex-form-block">
            <label for="input-5"><span class="label-text">Telegram</span></label>
            <input placeholder="Telegram" id="input-5" class="input" v-model="telegram">
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
    text_1: {
      get() {
        return this.$store.state.giftBtn.texts[0]
      },
      set(value) {
        this.$store.commit('setText_1', value)
      }
    },
    text_2: {
      get() {
        return this.$store.state.giftBtn.texts[1]
      },
      set(value) {
        this.$store.commit('setText_2', value)
      }
    },
    text_3: {
      get() {
        return this.$store.state.giftBtn.texts[2]
      },
      set(value) {
        this.$store.commit('setText_3', value)
      }
    },
    title: {
      get() {
        return this.$store.state.giftBtn.title
      },
      set(value) {
        this.$store.commit('setGiftTitle', value)
      }
    },
    subtitle: {
      get() {
        return this.$store.state.giftBtn.subtitle
      },
      set(value) {
        this.$store.commit('setGiftSubtitle', value)
      }
    },
    subtitleBtn: {
      get() {
        return this.$store.state.giftBtn.subtitleBtn
      },
      set(value) {
        this.$store.commit('setGiftSubtitleBtn_1', value)
      }
    },
    titleBtn: {
      get() {
        return this.$store.state.giftBtn.titleBtn
      },
      set(value) {
        this.$store.commit('setGiftTitleBtn_1', value)
      }
    },
    youtube: {
      get() {
        return this.$store.state.giftBtn.youtube
      },
      set(value) {
        this.$store.commit('setYoutube', value)
      }
    },
    telegram: {
      get() {
        return this.$store.state.giftBtn.telegram
      },
      set(value) {
        this.$store.commit('setTelegram', value)
      }
    },
    imgBtn: {
      get() {
        return this.$store.state.giftBtn.imgBtn
      },
      set(value) {
        this.$store.commit('setGiftImgBtn_1', value)
      }
    },
    img: {
      get() {
        return this.$store.state.giftBtn.img
      },
      set(value) {
        this.$store.commit('setGiftImg', value)
      }
    },
    redFlagText: {
      get() {
        return this.$store.state.giftBtn.redFlagText
      },
      set(value) {
        this.$store.commit('setGiftRedFlagText_1', value)
      }
    },
  },
  methods: {
    ...mapActions(['setGift_1', 'getGift_1']),
    save(){
      this.setGift_1()
    }
  },
  mounted() {
    this.$store.commit('setAdminTitle', '1 Подарок')
    this.$title('1 подарок')
    this.getGift_1()
  }
}
</script>
