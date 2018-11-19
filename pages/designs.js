// He sido partidario de 2 cosas  creer y crear, creer en tus sueños y crear algo increible con esos sueños
import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import moment from 'moment'
import Select from 'react-select'
import api from '../client-util/api'
import { getUser } from '../client-util/session'
import Navegation from '../components/Navegation'
import Dropzone from 'react-dropzone'
import InfiniteScroll from 'react-infinite-scroll-component'

const SearchBox = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f141b;
`

const Center = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const DesignBox = styled.div`
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

const DesignImage = styled(Dropzone)`
  width: 70px;
  height: 70px;
  background: gray;
  background: ${p => `url(${p.src})`};
  background-size: cover;
  background-position: center;
  border: 1px solid gray;
`

const Column = styled.div`
  width: ${p => p.width || '180px'};
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
`

const SelectBox = styled.div`
  width: ${p => p.width || '180px'};
  height: 40px;
  display: block;
`

class Design extends Component {
  state = { design: {} }

  componentDidMount () {
    this.setState({ design: this.props.design })
  }

  onDrop = (files) => {
    this.props.onDrop(this.props.design, files[0])
  }

  update = () => {
    this.props.onUpdate(this.state.design)
  }

  delete = () => {
    this.props.onDelete(this.props.design)
  }

  setTitle = (e) => {
    this.setState({
      design: {
        ...this.state.design,
        title: e.target.value
      }
    })
  }

  setPosition = (e) => {
    this.setState({
      design: {
        ...this.state.design,
        position: e.target.value
      }
    })
  }

  changeCategory = (d) => {
    this.setState({
      design: {
        ...this.state.design,
        category: d.value
      }
    })
  }

  render () {
    const { title, active, createdAt, location, category } = this.props.design
    return (
      <DesignBox>
        <DesignImage onDrop={this.onDrop} accept='image/*' src={location} />
        <Column>
          <input type='text' defaultValue={title} onChange={this.setTitle} />
        </Column>
        <Column>
          <input type='checkbox' defaultValue={active} />
        </Column>
        <Column width='300px'>
          <SelectBox width='300px'>
            <Select isSearchable options={this.props.options} onChange={this.changeCategory} defaultValue={{ value: category, label: category }} />
          </SelectBox>
        </Column>
        <Column>{moment(createdAt).fromNow()}</Column>
        <Column>
          <button onClick={this.update}>Update</button>
          <button onClick={this.delete}>Delete</button>
        </Column>
      </DesignBox>
    )
  }
}

class DesignsDashboad extends Component {
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
    designs: [],
    categories: [],
    title: '',
    hasMore: false,
    skip: 0
  }

  async componentDidMount () {
    const { designs, hasMore } = await api.Design.getAll()
    const { categories } = await api.Category.getAllAdmin()

    this.setState({
      designs,
      hasMore,
      categories: categories.map(c => ({ value: c.title, label: c.title }))
    })
  }

  onDrop = async (design, image) => {
    const formData = new window.FormData()
    formData.append('image', image)
    const res = await api.Design.upload(design._id, formData)

    this.setState({
      designs: this.state.designs.map(design => {
        if (design._id === res.design._id) {
          return res.design
        }
        return design
      })
    })
    console.log(res)
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  createNew = async () => {
    const res = await api.Design.post({ title: this.state.title })
    console.log(res)
    this.setState({ designs: [ res.design, ...this.state.designs ], title: '' })
  }

  update = async (design) => {
    const res = await api.Design.update(design)

    this.setState({
      designs: this.state.designs.map(design => {
        if (design._id === res.design._id) {
          return res.design
        }
        return design
      })
    })
    console.log(res)
  }

  delete = async (design) => {
    const res = await api.Design.delete(design)

    this.setState({
      designs: this.state.designs.filter(design => design._id !== res.design._id)
    })
  }

  loadMore = () => {
    this.setState({ skip: this.state.skip + 15 }, this.fetchDesigns)
  }

  fetchDesigns = async () => {
    const res = await api.Design.getAll(this.state.skip)
    console.log(res)
    this.setState({
      designs: [ ...this.state.designs, ...res.designs ],
      hasMore: res.hasMore
    })
  }

  render () {
    console.log(this.state)
    return (
      <Panel>
        <Navegation user={this.props.user} />
        <SearchBox>
          <Search onChange={this.updateTitle} />
          <Button onClick={this.createNew}>NEW</Button>
        </SearchBox>
        <Box id='scrollableDesigns'>
          <InfiniteScroll
            dataLength={this.state.designs.length}
            next={this.loadMore}
            hasMore={this.state.hasMore}
            scrollableTarget='scrollableDesigns'
            loader={'loading'}
            style={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            { this.state.designs.map(design => (
              <Design
                key={design._id}
                design={design}
                onDrop={this.onDrop}
                onDelete={this.delete}
                onUpdate={this.update}
                options={this.state.categories}
              />
            ))}
          </InfiniteScroll>
        </Box>
      </Panel>
    )
  }
}

export default DesignsDashboad
