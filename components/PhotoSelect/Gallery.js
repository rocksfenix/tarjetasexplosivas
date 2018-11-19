import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import api from '../../client-util/api'
import GalleryPanel from '../GalleryPanel'
// import { setCookie } from '../../client-util/session'

const Albums = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #FFF;
  z-index: 100;

`
const Photo = styled.img`
  width: ${p => `${p.size}px` || '200px'};
  height: ${p => `${p.size}px` || '200px'};
  box-sizing: border-box;
  margin: 2px;
  background: url('/static/img/default-photo.svg');
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  border: ${p => p.isSelected ? '3px solid #0057ff' : '3px solid transparent'};
  :hover {
    /* border: 1px solid #FFF; */
  }
`

const Text = styled.div`
  color: #333;
  margin-top: 6em;
  font-size: 20px;
`

class GalleryComponent extends React.Component {
  state = {
    photos: [],
    hasMore: true,
    noPhotos: false,
    skip: 0,
    imageSelected: null,
    photoSize: 0
  }

  async componentDidMount () {
    this.fetchPhotos()
  }

  loadMore = () => {
    this.setState({ skip: this.state.skip + 15 }, this.fetchPhotos)
  }

  fetchPhotos = async () => {
    const res = await api.Photo.getAll(this.state.skip)
    this.setState({
      photos: [ ...this.state.photos, ...res.photos ],
      hasMore: res.hasMore,
      noPhotos: res.photos.length === 0
    })
  }

  focusPhoto = (e) => {
    /* Selected here */
    this.setState({
      imageSelected: e.target.src
    })
  }

  selectPhoto = () => {
    if (this.state.imageSelected) {
      Router.replace(
        `/cube-app?id=${this.props.work._id}&modal=photoSelect`,
        `/cube-app/${this.props.work._id}/photoSelect`
      )
      this.props.onSetPhoto(this.state.imageSelected)
      this.setState({ imageSelected: null })
    } else {
      window.alert('Selecciona primero una imagen')
    }
  }

  onBack = () => {
    window.history.back()
  }

  onResize = (photoSize) => {
    this.setState({ photoSize })
  }

  render () {
    console.log(this.state)
    return (
      <GalleryPanel
        onBack={this.onBack}
        onConfirm={this.selectPhoto}
        confirmActive={this.state.imageSelected}
        onResize={this.onResize}
      >
        <Albums id='g-panel'>
          <InfiniteScroll
            dataLength={this.state.photos.length}
            next={this.loadMore}
            hasMore={this.state.hasMore}

            scrollableTarget='scrollableGallery'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              overflowY: 'auto',
              'flexGrow': 1

            }}
            loader={'loading'}
          >
            { !this.state.photos ? <Text>Wops! Aun no tienes ninguna foto.</Text> : null }
            { this.state.photos.map(photo => (
              <Photo
                key={photo.key}
                src={photo.location}
                onClick={this.focusPhoto}
                isSelected={this.state.imageSelected === photo.location}
                size={this.state.photoSize}
              />
            ))}
          </InfiniteScroll>
        </Albums>
      </GalleryPanel>
    )
  }
}

export default GalleryComponent
