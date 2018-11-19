import NextHead from 'next/head'
import React, { Component } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import './SeoHead.css'

Router.onRouteChangeStart = (url) => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default class SeoHead extends Component {
  render () {
    const title = this.props.title || 'Tarjetas Explosivas'
    const {
      description = this.props.description || 'Crea tus propias tarjetas explosivas',
      children,
      canonical,
      url = ''
    } = this.props
    const properCanonical = canonical || url
    return (
      <NextHead>
        <title>
          {title}
        </title>
        <meta name='description' content={description} />
        {children}
        <link
          rel='canonical'
          href={`https://tarjetasExplosivas.com${properCanonical}`}
        />
      </NextHead>
    )
  }
}
