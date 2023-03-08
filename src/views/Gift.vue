<template>
  <div>
    <div class="gift_block">
      <div class="max">
        <div class="padding">
          <div class="row">
            <div class="gift_block_text" v-html="giftBtn.texts[0]">
            </div>
            <div class="gift_block_img">
              <div class="sticky">
                <img :src="giftBtn.img" alt="">
                <span class="button-1" @click="goto('yuotube_block')">Получить бесплатно</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gift_block_1">
      <div class="max">
        <div class="gray_block">
          <div class="inner_gray_block" v-html="giftBtn.texts[1]">
          </div>
        </div>
      </div>
    </div>
    <div class="gift_block_2">
      <div class="max">
        <div class="padding">
          <div class="text-block-3" ref="yuotube_block" v-html="giftBtn.texts[2]">
          </div>
          <div class="yuotube_block">
            <div class="thumb-wrap">
              <iframe width="690" height="388" :src="`https://www.youtube.com/embed/${giftBtn.youtube}`" title="Сеанс в подарок" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          </div>
          <a class="button-1 _2" :href="giftBtn.telegram">ПОЛУЧИТЬ БОНУС В TELEGRAM</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: "Gift",
  computed: {
    ...mapState(['giftBtn'])
  },
  methods: {
    ...mapMutations(["setTitle", "setSubtitle"]),
    goto(refName) {
      const element = this.$refs[refName]
      element.scrollIntoView({ behavior: "smooth" })
    }
  },
  mounted() {
    this.setTitle(this.giftBtn.title)
    this.setSubtitle(this.giftBtn.subtitle)
    window.scrollTo(0, 0)
    document.title = 'ВАМ ПОДАРОК'
  }
}
</script>

<style>
@import url(../assets/css/gift.css);
</style>