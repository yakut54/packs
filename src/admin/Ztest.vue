<template>
  <audio :src="src" ref="audio"></audio>
  <player :player="player" :src="src" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { ref } from 'vue'

export default {
  name: "Z",
  props: ['src'],
  setup() {
    const audio = ref(null)
    const player = () => audio.value
    return { audio, player }
  }
}
</script>