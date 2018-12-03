// He sido partidario de 2 cosas  creer y crear, creer en tus sueños y crear algo increible con esos sueños
import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import moment from 'moment'
import api from '../client-util/api'
import { getUser } from '../client-util/session'
import Navegation from '../components/Navegation'
import Dropzone from 'react-dropzone'
import InfiniteScroll from 'react-infinite-scroll-component'
import CookiesConsent from '../components/CookiesConsent'
import ImageDrop from '../components/ImageDrop'
import Checkbox from '../components/Checkbox'

const SearchBox = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f141b;
`

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  background: #FFF;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`

const Box = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
`

const Button = styled.button`
margin: 0.4em 0;
  font-family: 'Poppins', sans-serif;
  font-size: 25px;
  cursor: pointer;
  padding: 0.2em 1.5em;
  background-color: #4A63FF;
  background: linear-gradient(30deg,#00c2ff,#008ff5);

  color: #FFF;
  border-radius: 33px;
  border: 0;
  outline: none;

  :hover {
    background: linear-gradient(250deg,#00c2ff,#008ff5);
  }
`

const Search = styled.input`
  min-width: 400px;
  padding: 11px 20px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 4px;
  -webkit-appearance: none;
  font-family: Roboto;
  font-weight: 100;

  &:focus {
    outline: none;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
  }
`

const CategoryBox = styled.div`
  width: 100vw;
  height: 70px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #EEE;
`

const CategoryImage = styled(Dropzone)`
  width: 70px;
  height: 70px;
  background: gray;
  background: ${p => `url(${p.src})`};
  background-size: cover;
  background-position: center;
  border: 1px solid gray;
`

const Column = styled.div`
  width: 180px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

class Category extends Component {
  state = { album: {} }

  componentDidMount () {
    this.setState({ album: this.props.album })
  }

  onDrop = async (files) => {
    this.setState({
      isUploading: true,
      preview: window.URL.createObjectURL(files[0])
    })

    const formData = new window.FormData()
    formData.append('image', files[0])
    const res = await api.AlbumDesign.upload(this.state.album._id, formData)

    this.props.setAlbum(res.albumDesign)

    this.setState({
      isUploading: false,
      preview: ''
    })
  }

  update = () => {
    this.props.onUpdate(this.state.album)
  }

  delete = () => {
    this.props.onDelete(this.props.album)
  }

  setTitle = (e) => {
    this.setState({
      album: {
        ...this.state.album,
        title: e.target.value
      }
    })
  }

  setPosition = (e) => {
    this.setState({
      album: {
        ...this.state.album,
        position: e.target.value
      }
    })
  }

  toggleActive = (a, value) => {
    this.setState({
      album: {
        ...this.state.album,
        active: value
      }
    })
  }

  render () {
    const { isUploading, preview } = this.state
    const { title, active, createdAt, location, thumbnail, position } = this.props.album
    return (
      <CategoryBox>
        <ImageDrop
          onDrop={this.onDrop}
          accept='image/*'
          isUploading={isUploading}
          src={isUploading ? preview : (thumbnail || location)}
        />
        <Column>
          <input type='text' defaultValue={title} onChange={this.setTitle} />
        </Column>
        <Column>
          <Checkbox defaultValue={active} onCheck={this.toggleActive} />
        </Column>
        <Column>
          <input type='text' defaultValue={position} onChange={this.setPosition} />
        </Column>
        <Column>{moment(createdAt).fromNow()}</Column>
        <Column>
          <button onClick={this.update}>Update</button>
          <button onClick={this.delete}>Delete</button>
        </Column>
      </CategoryBox>
    )
  }
}

class texturesDashboad extends Component {
  static async getInitialProps ({ req, res }) {
    const user = getUser(req)

    if (!user) {
      if (res) {
        res.writeHead(302, {
          Location: '/crear-cuenta'
        })
        res.end()
      } else {
        Router.push('/crear-cuenta')
      }
    }

    if (user && user.role !== 'admin') {
      if (res) {
        res.writeHead(302, {
          Location: '/unauthorized'
        })
        res.end()
      } else {
        Router.push('/unauthorized')
      }
    }
    return { user }
  }

  state = {
    albumsDesigns: [],
    skip: false,
    hasMore: false
  }

  async componentDidMount () {
    const { albumsDesigns, hasMore } = await api.AlbumDesign.getAll()
    this.setState({ albumsDesigns, hasMore })
  }

  setAlbum = (albumDesign) => {
    this.setState({
      albumsDesigns: this.state.albumsDesigns.map(a => {
        if (a._id === albumDesign._id) {
          return albumDesign
        }
        return a
      })
    })
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  createNew = async () => {
    const res = await api.AlbumDesign.post({ title: this.state.title })
    console.log(res)
    this.setState({ albumsDesigns: [ res.albumDesign, ...this.state.albumsDesigns ], title: '' })
  }

  update = async (albumDesign) => {
    console.log(albumDesign)
    const res = await api.AlbumDesign.update(albumDesign)

    this.setState({
      albumsDesigns: this.state.albumsDesigns.map(albumDesign => {
        if (albumDesign._id === res.albumDesign._id) {
          return res.albumDesign
        }
        return albumDesign
      })
    })
    console.log(res)
  }

  delete = async (albumDesign) => {
    const res = await api.AlbumDesign.delete(albumDesign)

    this.setState({
      albumsDesigns: this.state.albumsDesigns.filter(albumDesign => albumDesign._id !== res.albumDesign._id)
    })
    console.log(res)
  }

  loadMore = () => {
    this.setState({ skip: this.state.skip + 15 }, this.fetch)
  }

  fetch = async () => {
    const res = await api.AlbumDesign.getAll(this.state.skip)
    this.setState({
      albumsDesigns: [ ...this.state.albumsDesigns, ...res.albumsDesigns ],
      hasMore: res.hasMore
    })
  }

  render () {
    return (
      <Panel>
        <Navegation user={this.props.user} />
        <SearchBox>
          <Search onChange={this.updateTitle} />
          <Button onClick={this.createNew}>NEW</Button>
        </SearchBox>
        <Box id='scrollableCategories'>
          <InfiniteScroll
            dataLength={this.state.albumsDesigns.length}
            next={this.loadMore}
            hasMore={this.state.hasMore}
            scrollableTarget='scrollableCategories'
            loader={'loading'}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100vw'
            }}
          >

            { this.state.albumsDesigns.map(album => (
              <Category
                key={album._id}
                album={album}
                setAlbum={this.setAlbum}
                onDrop={this.onDrop}
                onDelete={this.delete}
                onUpdate={this.update}
              />
            ))}
          </InfiniteScroll>
        </Box>
        <CookiesConsent />
      </Panel>
    )
  }
}

export default texturesDashboad
