<template>
  <div>
    <div class="section-306 wf-section instructions">
      <div class="div-block-490">
        <div class="_1000">
          <div class="_1150-2">
              <div class="padding-vertical padding-xlarge">
                <div class="sticky1_component row_1025 g3">
                    <div class="sticky_content-right g1">
                      <div class="sticky1_item-2 _546365">
                          <div class="margin-bottom margin-small">
                            <div class="max-width-medium-2"></div>
                          </div>
                          <div v-html="remote.remoteText1"></div>
                          <div class="columns-76 w-row">
                            <div class="column-46 w-col w-col-2 fff1">
                              <img src="@/assets/images/stop.png" alt="" class="image-376">
                            </div>
                            <div class="w-col w-col-10 fff2">
                              <div class="_9999 _657867">
                                Сделай своим намерением пройти курс целиком, <br>
                                следуя рекомендациям, которые ты сейчас видишь.
                              </div>
                            </div>
                          </div>
                          <div v-html="remote.remoteText2"></div>
                      </div>
                    </div>
                    <div class="sticky1_content-left g2">
                      <div class="margin-bottom margin-small">
                          <div 
                            @mouseover="onmouseover"
                            @mouseleave="mouseleave"
                            class="d-125-3d-wrapper _4657">
                            <div 
                              class="d-125-image-wrapper _345234" 
                              :style="{transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(${getIsOver ? 180 : 0}deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
                                'transform-style': 'preserve-3d', opacity: getIsOver ? 0 : 1}"></div>

                            <div
                              class="d-125-content-wrapper"
                              :style="{transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(${getIsOver ? 0 : -180}deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
                                'transform-style': 'preserve-3d', opacity: getIsOver ? 1 : 0}">

                                <h3 class="d-125-h3-heading">Марта николаева-гарина</h3>
                                <ul role="list" class="unordered-list-11">
                                  <li>
                                      <div class="text-block-45">Практический психолог</div>
                                  </li>
                                  <li>
                                      <div class="text-block-45">Психолингвист</div>
                                  </li>
                                  <li>
                                      <div class="text-block-45">Гипнолог</div>
                                  </li>
                                  <li>
                                      <div class="text-block-45">Энерготерапевт</div>
                                  </li>
                                </ul>
                                <div class="text-block-44"><strong class="bold-text-582">Ей можно доверять:</strong></div>
                                <ul role="list" class="list-89">
                                  <li>
                                      <div class="text-block-48">Более 2 млн. подписчиков</div>
                                  </li>
                                  <li>
                                      <div class="text-block-48">Более 700 тыс. клиентов</div>
                                  </li>
                                </ul>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
    <div class="section-307 wf-section">
      <div class="w-container">
          <div class="columns-72 w-row">
            <div class="w-col w-col-7 ff1">
              <div class="text-block-1055"><strong>Примечание</strong></div>
              <div class="text-block-1048 _77" v-html="remote.remotePrim"></div>
            </div>
            <div class="w-col w-col-5 ff2"><img src="@/assets/images/mrt1.png" loading="lazy" alt="" class="image-368"></div>
          </div>
          <router-link to="/" class="button-63 _4545 w-button">В главное меню</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'instruction',
    data(){
      return {
        isOver: false
      }
    },
    computed: {
      ...mapState(['remote']),
      getIsOver(){
        return this.isOver
      }
    },
    methods: {
      ...mapMutations(['setTitle', 'setSubtitle']),
      onmouseover(){
        if(document.documentElement.clientWidth > 900) this.isOver = true
      },
      mouseleave(){
        this.isOver = false
      }
    },
    mounted(){
      this.setTitle(remote.remoteTitle)
      this.setSubtitle(remote.remotesubtitle)
      window.scrollTo(0, 0)
      document.title = 'Инструкции'
    }
  }
</script>

<style scoped>
@import url(../assets/css/instuctions.css);
</style>
