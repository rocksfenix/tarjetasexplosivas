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
  state = { category: {} }

  componentDidMount () {
    this.setState({ category: this.props.category })
  }

  onDrop = (files) => {
    this.props.onDrop(this.props.category, files[0])
  }

  update = () => {
    this.props.onUpdate(this.state.category)
  }

  delete = () => {
    this.props.onDelete(this.props.category)
  }

  setTitle = (e) => {
    this.setState({
      category: {
        ...this.state.category,
        title: e.target.value
      }
    })
  }

  setPosition = (e) => {
    this.setState({
      category: {
        ...this.state.category,
        position: e.target.value
      }
    })
  }

  render () {
    const { title, active, createdAt, location, position } = this.props.category
    return (
      <CategoryBox>
        <CategoryImage onDrop={this.onDrop} accept='image/*' src={location} />
        <Column>
          <input type='text' defaultValue={title} onChange={this.setTitle} />
        </Column>
        <Column>
          <input type='checkbox' defaultValue={active} />
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
    textures: [],
    skip: false,
    hasMore: false
  }

  async componentDidMount () {
    const { textures, hasMore } = await api.Texture.getAll()
    this.setState({ textures, hasMore })
  }

  onDrop = async (texture, image) => {
    const formData = new window.FormData()
    formData.append('image', image)
    const res = await api.Texture.upload(texture._id, formData)

    this.setState({
      textures: this.state.textures.map(texture => {
        if (texture._id === res.texture._id) {
          return res.texture
        }
        return texture
      })
    })
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  createNew = async () => {
    const res = await api.Texture.post({ title: this.state.title })
    console.log(res)
    this.setState({ textures: [ res.texture, ...this.state.textures ], title: '' })
  }

  update = async (texture) => {
    const res = await api.Texture.update(texture)

    this.setState({
      textures: this.state.textures.map(texture => {
        if (texture._id === res.texture._id) {
          return res.texture
        }
        return texture
      })
    })
    console.log(res)
  }

  delete = async (texture) => {
    const res = await api.Texture.delete(texture)

    this.setState({
      textures: this.state.textures.filter(texture => texture._id !== res.texture._id)
    })
    console.log(res)
  }

  loadMore = () => {
    this.setState({ skip: this.state.skip + 15 }, this.fetch)
  }

  fetch = async () => {
    const res = await api.Texture.getAll(this.state.skip)
    this.setState({
      textures: [ ...this.state.textures, ...res.textures ],
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
        <Box id='scrollableTextures'>
          <InfiniteScroll
            dataLength={this.state.textures.length}
            next={this.loadMore}
            hasMore={this.state.hasMore}
            scrollableTarget='scrollableTextures'
            loader={'loading'}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100vw'
            }}
          >

            { this.state.textures.map(texture => (
              <Category
                key={texture._id}
                category={texture}
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
