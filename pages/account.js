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
import InfoAccount from '../components/Account/InfoAccount'
import RemoveModal from '../components/Account/RemoveModal'

moment.locale('es')

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
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

const Text = styled.div`
  font-size: 25px;
  font-weight: bold;

  @media(max-width: 900px) {
    font-size: 18px;
    padding: 1em 0.5em;
  }
`

const Buttons = styled.div`
  margin: 1em 0;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 1em;

  @media(max-width: 900px) {
    padding: 0;
    width: 95%;
    margin: 1em auto;
  }
`

const CreditsBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #c5c5c5;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const CreditsBoxNum = styled.div`
  font-size: 40px;
`
const CreditsBoxText = styled.div`
  font-size: 18px;
`

const CreditsNum = ({ credits }) => (
  <CreditsBox>
    <CreditsBoxNum>{ credits }</CreditsBoxNum>
    <CreditsBoxText>Creditos</CreditsBoxText>
  </CreditsBox>
)

const Row = styled.div`
  width: 100%;
  width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  @media(max-width: 900px) {
    flex-direction: column;
  }
`

const Column = styled.div`
  width: 50%;

  @media(max-width: 900px) {
    width: 100%;
  }
`

const LinkGetData = styled.a`
  background: #3d86bb;
  color: #FFF;
  text-decoration: none;
  text-align: center;
  line-height: 2.5;
  border-radius: 4px;
  margin: .5em 0;
`

const ButtonModify = styled.button`
  background: white;
  font-size: 17px;
  line-height: 2;
  border: 2px solid #989898;
  border-radius: 5px;
  margin: 0.5em 0;
  cursor: pointer;
`

const ButtonDelete = styled.button`
  background: #F44336;
  font-size: 17px;
  line-height: 2;
  border: 2px solid #c72626;
  border-radius: 5px;
  color: #FFF;
  margin: 0.5em 0;
  cursor: pointer;
`

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
    skipInvoices: 0,
    hasFetched: false
  }

  componentDidMount () {
    this.loadData()
  }

  loadData = async () => {
    const { user } = await api.User.get()
    // console.log(user)
    const { invoices, hasMore } = await api.Invoice.getAll()

    this.setState({ user, invoices, hasMoreInvoices: hasMore, hasFetched: true })
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

  removeAndForgotten = async () => {
    const res = await api.User.deleteAndForgotten()

    if (res.error) {
      this.setState({ error: res.error })
    } else {
      window.alert('Cuenta Eliminada Exitosamente')
      window.location = '/logout'
    }
  }

  acceptRemove = (key, value) => {
    this.setState({ acceptRemove: value })
  }

  removeAccount = () => {
    if (this.state.acceptRemove) {
      this.removeAndForgotten()
    } else {
      window.alert('Debes aceptar lo anterior para poder eliminar tu cuenta')
    }
  }

  closeModal = () => {
    this.setState({ modal: '', acceptRemove: false })
  }

  showForgottenModal = () => {
    this.setState({ modal: 'forgotten' })
  }

  showCorrectionModal = () => {
    this.setState({ modal: 'correction' })
  }

  updateUser = async (userData) => {
    this.setState({ modal: '' })

    const data = {
      ...this.state.user,
      ...userData
    }
    const res = await api.User.update(data)

    this.setState({ user: data })
    console.log(res)
  }

  render () {
    console.log(this.state)
    return (
      <Panel>
        <SeoHead title='Cuenta' />
        <Navegation user={this.props.user} />
        <RemoveModal
          show={this.state.modal === 'forgotten'}
          onAccept={this.acceptRemove}
          onRemove={this.removeAccount}
          onDiscart={this.closeModal}
        />

        {
          this.state.modal === 'correction'
            ? (
              <InfoAccount
                closeModal={this.closeModal}
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )
            : null
        }

        <Information>
          <Row>
            <Column>
              <Text>{this.state.user.fullname }</Text>
              <Text>{this.state.user.email }</Text>
            </Column>
            <Column>
              <CreditsNum credits={this.state.user.credits} />
            </Column>
          </Row>
          <Buttons>
            <LinkGetData download href='/api/user/datos.csv'>Descargar mis datos personales</LinkGetData>
            <ButtonModify onClick={this.showCorrectionModal}>Correccion de Informacion</ButtonModify>
            <ButtonDelete onClick={this.showForgottenModal}>Eliminar mi Cuenta</ButtonDelete>
          </Buttons>
          <InvoicesHeader />
          <Invoices id='scrollableInvoices'>
            <InfiniteScroll
              dataLength={this.state.invoices.length}
              next={this.loadMore}
              hasMore={this.state.hasMoreInvoices}
              scrollableTarget='scrollableInvoices'
              loader={'loading'}
            >
              {
                !this.state.invoices.length && this.state.hasFetched
                  ? <span>Wops! Aun no tienes ningun ticket</span>
                  : <span>Cargando...</span>
              }
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
