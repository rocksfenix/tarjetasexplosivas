import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage, req }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    let csrf = 1

    if (req.csrfToken) csrf = req.csrfToken()

    return { ...page, csrf, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no' />
          <link rel='stylesheet' type='text/css' href='/static/global.css' />
          <script src='https://www.google.com/recaptcha/api.js' />
          <script src='https://fast.wistia.com/embed/medias/hcr56y3zbh.jsonp' async />
          <script src='https://fast.wistia.com/assets/external/E-v1.js' async />
          <meta name='csrf-token' content={this.props.csrf} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src='/static/js/fb.js' async />
        </body>
      </html>
    )
  }
}