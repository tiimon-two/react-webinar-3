import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      lang: 'ru',
      languages: {
        en: 'en',
        ru: 'ru'
      }
    }
  }

  changeLang() {
    let lang;
    this.getState().lang === 'en' ? lang = 'ru' : lang = 'en';
    this.setState({
      ...this.getState(),
      lang: lang
    })
  }
}

export default Language;