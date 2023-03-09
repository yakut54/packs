import { createStore } from 'vuex'
import { Admin } from './Admin'

export default createStore({
  state: {
    status: 'create',
    isLoading: false,
    packsList: [],
    pageName: '',
    title: '',
    subtitle: '',
    isShowBtnLink: false,
    isShowGiftBtn: true,
    isShowGiftBtnLink: true,

    giftBtn: {
      texts: [``, ``, ``],
      youtube: '',
      telegram: '',
      img: '',
      title: ``,
      subtitle: '',
      titleBtn: ``,
      subtitleBtn: '',
      imgBtn: '',
      redFlagText: ''
    },

    linkGiftBtn: {
      redFlagText: '',
      titleBtn: ``,
      subtitleBtn: ``,
      imgBtn: '',
      link: ''
    },

    btnLink: {
      redFlagText: '',
      titleBtn: ``,
      subtitleBtn: ``,
      imgBtn: '',
      link: ''
    },

    data: [
      {
        titleSeans: "",
        subtitleSeans: "",
        titleBtn: "",
        subtitleBtn: "",
        through: false,
        type: "",
        redFlagText: "",
        imgFon: "",
        imgBtn: "",
        durationText: "",
        imageBook: "",
        source: "",
        recommendations: "",
        text: "",
        poster: "",
        isOpen: false,
      },
    ]
  },
  mutations: {
    toggleStatus: (state, status) => state.status = status,
    toggleLoader: (state, bool) => state.isLoading = bool,
    setDataIsOpenIndex: (state, idx) => {
      state.data[idx].isOpen 
        ? state.data[idx].isOpen = false 
        : state.data[idx].isOpen = true
    },
    setIsCopied: (state, idx) => {
      state.packsList[idx].isCopied = true
      setTimeout(() => state.packsList[idx].isCopied = false, 2000)
    },

    setSubtitle: (state, subtitle) => state.subtitle = subtitle,
    setTitle: (state, title) => state.title = title,
    setServerData: (state, data) => {
      state.data = data.map(item => {
        return {
          titleSeans: item.title,
          subtitleSeans: item.subtitle,
          titleBtn: item.title_btn,
          subtitleBtn: item.subtitle_btn,
          through: !item.text,
          type: item.type,
          redFlagText: item.red_flag_text,
          imgFon: item.img,
          imgBtn: item.btn_img,
          durationText: item.duration,
          imageBook: item.image_book,
          source: item.src,
          recommendations: item.recomendations,
          text: item.text,
          poster: item.poster,
          isOpen: false,
        }
      })
    },
    setPacksList: (state, packsList) => {
      packsList.forEach(pack => pack.isCopied = false)
      state.packsList = packsList
    },
    setGift_1_: (state, gift) => {
      state.giftBtn.texts = gift.texts
      state.giftBtn.img = gift.img
      state.giftBtn.imgBtn = gift.img_btn
      state.giftBtn.redFlagText = gift.red_flag_text
      state.giftBtn.titleBtn = gift.title_btn
      state.giftBtn.subtitleBtn = gift.subtitle_btn
      state.giftBtn.title = gift.title
      state.giftBtn.subtitle = gift.subtitle
      state.giftBtn.telegram = gift.telegram
      state.giftBtn.youtube = gift.youtube
    },
    setGift_2_: (state, gift) => {
      state.linkGiftBtn.redFlagText = gift.link_gift_btn.red_flag_text
      state.linkGiftBtn.titleBtn = gift.link_gift_btn.title_btn
      state.linkGiftBtn.subtitleBtn = gift.link_gift_btn.subtitle_btn
      state.linkGiftBtn.imgBtn = gift.link_gift_btn.img_btn
      state.linkGiftBtn.link = gift.link_gift_btn.link
    },
    setBtnLink: (state, btnLink) => {

      // console.log('btnLink >> ', btnLink);

      state.btnLink = {
        redFlagText: 'test',
        titleBtn: btnLink.title,
        subtitleBtn: btnLink.subtitle,
        imgBtn: btnLink.img,
        link: btnLink.link
      }
    },

    setPageName: (state, pageName) => state.pageName = pageName,
    setPageTitle: (state, title) => state.title = title,
    setPageSubtitle: (state, subtitle) => state.subtitle = subtitle,

    setGiftTitle: (state, title) => state.giftBtn.title = title,
    setGiftSubtitle: (state, subtitle) => state.giftBtn.subtitle = subtitle,
    setText_1: (state, text) => state.giftBtn.texts[0] = text,
    setText_2: (state, text) => state.giftBtn.texts[1] = text,
    setText_3: (state, text) => state.giftBtn.texts[2] = text,
    setGiftTitleBtn_1: (state, titleBtn) => {
      console.log('titleBtn', titleBtn);
      // state.giftBtn.titleBtn = titleBtn
    },
    setGiftSubtitleBtn_1: (state, subtitleBtn) => state.giftBtn.subtitleBtn = subtitleBtn,
    setGiftImgBtn_1: (state, imgBtn) => state.giftBtn.imgBtn = imgBtn,
    setGiftImg: (state, img) => state.giftBtn.img = img,
    setYoutube: (state, link) => state.giftBtn.youtube = link,
    setTelegram: (state, link) => state.giftBtn.telegram = link,
    setGiftRedFlagText_1: (state, text) => state.giftBtn.redFlagText = text,

    setGiftTitleBtn_2: (state, titleBtn) => state.linkGiftBtn.titleBtn = titleBtn,
    setGiftSubtitleBtn_2: (state, subtitleBtn) => state.linkGiftBtn.subtitleBtn = subtitleBtn,
    setGiftLink: (state, link) => state.linkGiftBtn.link = link,
    setGiftRedFlagText_2: (state, text) => state.linkGiftBtn.redFlagText = text,

    setBtnLinkTitle: (state, titleBtn) => state.btnLink.titleBtn = titleBtn,
    setBtnLinkSubtitle: (state, subtitleBtn) => state.btnLink.subtitleBtn = subtitleBtn,
    setBtnLinkImgBtn: (state, imgBtn) => state.btnLink.imgBtn = imgBtn,
    setBtnLinkRedFlagText: (state, text) => state.btnLink.redFlagText = text,
    setBtnLink_link: (state, link) => state.btnLink.link = link,
    setIsShowBtnLink: (state, bool) => state.isShowBtnLink = bool,

    setIsShowGiftBtn: (state, bool) => state.isShowGiftBtn = bool,
    setIsShowGiftBtnLink: (state, bool) => state.isShowGiftBtnLink = bool,

    // ===================================================================

    setSeansText: (state, obj) => state.data[obj.idx].text = obj.value,
    setSource: (state, obj) => state.data[obj.idx].source = obj.value,
    setImgFon: (state, obj) => state.data[obj.idx].imgFon = obj.value,
    setDuration: (state, obj) => state.data[obj.idx].durationText = obj.value,
    setType: (state, obj) => state.data[obj.idx].type = obj.value,
    setPoster: (state, obj) => state.data[obj.idx].poster = obj.value,
    setImgBook: (state, obj) => state.data[obj.idx].imageBook = obj.value,
    setRecommendations: (state, obj) => state.data[obj.idx].recommendations = obj.value,
    setTitleSeans: (state, obj) => state.data[obj.idx].titleSeans = obj.value,
    setSubtitleSeans: (state, obj) => state.data[obj.idx].subtitleSeans = obj.value,
    setTitleBtn: (state, obj) => state.data[obj.idx].titleBtn = obj.value,
    setSubtitleBtn: (state, obj) => state.data[obj.idx].subtitleBtn = obj.value,
    setThrough: (state, obj) => state.data[obj.idx].through = obj.value,
    setImgBtn: (state, obj) => state.data[obj.idx].imgBtn = obj.value,
    setRedFlagText: (state, obj) => state.data[obj.idx].redFlagText = obj.value,
    setData: (state, obj) => state.data.push(obj),
    setServerData_: (state, arr) => state.data = arr,
    deleteBtn: (state, idx) => state.data.splice(idx, 1),
  },
  actions: {
    createSeans: async ({ commit, state }, {type: requestType, callback}) => {
      commit('toggleLoader', true)
      const { btnLink, isShowGiftBtnLink, isShowBtnLink, data, title, subtitle, pageName, isShowGiftBtn } = state
      const sendData = JSON.stringify({
        request_type: requestType,
        request: {
          data,
          title,
          btnLink,
          pageName,
          subtitle,
          isShowBtnLink,
          isShowGiftBtn,
          isShowGiftBtnLink,
        }
      }, null, 2)

      console.log('createSeans >>', sendData);

      const result = await fetch('https://marta-ng.com/packs/admin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: sendData
      })

      const resJson = result.json()
      resJson.then(a => {
        
        console.log(a)
        commit('toggleLoader', false)
        commit('setClearData', [{
          titleSeans: '',
          subtitleSeans: '',
          titleBtn: '',
          subtitleBtn: '',
          through: true,
          type: '',
          redFlagText: '',
          imgFon: '',
          imgBtn: '',
          durationText: '',
          imageBook: '',
          source: '',
          recommendations: '',
          text: '',
          poster: '',
        }])
        callback()
      })

    },
    getSeansByPageName: async ({ commit, state }, pageName) => {

      commit('toggleLoader', true)

      const sendData = JSON.stringify({
        request_type: 'getItem',
        pageName
      }, null, 2)

      console.log('getSeansByPageName >>>', sendData);

      const result = await fetch('https://marta-ng.com/packs/admin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: sendData
      })

      const resJson = result.json()
      resJson.then(a => {
        console.log('response data >> ', a.answer.data);

        commit('setPageTitle', a.answer.title)
        commit('setPageSubtitle', a.answer.subtitle)
        commit('setPageName', a.answer.pack_id || state.pageName)
        commit('setServerData', a.answer.data)
        commit('setIsShowBtnLink', a.answer.isShowBtnLink)
        commit('setIsShowGiftBtn', a.answer.isShowGiftBtn)
        commit('setIsShowGiftBtnLink', a.answer.isShowGiftBtnLink)
        commit('setBtnLink', a.answer.linkBtn[0])

        commit('toggleLoader', false)
      })
    },
    getAllSeanses: async ({ commit }) => {
      commit('toggleLoader', true)

      const sendData = JSON.stringify({
        request_type: 'getAll'
      }, null, 2)

      console.log('getAllSeanses >>>', sendData);

      const result = await fetch('https://marta-ng.com/packs/admin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: sendData
      })

      const resJson = result.json() /* ожидаем массив [{pageName: "kolybel"}, {pageName: "orugie"}]*/
      resJson.then(a => {
        console.log('response >> ', a);
        commit('setPacksList', a.answer)
        commit('toggleLoader', false)
      })

    },
    getGift_1: async ({ commit }) => {
      commit('toggleLoader', true)
      const sendData = JSON.stringify({ request_type: 'get_gift_1' })

      console.log('get_gift_1 >> ', sendData);
      console.log(sendData);

      const result = await fetch('https://marta-ng.com/packs/admin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: sendData
      })


      const resJson = result.json()
      resJson.then(a => {
        console.log('response get_gift_1 >>', a);
        commit('setGift_1_', a.answer.gift_btn)
        commit('toggleLoader', false)
      })

    },
    getGift_2: async ({ commit }) => {
      commit('toggleLoader', true)
      const sendData = JSON.stringify({ request_type: 'get_gift_2' })

      console.log('get_gift_2 >> ', sendData);

      const result = await fetch('https://marta-ng.com/packs/admin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: sendData
      })

      const resJson = result.json()
      resJson.then(a => {
        console.log('response get_gift_2 >>', a);
        commit('setGift_2_', a.answer)
        commit('toggleLoader', false)
      })

    },
    setGift_1: async ({ commit, state }) => {
      commit('toggleLoader', true)
      const { giftBtn } = state
      const sendData = JSON.stringify({
        request_type: 'gift_1',
        giftBtn
      }, null, 2)

      console.log('setGift_1 >> ', sendData);

      const result = await fetch('https://marta-ng.com/packs/admin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: sendData
      })

      const resJson = result.json()
      resJson.then(a => {
        console.log(a);
        commit('setGift_1_', {
          texts: [
            `<p class="text-large">Это решение для тебя, <br class="show_500">если наблюдаешь у себя:</p>
            <ul class="list_1">
              <li>
                  <div class="text-block-1">Недостаток энергии</div>
              </li>
              <li>
                  <div class="text-block-1">Потускнение волос</div>
              </li>
              <li>
                  <div class="text-block-1">Выпадение волос</div>
              </li>
              <li>
                  <div class="text-block-1">Повышение сухости кожи</div>
              </li>
              <li>
                  <div class="text-block-1">Тусклость/желтизну ногтей</div>
              </li>
              <li>
                  <div class="text-block-1">Уменьшение скорости ходьбы</div>
              </li>
              <li>
                  <div class="text-block-1">Затруднённость/невозможность бега</div>
              </li>
              <li>
                  <div class="text-block-1">Уменьшение амплитуды движений</div>
              </li>
              <li>
                  <div class="text-block-1">Скованность суставов</div>
              </li>
              <li>
                  <div class="text-block-1">Трудно делать приседания/сидеть на корточках</div>
              </li>
              <li>
                  <div class="text-block-1">Уменьшение силы в руках/в ногах</div>
              </li>
              <li>
                  <div class="text-block-1">Ухудшение зрения</div>
              </li>
              <li>
                  <div class="text-block-1">Ухудшение памяти</div>
              </li>
              <li>
                  <div class="text-block-1">Скачки давления</div>
              </li>
              <li>
                  <div class="text-block-1">Скачки в настроении</div>
              </li>
              <li>
                  <div class="text-block-1">Раздражительность</div>
              </li>
              <li>
                  <div class="text-block-1">Тревожность</div>
              </li>
              <li>
                  <div class="text-block-1">Панические атаки</div>
              </li>
            </ul>`,
            `<div class="text-block-2">
              Получить настрой «Тотальное Омоложение» <br class="br">
              <strong class="bold-text-517">можно через Telegram.</strong> <br class="br">
              Только через него. Если ты не пользуешься этим мессенджером, <br>
              то тут варианта два: просто не получать этот подарок или установить <br>
              <a href="https://desktop.telegram.org/" target="_blank"><em class="italic-text dop-5">Telegram</em> </a>
              на компьютер или телефон и получить их. 
            </div>`,
            `<strong>Что сделать для получения бонуса <br>
              «Тотальное омоложение»</strong>`,
          ],
          youtube: 'HnQklOHBCeI',
          telegram: 'https://t.me/marta_ng/844',
          img: 'https://api.selcdn.ru/v1/SEL_53369/mng/receive/images/total_omolozh.png',
          title: `ВАМ ПОДАРОК:`,
          subtitle: 'ТОТАЛЬНОЕ ОМОЛОЖЕНИЕ',
          titleBtn: `ТОТАЛЬНОЕ ОМОЛОЖЕНИЕ ОРГАНИЗМА`,
          subtitleBtn: 'аудиосеанс',
          imgBtn: 'https://api.selcdn.ru/v1/SEL_53369/mng/receive/images/__audio__.png',
          redFlagText: 'Необъявленный подарок <span style="font-family: arial;">№</span>1'
        })
        commit('toggleLoader', false)
      })

    },
    setGift_2: async ({ commit, state }) => {
      commit('toggleLoader', true)
      const { linkGiftBtn } = state
      const sendData = JSON.stringify({
        request_type: 'gift_2',
        linkGiftBtn
      }, null, 2)

      console.log('setGift_2 >> ', sendData);

      const result = await fetch('https://marta-ng.com/packs/admin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: sendData
      })

      const resJson = result.json()
      resJson.then(a => {
        console.log(a);
        commit('setGift_2_', {
          redFlagText: 'Необъявленный подарок <span style="font-family: arial;">№</span>2',
          titleBtn: `ЖЕНСКИЙ ЖУРНАЛ`,
          subtitleBtn: ``,
          imgBtn: 'https://api.selcdn.ru/v1/SEL_53369/mng/receive/images/__zh__.png',
          link: 'https://marta-ng.com/zhenskii_zhurnal/'
        })
        commit('toggleLoader', false)
      })

    },
  },
  modules: {
    Admin,
  }
})
