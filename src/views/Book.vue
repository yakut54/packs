<template>
  <div class="book inner-page">
    <back-button />
    <img :src="img" alt="book-img" class="book-img" />
    <a target="_blank" class="button" :href="source">ЧИТАТЬ</a>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: "Book",
  data() {
    return {
      idx: 0,
      img: '',
      source: ''
    };
  },
  computed: {
    ...mapState(["data"])
  },
  methods: {
    ...mapMutations(["setTitle", "setSubtitle"]),
    ...mapActions(['getSeansByPageName']),
  },
  async mounted() {
    this.idx = +localStorage.getItem("idx") || 0
    const pageName = localStorage.getItem("pageName")

    const setData = () => {
      this.img = this.data[this.idx].imageBook
      this.source = this.data[this.idx].source

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

