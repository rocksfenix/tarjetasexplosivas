import React from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import api from '../../client-util/api'
import Router from 'next/router'
import GalleryPanel from '../GalleryPanel'

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
`

const Text = styled.div`
  color: #FFF;
  margin-top: 6em;
  font-size: 20px;
`

class GalleryComponent extends React.Component {
  state = {
    textures: [],
    hasMore: true,
    noPhotos: false,
    skip: 0,
    imageSelected: null
    // imageSelectedSource: 'source'
  }

  async componentDidMount () {
    this.fetchPhotos()
  }

  loadMore = () => {
    this.setState({ skip: this.state.skip + 15 }, this.fetchPhotos)
  }

  fetchPhotos = async () => {
    const res = await api.Texture.getAll(this.state.skip)
    this.setState({
      textures: [ ...this.state.textures, ...res.textures ],
      hasMore: res.hasMore,
      noPhotos: res.textures.length === 0
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
        `/cube-app?id=${this.props.work._id}&modal=confetii`,
        `/cube-app/${this.props.work._id}/confetii`
      )
      this.props.onlySave(this.state.imageSelected)
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
    return (
      <GalleryPanel
        onBack={this.onBack}
        onConfirm={this.selectPhoto}
        confirmActive={this.state.imageSelected}
        onResize={this.onResize}
      >
        <Albums>
          <InfiniteScroll
            dataLength={this.state.textures.length}
            next={this.loadMore}
            hasMore={this.state.hasMore}
            scrollableTarget='scrollableGallery'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              paddingTop: '80px',
              overflowY: 'auto'

            }}
            loader={'loading'}
          >
            { this.state.noPhotos ? <Text>Wops! Aun no tienes ninguna foto.</Text> : null }
            { this.state.textures.map(texture => (
              <Photo
                key={texture.key}
                src={texture.location}
                onClick={this.focusPhoto}
                isSelected={this.state.imageSelected === texture.location}
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
