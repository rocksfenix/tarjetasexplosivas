import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import GalleryPanel from '../GalleryPanel'
import api from '../../client-util/api'
import { setCookie } from '../../client-util/session'
import { MoonLoader } from 'react-spinners'
import config from '../../config'

const Albums = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  background: #FFF;
  z-index: 100;
  justify-content: initial;
  align-items: end;
`

const CoverBox = styled.div`
  box-sizing: border-box;
  margin: 2px;
  background: url('https://d39p6dv27gzlaf.cloudfront.net/static/img/default-photo.svg');
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  border: ${p => p.isSelected ? '3px solid #0057ff' : '3px solid transparent'};
  position: relative;
`

const CoverWrap = styled.div`
  width: 100%;
  height: 100%;
  background: url('https://d39p6dv27gzlaf.cloudfront.net/static/img/default-photo.svg');
  overflow: hidden;
  position: relative;
`

const CoverImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: ${p => `url(${p.src})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const AlbumName = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 2;
  background-color: rgba(0, 87, 255, 0.88);
  color: #FFF;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    font-size: 14px;
  }
`

const Cover = ({ album, id, source, onClick, isSelected, size }) => (
  <CoverBox
    isSelected={isSelected}
    onClick={() => {
      onClick(album, id, source)
    }}
    style={{ width: `${size}px`, height: `${size}px` }}
  >
    <CoverWrap>
      <AlbumName>{album.name}</AlbumName>
      <CoverImage src={source} alt='facebook image' />
    </CoverWrap>
  </CoverBox>
)

const FacebookButton = styled.button`
  background: #4267b2;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 0.8em 1.5em;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  margin: 0.5em 0;
  border-radius: 3px;
`

class FacebookComponent extends React.Component {
  state = {
    albums: [],
    loading: false,
    hasMore: true,
    skip: 0,
    requiredFBToken: false
  }

  componentDidMount () {
    this.getAlbums()
    if (process.browser) {
      window.addEventListener('popstate', this.popstate)
    }
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

    if (!params.subId) {
      this.setState({ albumDetails: false, imageSelected: null })
    }
  }

  loadMore = () => {
  }

  select = (e) => {
    this.props.onSelect(e.target.src)
  }

  componentDidUpdate () {
    if (!this.props.params) return
    if (!this.props.params.subId) {
      this.setState({ albumDetails: false })
    }
  }

  authorize = () => {
    window.FB.login(async (res) => {
      if (res.authResponse) {
        const response = await api.User.updateFBAccessToken(res.authResponse.accessToken)
        // TODO IMPORTANTE REVISAR QUE OBTENEMOS DE AKI EN BACKEND
        // setCookie('jwt', response.token)
        // setCookie('jwt-rfs', response.refreshToken)
        setCookie(config.user_cookie_key, response.user)

        this.props.setUser(response.user)

        this.setState({ requiredFBToken: false })
        this.getAlbums()
      } else {
        window.alert('User cancelled login or did not fully authorize.')
      }
    }, { scope: 'user_photos', cookie: true })
  }

  getAlbums = () => {
    this.setState({ loading: true })

    window.FB.api(
      '/me',
      'GET',
      {
        'fields': 'albums{photos{images},name}',
        'access_token': this.props.user.facebook_access_token
      },
      (res) => {
        // Insert your code here
        if (res.error) {
          // show authorize button here
          this.setState({ requiredFBToken: true, loading: false })
        } else {
          this.setState({ albums: res.albums, loading: false })
        }
      }
    )
  }

  albumDetails = (album) => {
    const modal = 'facebook'
    Router.push(
      `/cube-app?id=${this.props.work._id}&modal=photoSelect&source=${modal}&subId=${album.id}`,
      `/cube-app/${this.props.work._id}/photoSelect/${modal}/${album.id}`
    )

    this.setState({
      albumDetails: true,
      albumInFocus: album
    })
  }

  selectPhoto = () => {
    if (this.state.imageSelected) {
      Router.replace(
        `/cube-app?id=${this.props.work._id}&modal=photoSelect`,
        `/cube-app/${this.props.work._id}/photoSelect`
      )
      this.props.onSetPhoto(this.state.imageSelected)
      this.setState({ albumDetails: false, imageSelected: null })
    } else {
      window.alert('Selecciona primero una imagen')
    }
  }

  onBack = () => {
    window.history.back()
  }

  focusPhoto = (el, id, source) => {
    /* Selected here */
    this.setState({
      imageSelected: source
    })
  }

  onResize = (photoSize) => {
    this.setState({ photoSize })
  }

  render () {
    if (!this.props.user.facebook_access_token || this.state.requiredFBToken) {
      return (
        <div>
          <FacebookButton onClick={this.authorize}>Obtener de Facebook</FacebookButton>
        </div>
      )
    }

    if (this.state.loading || !this.state.albums.data) return <MoonLoader color='#0057ff' />

    return (
      <GalleryPanel
        onBack={this.onBack}
        onConfirm={this.selectPhoto}
        confirmActive={this.state.imageSelected}
        onResize={this.onResize}
      >
        <Albums>
          { this.state.albums.data.map(album => (
            <Cover
              key={album.id}
              album={album}
              id={album.id}
              source={album.photos.data[0].images[0].source}
              onClick={this.albumDetails}
              size={this.state.photoSize}
            />
          ))}
        </Albums>
        {
          this.state.albumDetails
            ? (
              <Albums>
                { this.state.albumInFocus.photos.data.map(photo => (
                  <Cover
                    key={photo.id}
                    album={photo}
                    id={photo.id}
                    source={photo.images[0].source}
                    isSelected={this.state.imageSelected === photo.images[0].source}
                    onClick={this.focusPhoto}
                    size={this.state.photoSize}
                  />
                ))}
              </Albums>
            )
            : null
        }
      </GalleryPanel>
    )
  }
}

export default FacebookComponent
