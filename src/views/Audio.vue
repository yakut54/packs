<template>
  <div class="audio inner-page">
    <back-button />
    <div class="audio-wrapper">
      <div class="row">
        <div class="recomendation-content d3">
          <!-- teleport play button -->
          <div class="teleport" style="display: none;"></div>
          <div class="recomendation-txt dop">
            <strong class="dop-2">РЕКОМЕНДАЦИЯ:</strong><br>
            <div style="text-align: left;">
              <span v-if="recommendations" v-html="recommendations"></span>
            </div>
          </div>
          <div class="recomendation-line"></div>
          <img src="@/assets/images/uhi.png" alt="РЕКОМЕНДАЦИЯ" class="uhi" />
          <div class="recomendation-txt">
            <strong>
              <span class="dop-2">Для наилучшего эффекта</span>
              <br />
              <span class="asb">принимай сеанс в наушниках</span>
            </strong>
          </div>
        </div>
        <div class="recomendation-img d4">
          <div class="inner-recomendation-img"></div>
        </div>
      </div>
      <audio :src="config.data[idx].source" ref="audio"></audio>
      <player :player="player" :src="config.data[idx].source" />
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { ref } from 'vue'

export default {
  name: "Audio",
  setup() {
    const audio = ref(null)
    const player = () => audio.value
    return { audio, player }
  },
  data() {
    return {
      idx: 0,
      recommendations: '',
    };
  },
  computed: {
    ...mapState(["config"])
  },
  methods: {
    ...mapMutations(["setTitle", "setSubtitle"]),
    ...mapActions(['getSeansByPageName'])
  },
  async mounted() {
    this.idx = +localStorage.getItem("idx") || 0;

    const pageName = localStorage.getItem("pageName")

    const setData = () => {
      this.recommendations = this.config.data[this.idx].recommendations

      window.scrollTo(0, 0)

      this.setTitle(this.data[this.idx].titleSeans)
      this.setSubtitle(this.data[this.idx].subtitleSeans)
      this.$title(this.data[this.idx].titleSeans)
    }

    if (this.isEnterFromMenu) {
      setData()
    } else {
      await this.getSeansByPageName({
        pageName,
        callback: setData
      })
    }
  }
}
</script>
