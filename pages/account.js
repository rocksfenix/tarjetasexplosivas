import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import api from '../client-util/api'
import { getUser } from '../client-util/session'
import Navegation from '../components/Navegation'
import SeoHead from '../components/SeoHead'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import CookiesConsent from '../components/CookiesConsent'

moment.locale('es')

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
`

const Information = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 1em auto;
`

const Invoices = styled.div`
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
`

const InvoiceBox = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50px;
`

const Amount = styled.div`
  width: 100px;
`
const ID = styled.div`
  width: 100px;
`
const Currency = styled.div`
  width: 100px;
`
const Credits = styled.div`
  width: 100px;
`
const Date = styled.div`
  width: 100px;
`

const InvoiceBoxHeader = styled.div`
  display: flex;
  justify-content: space-around;
  background: #e8e8e8;
  height: 49px;
  align-items: center;
`

const InvoicesHeader = () => (
  <InvoiceBoxHeader>
    <ID>ID</ID>
    <Amount>Cantidad</Amount>
    <Currency>Moneda</Currency>
    <Credits>Creditos</Credits>
    <Date>Fecha</Date>
  </InvoiceBoxHeader>
)

const Invoice = ({ invoice }) => (
  <InvoiceBox>
    <ID>{ invoice._id }</ID>
    <Amount>$ { invoice.amount }</Amount>
    <Currency>{ invoice.currency }</Currency>
    <Credits>{ invoice.credits }</Credits>
    <Date>{ moment(invoice.createAt).format('D MMM YYYY') }</Date>
  </InvoiceBox>
)

class App extends Component {
  static async getInitialProps ({ req, res }) {
    const user = getUser(req)

    if (!user) {
      if (res) {
        res.writeHead(302, {
          Location: '/login'
        })
        res.end()
      } else {
        Router.push('/login')
      }
    }
    return {
      user
    }
  }

  state = {
    user: {},
    invoices: [],
    hasMoreInvoices: false,
    skipInvoices: 0
  }

  componentDidMount () {
    this.loadData()
  }

  loadData = async () => {
    const { user } = await api.User.get()
    const { invoices, hasMore } = await api.Invoice.getAll()

    this.setState({ user, invoices, hasMoreInvoices: hasMore })
  }

  loadMore = () => {
    this.setState({ skipInvoices: this.state.skipInvoices + 15 }, this.fetchTickets)
  }

  fetchTickets = async () => {
    const res = await api.Invoice.getAll(this.state.skipInvoices)
    console.log(res)
    this.setState({
      invoices: [ ...this.state.invoices, ...res.invoices ],
      hasMoreInvoices: res.hasMore
    })
  }

  render () {
    // console.log(this.state)
    return (
      <Panel>
        <SeoHead title='Cuenta' />
        <Navegation user={this.props.user} />
        <Information>
          <h1>{this.state.user.fullname }</h1>
          <h1>{this.state.user.email }</h1>
          <InvoicesHeader />
          <Invoices id='scrollableInvoices'>
            <InfiniteScroll
              dataLength={this.state.invoices.length}
              next={this.loadMore}
              hasMore={this.state.hasMoreInvoices}
              scrollableTarget='scrollableInvoices'
              loader={'loading'}
            >
              { !this.state.invoices.length ? <span>Wops! Aun no tienes ningun ticket</span> : null }
              {
                this.state.invoices.map(invoice => (
                  <Invoice key={invoice._id} invoice={invoice} />
                ))
              }
            </InfiniteScroll>

          </Invoices>
        </Information>
        <CookiesConsent />
      </Panel>
    )
  }
}

export default App
