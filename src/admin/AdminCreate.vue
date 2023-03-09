<template>
  <div class="admin inner-page">
    <back-button />

    <div class="admin-gift">

      <div class="admin-page-bar">
        <label for="input-812"><span class="label-text">Допродажа</span></label>
        <select id="input-812" class="create-btn button asb" v-model="isShowBtnLink">
          <option value="true">есть</option>
          <option value="false">нет</option>
        </select>
        <label for="input-81e"><span class="label-text">Подарки</span></label>
        <select id="input-81e" class="create-btn button asb" v-model="isShowGiftBtnLink">
          <option value="true">есть</option>
          <option value="false">нет</option>
        </select>
        <span class="create-btn button asb" @click="create">Добавить сеанс</span>
        <span class="create-btn button asb" @click="openShowData">Показать массив данных</span>
      </div>

      <div class="show_data" :class="{ 'active_show_data': isShowActiveShowData }">
        <pre>{{ data }}</pre>
      </div>

      <div v-if="isLoading">
        <loader />
      </div>
      <div class="form-block" v-else>
        <div class="row form-block-row">
          <div class="flex-form-block">
            <label for="input-1"><span class="label-text">Название упаковки</span></label>
            <input placeholder="Название упаковки" id="input-1" class="input" v-model="pageName">
          </div>
        </div>

        <div class="row form-block-row">
          <div class="flex-form-block">
            <label for="input-1"><span class="label-text">Заголовок Упаковки</span></label>
            <input placeholder="Заголовок Упаковки" id="input-1" class="input" v-model="pageTitle">
          </div>
          <div class="flex-form-block">
            <label for="input-2"><span class="label-text">Подзаголовок</span></label>
            <input placeholder="Подзаголовок Упаковки" id="input-2" class="input" v-model="pageSubtitle">
          </div>
        </div>

        <div class="row form-block-row" v-if="isShowBtnLink">
          <div class="flex-form-block">
            <label for="input-3"><span class="label-text">Заголовок кнопки "Допродажа"</span></label>
            <input placeholder='Заголовок кнопки "Допродажа"' id="input-3" class="input" v-model="titleLinkBtn">
          </div>
          <div class="flex-form-block">
            <label for="input-4"><span class="label-text">Подзаголовок кнопки "Допродажа"</span></label>
            <input placeholder='Подзаголовок кнопки "Допродажа"' id="input-4" class="input" v-model="subtitleLinkBtn">
          </div>
        </div>

        <div class="row form-block-row" v-if="isShowBtnLink">
          <div class="row form-block-row">
            <div class="flex-form-block">
              <label for="input-7"><span class="label-text">Изображение на кнопке "Допродажа"</span></label>
              <input placeholder='Изображение на кнопке "Допродажа"' id="input-7" class="input" v-model="imgLinkBtn">
            </div>
            <div class="flex-form-block">
              <label for="input-9"><span class="label-text">Красный флаг на кнопке "Допродажа"</span></label>
              <input placeholder='Красный флаг на кнопке "Допродажа"' id="input-9" class="input" v-model="redFlagText">
            </div>
          </div>
        </div>

        <div class="row form-block-row">
          <div class="row form-block-row">
            <div class="flex-form-block" v-if="isShowBtnLink">
              <label for="input-811"><span class="label-text">Ссылка на кнопке "Допродажа"</span></label>
              <input placeholder='Ссылка на кнопке "Допродажа"' id="input-811" class="input" v-model="btnLink_link">
            </div>
          </div>
        </div>

        <!-- akkardeon -->
        <div class="admin-btn-wrapper">
          <div :key="btn.title" v-for="(btn, idx) in data" :ref="`akk_${idx}`" :class="{ 'akk-active': btn.isOpen }">
            <div class="menu-btn admin-menu-btn" @click="toggleAkkardeonBtn(idx)"
              :class="[{ 'mt-dop': !!btn.redFlagText }, `akk_${idx}`]">
              <div class="click">
                <div class="delete" @click="$event => deleteBtn(idx, $event)"></div>
              </div>
              <div class="red-dop" v-html="btn.redFlagText" v-if="!!btn.redFlagText"></div>
              <div class="menu-btn-left"></div>
              <div class="menu-btn-center" :style="{ backgroundImage: `url(${btn.imgBtn})` }"></div>
              <div class="menu-btn-right">
                <div class="text-block-797" v-html="btn.titleBtn"></div>
                <div class="text-block-798" v-html="btn.subtitleBtn"></div>
              </div>
            </div>

            <div class="admin-description">

              <div class="form-block">
                <div class="row form-block-row">
                  <div class="flex-form-block">
                    <label for="input-81r5"><span class="label-text">Описание сеанса</span></label>
                    <select id="input-81r5" class="input" :value="btn.through" @input="e => updateThrough(idx, e)">
                      <option value="true">нет</option>
                      <option value="false">есть</option>
                    </select>
                  </div>
                </div>

                <div class="area-div">
                  <label v-if="!btn.through" :for="`text-${idx}`"><span class="label-text">Текст описания
                      сеанса</span></label>
                  <textarea v-if="!btn.through" :id="`text-${idx}`" class="textarea" :value="btn.text"
                    placeholder="Текст описания сеанса" @input="e => updateText(idx, e)"></textarea>
                </div>

                <div class="area-div">
                  <label v-if="!btn.through" :for="`text-${idx}_r`"><span class="label-text">Рекомендация</span></label>
                  <textarea v-if="!btn.through" :id="`text-${idx}_r`" class="textarea" :value="btn.recommendations"
                  placeholder="Рекомендация" @input="e => updateRecommendations(idx, e)"></textarea>
                </div>

                <div class="row form-block-row">
                  <div class="flex-form-block">
                    <label for="input-211e"><span class="label-text">Заголовок сеанса</span></label>
                    <input placeholder="Заголовок сеанса" id="input-211e" class="input" :value="btn.titleSeans" @input="e => updateTitle(idx, e)">
                  </div>
                  <div class="flex-form-block">
                    <label for="input-111"><span class="label-text">Подзаголовок сеанса</span></label>
                    <input placeholder="Подзаголовок сеанса" id="input-111" class="input" :value="btn.subtitleSeans" @input="e => updateSubtitle(idx, e)">
                  </div>
                </div>

                <div class="row form-block-row">
                  <div class="flex-form-block">
                    <label for="input-221"><span class="label-text">Заголовок на кнопке сеанса</span></label>
                    <input placeholder="Заголовок на кнопке сеанса" id="input-221" class="input" :value="btn.titleBtn" @input="e => updateTitleBtn(idx, e)">
                  </div>
                  <div class="flex-form-block">
                    <label for="input-151"><span class="label-text">Подзаголовок на кнопке сеанса</span></label>
                    <input placeholder="Подзаголовок на кнопке сеанса" id="input-151" class="input" :value="btn.subtitleBtn" @input="e => updateSubtitleBtn(idx, e)">
                  </div>
                </div>

                <div class="row form-block-row">
                  <div class="flex-form-block">
                    <label for="input-812"><span class="label-text">Ссылка на трек</span></label>
                    <input placeholder="Ссылка на трек" id="input-812" class="input" :value="btn.source" @input="e => updateSource(idx, e)">
                  </div>
                  <div class="flex-form-block" v-if="!btn.through">
                    <label for="input-813"><span class="label-text">Изображение в описании сеанса</span></label>
                    <input placeholder="Изображение в описании сеанса" id="input-813" class="input" :value="btn.imgFon" @input="e => updateImg(idx, e)">
                  </div>
                </div>

                <div class="row form-block-row">
                  <div class="flex-form-block" v-if="!btn.through">
                    <label for="input-814"><span class="label-text">Продолжительность сеанса</span></label>
                    <input placeholder="Продолжительность сеанса" id="input-814" class="input" :value="btn.durationText" @input="e => updateDuration(idx, e)">
                  </div>
                  <div class="flex-form-block">
                    <label for="input-815"><span class="label-text">Тип сеанса</span></label>
                    <select id="input-815" class="input" :value="btn.type" @input="e => updateType(idx, e)">
                      <option value="video">Видео</option>
                      <option value="audio">Аудио</option>
                      <option value="book">Электронная книга</option>
                    </select>
                  </div>
                </div>

                <div class="row form-block-row">
                  <div class="flex-form-block" v-if="!btn.through">
                    <label for="input-814"><span class="label-text">Изображение на кнопке сеанса</span></label>
                    <input placeholder="Изображение на кнопке сеанса" id="input-814" class="input" :value="btn.imgBtn" @input="e => updateImgBtn(idx, e)">
                  </div>
                  <div class="flex-form-block" v-if="!btn.through">
                    <label for="input-814w"><span class="label-text">Красный флаг на кнопке</span></label>
                    <input placeholder="Красный флаг на кнопке" id="input-814w" class="input" :value="btn.redFlagText" @input="e => updateRedFlagText(idx, e)">
                  </div>
                </div>

                <div class="row form-block-row">
                  <div class="flex-form-block" v-if="btn.type === 'video'">
                    <label for="input-8166"><span class="label-text">Ссылка на постер для видео</span></label>
                    <input placeholder="Ссылка на постер для видео" id="input-8166" class="input" :value="btn.poster" @input="e => updatePoster(idx, e)">
                  </div>
                  <div class="flex-form-block" v-if="btn.type === 'book'">
                    <label for="input-8155"><span class="label-text">Ccылка на Изображение книги</span></label>
                    <input placeholder="Ccылка на Изображение книги" id="input-8155" class="input" :value="btn.imageBook" @input="e => updateImgBook(idx, e)">
                  </div>
                </div>

                <div class="admin-player-wrapper" v-if="btn.type === 'audio'">
                  <Ztest :src="btn.source" />
                </div>
                <div class="admin-player-wrapper" v-if="btn.type === 'book'">
                  <Otest :src="btn.source" :img="btn.imageBook" />
                </div>
                <div class="admin-player-wrapper" v-if="btn.type === 'video'">
                  <Vtest :src="btn.source" :poster="btn?.poster" />
                </div>

              </div>

              <div class="row row-description" v-if="!btn.through">
                <div class="description-content d1">
                  <div v-html="btn.text"></div>
                  <div class="blockquote show_500">
                    Формат сеанса: <strong v-html="btn.type === 'video'
                      ? 'видео'
                      : btn.type === 'audio'
                        ? 'аудио'
                        : 'электронная книга'"></strong><br />
                    Продолжительность: <strong>{{ btn.durationText }}.</strong>
                  </div>
                </div>
                <div class="description-img d2">
                  <div class="inner-description-img">
                    <div class="description-img-fon" :style="{ backgroundImage: `url(${btn.imgFon})` }"></div>
                    <p class="description-img-text">
                      Марта Николаева-Гарина,<br />
                      гипнотерапевт
                    </p>
                  </div>

                  <div class="blockquote hide_500">

                    Формат сеанса: <strong
                      v-html="btn.type === 'video' ? 'видео' : btn.type === 'audio' ? 'аудио' : 'электронная книга'"></strong><br />
                    Продолжительность: <strong>{{ btn.durationText }}.</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <!-- end akkardeon -->

        <div class="menu-btn" :class="{ 'mt-dop': !!redFlagText }" v-if="isShowBtnLink">
          <div class="red-dop" v-html="redFlagText" v-if="!!redFlagText"></div>
          <div class="menu-btn-left"></div>
          <div class="menu-btn-center" :style="{ backgroundImage: `url(${imgLinkBtn})` }"></div>
          <div class="menu-btn-right">
            <div class="text-block-797" v-html="titleLinkBtn"></div>
            <div class="text-block-798" v-html="subtitleLinkBtn"></div>
          </div>
        </div>

      </div>

      <span class="create-btn button asb mt" @click="save">Сохранить</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Ztest from './Ztest'
