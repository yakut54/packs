export default {
  install: (app, options) => {
    app.config.globalProperties.$title = (title) => {
      const reg = /<br class="_br">|<br>|<br class="show_500">/g
      const newTitle = title.replaceAll(reg, '')
		  document.title = newTitle
    }
  }
}