import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import api from '../client-util/api'
import { getUser } from '../client-util/session'
import SeoHead from '../components/SeoHead'
import Cube from '../components/Cube'
import WorkFinish from '../components/WorkFinish'
import PaymentModal from '../components/PaymentModal'
import CompilationModal from '../components/CompilationModal'
import PaymentNotification from '../components/PaymentNotification'
import Navegation from '../components/Navegation'
import MenuMobile from '../components/Navegation/Menu/Mobile'
import PhotoSelect from '../components/PhotoSelect'
import TexturesGallery from '../components/TexturesGallery'
import CookiesConsent from '../components/CookiesConsent'
import party from '../client-util/party'

const Panel = styled.div`
  width: 100%;
  height: ${p => p.height + 'px'};
  overflow: hidden;
  position: relative;
  touch-callout: none;
`

const Menu = styled.div`
  position: absolute;
  height: 50px;
  top: 0;
  right: 0;
  z-index: 1000;
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

    if (req) {
      return { user, params: req.params, query: req.query }
    } else {
      const url = window.location.href.split('/')
      return {
        user,
        params: {
          id: url[4],
          modal: url[5],
          step: url[6]
        }
      }
    }
  }

  state = {
    showNotificationPayment: true,
    isFinish: false,
    cubeClassName: '',
    user: {},
    work: {
      side0: {
        src: null
      },
      side1: {
        src: null
      },
      side2: {
        src: null
      },
      side3: {
        src: null
      },
      side4: {
        src: null
      },
      side5: {
        src: null
      }
    },

    // Cara en foco
    sideInFocus: {},
    sideInFocusName: '',
    modal: '',

    // Params
    params: {
      id: null,
      modal: null,
      step: null
    }
  }

  componentDidMount = async () => {
    const { user } = await api.User.get()
    this.setState({ user })

    console.log(user)
    // const user = {}
    if (process.browser) {
      this.setState({
        height: window.innerHeight,
        width: window.innerWidth
      })
      window.addEventListener('resize', this.resize)
      window.addEventListener('popstate', this.popstate)

      if ((this.state.isFinish || this.state.work.location) && !this.state.paymentModal) {
        party()
      }
    }

    this.props.params.id === 'new'
      ? this.createNew()
      : this.load()

    this.setState({
      prams: this.props.params
    })
  }

  componentWillUnmount () {
    window.removeEventListener('popstate', this.popstate)
  }

  popstate = () => {
    const url = window.location.href.split('/')
    const params = {
      id: url[4], // work id
      modal: url[5], // photoSelect
      source: url[6], // facebook designs gallery
      subId: url[7]
    }

    if (!params.modal) {
      this.setState({
        modal: '',
        paymentModal: null,
        cubeClassName: ''
      })
    }
  }

  setUser = (user) => {
    this.setState({ user })
  }

  resize = () => this.setState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  createNew = async () => {
    const res = await api.Work.post()
    Router.push(`/cube-app?id=${res.work._id}`, `/cube-app/${res.work._id}`)
    this.setState({ work: res.work }, () => {
      this.check()
    })
  }

  load = async () => {
    const res = await api.Work.getById(this.props.params.id)
    this.setState({ work: res.work }, () => {
      this.check()
    })
  }

  onPopState = () => {
    const url = window.location.href.split('/')
    const params = {
      id: url[4],
      modal: url[5],
      step: url[6]
    }

    if (!params.modal) {
      this.closeModal()
    }

    this.setState({ params })
  }

  openModal = (sideInFocusName) => {
    const isConfetii = sideInFocusName === 'side0' || sideInFocusName === 'side5'
    const modal = isConfetii ? 'confetii' : 'photoSelect'

    Router.push(
      `/cube-app?id=${this.state.work._id}&modal=${modal}`,
      `/cube-app/${this.state.work._id}/${modal}`
    )
    this.setState({
      modal,
      sideInFocus: this.state.work[sideInFocusName],
      sideInFocusName
    })
  }

  closeModal = () => {
    Router.push(
      `/cube-app?id=${this.state.work._id}`,
      `/cube-app/${this.state.work._id}`
    )
    this.setState({ modal: '' })
  }

  updateDB = async (src) => {
    const { sideInFocusName } = this.state
    const work = {
      ...this.state.work,
      [sideInFocusName]: { src }
    }
    this.setState({ work, modal: '' })

    // solo actualizar en db
    // console.log(work)
    const res = await api.Work.update(work)
    this.check()
    console.log(res)
  }

  // el src es el blob de imagen cortada
  onUploadPhoto = async (resize, type = 'photo') => {
    this.closeModal()
    const { sideInFocusName } = this.state

    let work = {
      ...this.state.work,
      [sideInFocusName]: { src: resize.imgURL, uploading: true }
    }
    this.setState({ work, modal: '' })

    // debugger
    const formData = new window.FormData()
    formData.append('image', resize.blob)
    const res = await api.Photo.upload(this.state.work._id, sideInFocusName, type, formData)
    this.check()
    if (this.state.modal === '') {
      // Si no se esta mostrando el modal
      // actualiza el uploading
      console.log(res)

      this.setState({ work, modal: '' })
    }
    work[sideInFocusName] = { src: res.photo.location, uploading: false }
  }

  check = () => {
    const { side0, side1, side2, side3, side4, side5 } = this.state.work
    if (side0.src && side1.src && side2.src && side3.src && side4.src && side5.src) {
      // TODO habilidar cuando este lista para produccion
      this.setState({ isFinish: true })
      party()
      window.setTimeout(() => party(), 4000)
    }
  }

  openPaymentModal= () => {
    // const isNewCustomer = false
    if (this.state.user.credits > 0) {
      Router.push(
        `/cube-app?id=${this.state.work._id}&modal=${'compile-modal'}`,
        `/cube-app/${this.state.work._id}/${'compile-modal'}`
      )
      this.setState({ paymentModal: 'compile-modal', cubeClassName: 'cubeFinish' })
    } else {
      // Renderizar aqui el modal donde solo obtiene los creditos
      Router.push(
        `/cube-app?id=${this.state.work._id}&modal=${'get-credits-modal'}`,
        `/cube-app/${this.state.work._id}/${'get-credits-modal'}`
      )
      this.setState({ paymentModal: 'get-credits-modal', cubeClassName: 'cubeFinish' })
    }
  }

  onCompiled = (location) => {
    this.setState({
      // Se descuenta el credito
      user: {
        ...this.state.user,
        credits: this.state.user.credits - 1
      },
      // Guardamos locacion para que el
      // usuario al volver ya que tenga el boton de descarga directa
      work: {
        ...this.state.work,
        location
      },

      // Se oculta el modal
      paymentModal: null,
      cubeClassName: ''
    })
  }

  onSetEnvelope = async (src) => {
    const work = {
      ...this.state.work,
      envelope: src
    }

    this.setState({ work })

    // solo actualizar en db
    const res = await api.Work.update(work)
    this.check()
    console.log(res)
  }

  closeNotificationPayment = () => this.setState({
    showNotificationPayment: false
  })

  render () {
    const { modal, work, paymentModal } = this.state
    // console.log(this.state.work)
    return (
      <Panel height={this.state.height}>
        <SeoHead title='Diseña tu tarjeta Explosiva' />
        { this.state.width > 900
          ? <Navegation user={this.state.user} showCredits />
          : <Menu><MenuMobile user={this.state.user} /></Menu>
        }
        <PaymentNotification
          query={this.props.query}
          user={this.state.user}
          show={this.state.showNotificationPayment}
          closeNotificationPayment={this.closeNotificationPayment}
        />
        <WorkFinish
          show={(this.state.isFinish || this.state.work.location) && !paymentModal}
          openPaymentModal={this.openPaymentModal}
          work={this.state.work}
        />
        <CompilationModal
          show={this.state.paymentModal === 'compile-modal'}
          work={this.state.work}
          user={this.state.user}
          onCompiled={this.onCompiled}
          onSetEnvelope={this.onSetEnvelope}
        />
        <PaymentModal
          show={this.state.paymentModal === 'get-credits-modal'}
          work={this.state.work}
        />
        <TexturesGallery
          show={modal === 'confetii'}
          closeModal={this.closeModal}
          work={this.state.work}
          user={this.state.user}
          setUser={this.setUser}
          onUploadPhoto={this.onUploadPhoto}
          updateDB={this.updateDB}
        />
        <PhotoSelect
          show={modal === 'photoSelect'}
          closeModal={this.closeModal}
          work={this.state.work}
          user={this.state.user}
          setUser={this.setUser}
          onUploadPhoto={this.onUploadPhoto}
          updateDB={this.updateDB}
        />
        {
          !work._id
            ? null
            : (
              <Cube
                onUploadPhoto={this.uploadPhoto}
                onOpenModal={this.openModal}
                work={work}
                className={this.state.cubeClassName}
                showModal={this.state.modal !== ''}
                isFinish={this.state.isFinish}
              />
            )
        }
        <CookiesConsent />
      </Panel>
    )
  }
}

export default App