import Otest from './Otest'
import Vtest from './Vtest'

export default {
  data() {
    return {
      isShowActiveShowData: false
    }
  },
  methods: {
    openShowData() {
      this.isShowActiveShowData = !this.isShowActiveShowData
    },
    ...mapActions(['getSeansByPageName']),
    ...mapMutations([
      'setPageName',
      'setPageTitle',
      'setPageSubtitle',
      'setBtnLinkTitle',
      'setBtnLinkSubtitle',
      'setBtnLinkImgBtn',
      'setBtnLinkRedFlagText',
      'setBtnLink_link',
      'setIsShowBtnLink',
      'setSeansText',
      'setSource',
      'setImgFon',
      'setDuration',
      'setType',
      'setPoster',
      'setImgBook',
      'setRecommendations',
      'setTitleSeans',
      'setSubtitleSeans',
      'setTitleBtn',
      'setSubtitleBtn',
      'setThrough',
      'setImgBtn',
      'setImgBtn',
      'setRedFlagText'
    ]),
    save() {
      this.$store.dispatch('createSeans', {
        type: 'createItem',
        callback: () => {
          this.$router.push('/admin_1225')
        }
      })
    },
    deleteBtn(idx) {
      this.$store.commit('deleteBtn', idx)
    },
    create() {
      this.$store.commit('setData', {
        through: false,
        type: '',
        typeText: '',
        titleBtn: ``,
        subtitleBtn: ``,
        redFlagText: '',
        title: ``,
        subtitle: ``,
        imgFon: '',
        imgBtn: '',
        durationText: '',
        imageBook: '',
        source: '',
        recommendations: ``,
        text: ``,
        poster: '',
        isOpen: false
      })
    },
    updateRedFlagText(idx, e) {
      this.$store.commit('setRedFlagText', { value: e.target.value, idx })
    },
    updateImgBtn(idx, e) {
      this.$store.commit('setImgBtn', { value: e.target.value, idx })
    },
    updateText(idx, e) {
      this.$store.commit('setSeansText', { value: e.target.value, idx })
    },
    updateRecommendations(idx, e) {
      this.$store.commit('setRecommendations', { value: e.target.value, idx })
    },
    updateSource(idx, e) {
      this.$store.commit('setSource', { value: e.target.value, idx })
    },
    updateImg(idx, e) {
      this.$store.commit('setImgFon', { value: e.target.value, idx })
    },
    updateDuration(idx, e) {
      this.$store.commit('setDuration', { value: e.target.value, idx })
    },
    updateType(idx, e) {
      this.$store.commit('setType', { value: e.target.value, idx })
    },
    updatePoster(idx, e) {
      this.$store.commit('setPoster', { value: e.target.value, idx })
    },
    updateImgBook(idx, e) {
      this.$store.commit('setImgBook', { value: e.target.value, idx })
    },
    updateTitle(idx, e) {
      console.log(e.target.value);
      this.$store.commit('setTitleSeans', { value: e.target.value, idx })
    },
    updateSubtitle(idx, e) {
      this.$store.commit('setSubtitleSeans', { value: e.target.value, idx })
    },
    updateTitleBtn(idx, e) {
      this.$store.commit('setTitleBtn', { value: e.target.value, idx })
    },
    updateSubtitleBtn(idx, e) {
      this.$store.commit('setSubtitleBtn', { value: e.target.value, idx })
    },
    updateThrough(idx, e) {
      const v = e.target.value === 'true' ? true : false
      this.$store.commit('setThrough', { value: v, idx })
    },
    toggleAkkardeonBtn(idx) {
      this.$store.commit('setDataIsOpenIndex', idx)
      this.goto(`akk_${idx}`)
    },
    goto(refName) {
      function onScroll(selector, time = 900) {
        $('html, body').animate({
          scrollTop: $(selector).offset().top
        }, time);
      }
      onScroll(`.${refName}`)
    }
  },
  computed: {
    ...mapState(['data', 'btnLink', 'isLoading', 'status']),
    pageName: {
      get() {
        return this.$store.state.pageName
      },
      set(value) {
        this.$store.commit('setPageName', value)
      }
    },
    pageTitle: {
      get() {
        return this.$store.state.title
      },
      set(value) {
        this.$store.commit('setPageTitle', value)
      }
    },
    pageSubtitle: {
      get() {
        return this.$store.state.subtitle
      },
      set(value) {
        this.$store.commit('setPageSubtitle', value)
      }
    },
    titleLinkBtn: {
      get() {
        return this.$store.state.btnLink.titleBtn
      },
      set(value) {
        this.$store.commit('setBtnLinkTitle', value)
      }
    },
    subtitleLinkBtn: {
      get() {
        return this.$store.state.btnLink.subtitleBtn
      },
      set(value) {
        this.$store.commit('setBtnLinkSubtitle', value)
      }
    },
    imgLinkBtn: {
      get() {
        return this.$store.state.btnLink.imgBtn
      },
      set(value) {
        this.$store.commit('setBtnLinkImgBtn', value)
      }
    },
    redFlagText: {
      get() {
        return this.$store.state.btnLink.redFlagText
      },
      set(value) {
        this.$store.commit('setBtnLinkRedFlagText', value)
      }
    },
    btnLink_link: {
      get() {
        return this.$store.state.btnLink.link
      },
      set(value) {
        this.$store.commit('setBtnLink_link', value)
      }
    },
    isShowBtnLink: {
      get() {
        return this.$store.state.isShowBtnLink
      },
      set(value) {
        const v = value === 'true' ? true : false
        this.$store.commit('setIsShowBtnLink', v)
      }
    },
    isShowGiftBtnLink: {
      get() {
        return this.$store.state.isShowGiftBtnLink
      },
      set(value) {
        const v = value === 'true' ? true : false
        this.$store.commit('setIsShowGiftBtnLink', v)
      }
    }
  },
  mounted() {

    this.pageName = localStorage.getItem("pageName")
    this.$store.commit('setAdminTitle', this.status === 'edit' ? this.pageName : 'Новая упаковка')
    this.$title('Редактор')

    if (this.status === 'edit') {
      this.getSeansByPageName({pageName: this.pageName})
    }
    if (this.status === 'create') {
      this.setPageName('')
      this.setPageTitle('')
      this.setPageSubtitle('')
      this.setBtnLinkTitle('')
      this.setBtnLinkSubtitle('')
      this.setBtnLinkImgBtn('')
      this.setBtnLinkRedFlagText('')
      this.setBtnLink_link('')
      this.setIsShowBtnLink(false)

      this.setSeansText({ value: '', idx: 0 })
      this.setSource({ value: '', idx: 0 })
      this.setImgFon({ value: '', idx: 0 })
      this.setDuration({ value: '', idx: 0 })
      this.setType({ value: 'audio', idx: 0 })
      this.setPoster({ value: '', idx: 0 })
      this.setImgBook({ value: '', idx: 0 })
      this.setImgBtn({ value: '', idx: 0 })
      this.setTitleSeans({ value: '', idx: 0 })
      this.setSubtitleSeans({ value: '', idx: 0 })
      this.setTitleBtn({ value: '', idx: 0 })
      this.setSubtitleBtn({ value: '', idx: 0 })
      this.setRecommendations({ value: '', idx: 0 })
      this.setRedFlagText({ value: '', idx: 0 })
      this.setThrough({ value: false, idx: 0 })
    }
  },
  components: { Ztest, Otest, Vtest }
}
</script>
