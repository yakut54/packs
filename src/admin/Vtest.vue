<template>
  <div class="video inner-page">
    <div class="video-wrapper">
      <div class="video-top teleport">
        <video 
          ref="video"
          :src="src" 
          :poster="poster">
        </video>
        <div @click="fullscreenVideo" class="fullscreen">
					<i class="fa fa-arrows-alt" aria-hidden="true"></i>
				</div>
        <!-- teleport play button -->
      </div>
      <div class="video-bottom">
        <player :player="player" :src="src"/>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { ref } from 'vue'

export default {
  name: "Vtest",
  props: ['poster', 'src'],
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
}
</script>

<style>

</style>