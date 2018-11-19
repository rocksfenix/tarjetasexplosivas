import React from 'react'
import styled from 'styled-components'
import slugify from 'slugify'
import InfiniteScroll from 'react-infinite-scroll-component'
import Router from 'next/router'
import api from '../../client-util/api'
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
  margin: 2px;
  background: url('/static/img/default-photo.svg');
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  border: ${p => p.isSelected ? '3px solid #0057ff' : '3px solid transparent'};
  box-sizing: border-box;
`

const AlbumBox = styled.div`
  width: ${p => `${p.size}px` || '200px'};
  height: ${p => `${p.size}px` || '200px'};
  margin: 2px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
`
const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  /* width: ${p => `${p.size}px` || '200px'};
  height: ${p => `${p.size}px` || '200px'}; */
  background: url('/static/img/default-photo.svg');
  background-size: cover;
  background-repeat: no-repeat;
  display: block;
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

const Album = ({ size, category, onClick }) => (
  <AlbumBox
    data-title={category.title}
    data-id={category._id}
    onClick={onClick}
    style={{ width: `${size}px`, height: `${size}px` }}
  >
    <AlbumName>{ category.title }</AlbumName>
    <AlbumImage src={category.location} alt={category.title} />
  </AlbumBox>
)

const Text = styled.div`
  color: #FFF;
  margin-top: 6em;
  font-size: 20px;
`

class DesignsComponent extends React.Component {
  state = {
    albums: {},
    categories: [],
    hasMoreCategories: true,
    skipCategories: 0,
    imageSelected: null
  }

  async componentDidMount () {
    const { categories } = await api.Category.getAll()
    if (process.browser) {
      window.addEventListener('popstate', this.popstate)
    }

    this.setState({ categories })
  }

  componentWillUnmount () {
    window.removeEventListener('popstate', this.popstate)
  }

  popstate = () => {
    const url = window.location.href.split('/')
    const params = {
      // work id
      id: url[4],
      // photoSelect
      modal: url[5],
      // facebook designs gallery
      source: url[6],
      subId: url[7]
    }

    // Si no hay subid se esconte el modal
    // del album y se regresa scroll al prevScroll
    if (!params.subId) {
      window.setTimeout(() => {
        const div = document.getElementById('scrollableGallery')
        div.scrollTop = this.prevScroll
      }, 50)

      this.setState({ albumTitle: false, imageSelected: null })
    }
  }

  // Se ejecuta con cuando hasMore es true
  // y el scroll llega abajo
  loadMoreCategories = () => {
    this.setState({
      skipCategories: this.state.skipCategories + 15
    }, this.fetchCategories)
  }

  // Fech a categorias y se agregan al estado
  fetchCategories = async () => {
    const res = await api.Category.getAll(this.state.skipCategories)
    this.setState({
      categories: [ ...this.state.categories, ...res.categories ],
      hasMoreCategories: res.hasMore
    })
  }

  // Cuando se da click en alguna fotografia
  // esta se selecciona
  focusPhoto = (e) => {
    this.setState({
      imageSelected: e.target.src
    })
  }

  // Una vez que se selecciono la foto
  // se confirma y se emite para guardar
  // la referencia en DB
  onConfirm = () => {
    if (this.state.imageSelected) {
      Router.replace(
        `/cube-app?id=${this.props.work._id}`,
        `/cube-app/${this.props.work._id}`
      )
      this.props.onConfirm(this.state.imageSelected)
      this.setState({ albumTitle: false, imageSelected: null })
    } else {
      window.alert('Selecciona una imagen primero')
    }
  }

  onBack = () => {
    window.history.back()
  }

  // Cuado se da click en un album se despliega
  // el modal secundario con sus fotografias
  openAlbum = (e) => {
    // debugger
    const title = e.currentTarget.getAttribute('data-title')
    const id = e.currentTarget.getAttribute('data-id')

    Router.push(
      `/cube-app?id=${this.props.work._id}&modal=photoSelect&source=designs&subId=${slugify(title)}`,
      `/cube-app/${this.props.work._id}/photoSelect/designs/${slugify(title)}`
    )
    // Abrir album de categoria
    this.setState({ albumTitle: title, currentAlbumID: id })

    const div = document.getElementById('scrollableGallery')
    this.prevScroll = div.scrollTop
    div.scrollTop = 0

    // Solo se carga la primera vez, la segunda
    // se abrira desde el cache en this.state
    if (!this.state.albums[id]) {
      this.loadDataAlbum(title, id)
    }
  }

  // Se ejecuta al hacer click en algun album
  // obtiene los designs y los agrega al state
  loadDataAlbum = async (title, id) => {
    const res = await api.Design.getByCategory(title)
    const albums = {
      ...this.state.albums,
      [id]: {
        skip: 0,
        ...this.state.albums[id],
        ...res
      }
    }

    this.setState({ albums })
  }

  // Cuando se tienen mas imagenes y se baja
  // en scroll se obtienen mas designs y se
  // agregan  a ese album
  loadMoreDesigns = async () => {
    const { albums, currentAlbumID, albumTitle } = this.state
    const skip = albums[currentAlbumID].skip + 15
    this.state.albums[currentAlbumID].skip = skip
    const id = currentAlbumID
    const res = await api.Design.getByCategory(albumTitle, skip)

    this.setState({
      albums: {
        ...albums,
        [id]: {
          ...albums[id],
          ...res,
          designs: [
            ...albums[id].designs,
            ...res.designs
          ]
        }
      } })
  }

  scrollStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: '80px',
    overflowY: 'auto'
  }

  onResize = (photoSize) => {
    this.setState({ photoSize })
  }

  render () {
    const { albumTitle, albums, currentAlbumID, imageSelected, categories, hasMoreCategories, photoSize } = this.state
    const currentAlbum = albums[currentAlbumID]
    return (
      <GalleryPanel
        onBack={this.onBack}
        onConfirm={this.onConfirm}
        confirmActive={this.state.imageSelected}
        onResize={this.onResize}
      >

        {
          albumTitle && currentAlbum
            ? (
              <Albums id='scphotos'>
                <InfiniteScroll
                  dataLength={currentAlbum.designs.length}
                  next={this.loadMoreDesigns}
                  hasMore={currentAlbum.hasMore}
                  scrollableTarget='scphotos'
                  style={this.scrollStyle}
                  loader={'loading'}
                >
                  { currentAlbum.designs.map(photo => (
                    <Photo
                      key={photo._id}
                      src={photo.location}
                      data-title={photo.title}
                      onClick={this.focusPhoto}
                      isSelected={imageSelected === photo.location}
                      size={photoSize}
                    />
                  ))}

                </InfiniteScroll>
              </Albums>
            )
            : (
              <Albums>
                <InfiniteScroll
                  dataLength={categories.length}
                  next={this.loadMoreCategories}
                  hasMore={hasMoreCategories}
                  scrollableTarget='scrollableGallery'
                  style={this.scrollStyle}
                  loader={'loading'}
                >
                  { !categories.length ? <Text>Wops! No hay ninguna foto en este album.</Text> : null }
                  { categories.map(category => (
                    <Album
                      key={category._id}
                      category={category}
                      onClick={this.openAlbum}
                      size={photoSize}
                    />
                  ))}
                </InfiniteScroll>
              </Albums>
            )
        }
      </GalleryPanel>
    )
  }
}

export default DesignsComponent
