<template>
  <div class="video inner-page">
    <back-button />
    <div class="video-wrapper">
      <div class="video-top teleport">
        <video 
          ref="video"
          :src="data[idx].source" 
          :poster="poster">
        </video>
        <div @click="fullscreenVideo" class="fullscreen">
					<i class="fa fa-arrows-alt" aria-hidden="true"></i>
				</div>
        <!-- teleport play button -->
      </div>
      <div class="video-bottom">
        <player :player="player" :src="data[idx].source"/>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { ref } from 'vue'

export default {
  name: "Video",
  setup(){
    const video = ref(null)
    const player = () => video.value

    const fullscreenVideo = () => {
      if (video.value) {
        video.value.requestFullscreen()
      }
    }

    return { video, player, fullscreenVideo }
  },
  data() {
    return {
      idx: 0,
      poster: ''
    };
  },
  computed: {
    ...mapState(["data"])
  },
  methods: {
    ...mapMutations(["setTitle", "setSubtitle"]),
    ...mapActions(['getSeansByPageName']),
  },
  mounted() {
    this.idx = +localStorage.getItem("idx") || 0;
    this.pageName = localStorage.getItem("pageName") || 'pageName-test'
    this.getSeansByPageName(pageName, 'getItem')
    this.poster = this.data[this.idx].poster
    
    window.scrollTo(0, 0)

    this.setTitle(this.data[this.idx].titleSeans)
    this.setSubtitle(this.data[this.idx].subtitleSeans)
    this.$title(this.data[this.idx].titleSeans)

    this.getSeansByPageName(this.pageName)
  }
}
</script>

<style>

</style>