<template>
  <div class="description inner-page">
    <back-button />
    <div class="row row-description">
      <div class="description-content d1">
        <div v-html="text"></div>
        <div class="blockquote show_500">
          Формат сеанса: <strong v-html="typeText"></strong><br />
          Продолжительность: <strong>{{ duration }}.</strong>
        </div>
      </div>
      <div class="description-img d2">
        <div class="inner-description-img">
          <div class="description-img-fon" :style="{ backgroundImage: `url(${imgFon})` }"></div>
          <p class="description-img-text">
            Марта Николаева-Гарина,<br />
            гипнотерапевт
          </p>
        </div>

        <div class="blockquote hide_500">
          Формат сеанса: <strong v-html="typeText"></strong><br />
          Продолжительность: <strong>{{ duration }}.</strong>
        </div>
      </div>
    </div>

    <span class="button" @click="$router.push(`/${route}`)" v-if="route === 'video'">НАЧАТЬ</span>
    <span class="button" @click="$router.push('/book')" v-else-if="route === 'book'">НАЧАТЬ</span>
    <span class="button" @click="drop" :class="{ 'button-hide': !isHide, 'btn-none': btnNone }" v-else>НАЧАТЬ</span>

    <div ref="description"></div>

    <transition name="rotate">
      <div class="drop-block-wrapper" v-if="!isHide">
        <div class="drop-block">

          <div class="recom" v-if="recommendations">
            <span class="text-span-224">Назначение</span><br class="br">
            <span v-html="recommendations"></span>
          </div>

          <div class="rec-block">
            <div class="row dop-10">
              <div class="rec-img">
                <img src="@/assets/images/audio-mini.png" alt="">
              </div>
              <div class="rec-content">
                <div class="rec-text-block">Сеанс принимай в наушниках. <span class="rec-text-span">Это важно.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="player-wrapper">
            <audio :src="data[idx].source" ref="audio"></audio>
            <player :player="player" :src="data[idx].source" />
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'description',
  data() {
    return {
      btnNone: false,
      isHide: true,
      idx: 0,
      text: '',
      route: '',
      imgFon: '',
      typeText: '',
      duration: '',
      recommendations: '',
    }
  },
  setup() {
    const audio = ref(null)
    const player = () => audio.value
    return { audio, player }
  },
  computed: {
    ...mapState(['data'])
  },
  methods: {
    ...mapMutations(['setTitle', 'setSubtitle']),
    ...mapActions(['getSeansByPageName']),
    drop() {
      this.isHide = false
      this.goto('description')
      setTimeout(() => {
        this.btnNone = true
      }, 0)
    },
    goto(refName) {
      const element = this.$refs[refName]
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
      }, 0)
    }
  },
  mounted() {
    this.idx = +localStorage.getItem('idx') || 0
    this.pageName = localStorage.getItem("pageName") || 'pageName-test'
    this.text = this.data[this.idx].text
    this.route = this.data[this.idx].type
    this.imgFon = this.data[this.idx].imgFon
    this.typeText = this.data[this.idx].typeText
    this.duration = this.data[this.idx].durationText
    this.recommendations = this.data[this.idx].recommendations

    window.scrollTo(0, 0)

    this.setTitle(this.data[this.idx].titleSeans)
    this.setSubtitle(this.data[this.idx].subtitleSeans)
    this.$title(this.data[this.idx].titleSeans)

    this.getSeansByPageName(this.pageName)
  }

}
</script>

<style>
.rotate-enter-active,
.rotate-leave-active {
  transition: all .7s ease-in-out;
}

.rotate-enter-from {
  opacity: 0;
  transform: rotateX(90deg);
}

.rotate-leave-to {
  opacity: 0;
  transform: rotateX(-90deg);
}
</style>