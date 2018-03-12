import * as React from 'react'
import { createPortal, } from 'react-dom'
import { I18n, } from 'react-i18next'

import { Header, Logo, Navs, NavItem, } from '../../styled/Common'
import { log, } from '../../utils'
import { slogan as imgs, } from '../../config/imgMap'

const css = require('../../styles/slogan')

const localeList = [
  {
    label: 'english',
    path: 'en',
  },
  {
    label: '中文',
    path: 'zh',
  },
]
const localePathList = ['en', 'zh', ]
// const sloganWord = 'The Common Knowledge Base of the 7.6 Billion People.'
const sloganWordTimeout = 1500

export default class extends React.Component {
  state = {
    loaded: false,
    sloganWord: '',
    sloganWordLoaded: false,
    actionLittleImgCss: '',
    actionBigImgCss: '',
  }

  componentDidMount () {
    const { autoRenderSloganWord, lang, } = this
    setTimeout(() => {
      this.setState(() => ({ loaded: true, }))
    }, 0)
    window.onload = autoRenderSloganWord
    if (!localePathList.includes(lang.language)) {
      lang.changeLanguage('en')
    }
  }

  t = null as any
  lang = {
    language: '',
  } as any

  Locale = (props) => {
    const { t, lang, } = this
    return (
      <div className={css.locale} >
        {localeList.map((item) => {
          const { path, label, } = item
          return (
            <div
              className={lang.language === path ? css.active : ''}
              data-localeitem={path}
              onClick={() => lang.changeLanguage(path)}
            >
              {label}
            </div>
          )
        })}
      </div>
    )
  }

  autoRenderSloganWord = () => {
    const { t, } = this

    const promise = new Promise((resolve, reject) => {
      const word = t('word').split('')
      const len = word.length
      const onetime = sloganWordTimeout / len
      word.forEach((char, i) => {
        setTimeout(() => {
          this.setState({
            sloganWord: this.state.sloganWord + char,
          })
        }, i * onetime)
      })
      // const endTime = (t('word').length + 1) * sloganWordTimeout
      this.setState({
        actionBigImgCss: css.actionBefore,
      })
      setTimeout(() => {
        this.setState({
          actionLittleImgCss: css.actionBefore,
        })
        setTimeout(() => {
          this.setState({
            actionLittleImgCss: `${css.actionBefore} ${css.action}`,
          })
        }, 100)
      }, 2000)
      setTimeout(() => {
        resolve()
      }, sloganWordTimeout)
    })

    promise.then(() => {
      this.setState({
        sloganWordLoaded: true,
      })
    })
  }

  SloganWord = () => {
    const { t, } = this
    const { sloganWordLoaded, } = this.state
    return (
      <div className={`${css.sloganWord} fontBold`}>
        <img src={imgs.quo} alt="quotation mark" />
        <span className={sloganWordLoaded ? css.hidden : ''}>
          {this.state.sloganWord}
        </span>
        <span className={sloganWordLoaded ? '' : css.hidden}>{t('word')}</span>
      </div>
    )
  }

  Description = (props) => {
    const { SloganWord, } = this
    const { t, lang, } = this
    return (
      <div className={css.description}>
        <div className={css.image}>
          <img src={imgs.logo} alt="logo" />
        </div>
        <SloganWord />
        <div className={css.text}>{t('desc')}</div>
      </div>
    )
  }

  SloganImg = (props) => {
    const { actionBigImgCss, actionLittleImgCss, } = this.state
    return (
      //   需要添加动效
      <div className={css.sloganImg}>
        <img
          className={`${css.n1} ${css.little} ${actionLittleImgCss}`}
          src={imgs.action1}
          alt=""
        />
        <img
          className={`${css.n2} ${css.little} ${actionLittleImgCss}`}
          src={imgs.action2}
          alt=""
        />
        <img
          className={`${css.n3} ${css.little} ${actionLittleImgCss}`}
          src={imgs.action3}
          alt=""
        />
        <img
          className={`${css.n4} ${css.little} ${actionLittleImgCss}`}
          src={imgs.action4}
          alt=""
        />
        <img
          className={`${css.n5} ${css.little} ${actionLittleImgCss}`}
          src={imgs.action5}
          alt=""
        />
        <img
          className={`${css.n6} ${css.little} ${actionLittleImgCss}`}
          src={imgs.action6}
          alt=""
        />
        <img
          className={`${css.n7} ${css.little} ${actionLittleImgCss}`}
          src={imgs.action7}
          alt=""
        />
        <img
          className={`${css.big} ${actionBigImgCss}`}
          src={imgs.slogan}
          alt=""
        />
      </div>
    )
  }

  Subscribe = (props) => {
    const { t, lang, } = this
    const subscribe = t('translations:subscribe')
    return (
      <div className={css.subscribe}>
        <div className={`${css.line} ${css.left}`} />
        <div className={css.buttonOuter}>
          <div className={css.buttonInner}>{subscribe}</div>
          <div className={css.diagonal} />
        </div>
        <div className={`${css.line} ${css.right}`} />
      </div>
    )
  }

  render () {
    const { props, Locale, Description, SloganImg, Subscribe, } = this
    const { loaded, } = this.state
    return (
      <I18n ns="slogan">
        {(t, { i18n, }) => {
          this.t = t
          this.lang = i18n
          return (
            <div
              className={css.slogan}
              style={{ backgroundImage: `url(${imgs.bg}`, }}
            >
              <Locale />
              <Description />
              <SloganImg />
            </div>
          )
        }}
      </I18n>
    )
  }
}
