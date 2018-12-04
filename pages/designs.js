import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import moment from 'moment'
import Select from 'react-select'
import api from '../client-util/api'
import { getUser } from '../client-util/session'
import Navegation from '../components/Navegation'
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
  state = {
    design: {},
    isUploading: false,
    preview: ''
  }

  componentDidMount () {
    this.setState({ design: this.props.design })
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

  onDrop = async (files) => {
    this.setState({
      isUploading: true,
      preview: window.URL.createObjectURL(files[0])
    })

    const formData = new window.FormData()
    formData.append('image', files[0])
    const res = await api.Design.upload(this.state.design._id, formData)

    this.props.setDesign(res.design)

    this.setState({
      isUploading: false,
      preview: ''
    })
  }

  toggleActive = (a, value) => {
    this.setState({
      design: {
        ...this.state.design,
        active: value
      }
    })
  }

  render () {
    const { isUploading, preview } = this.state
    const { title, active, createdAt, location, thumbnail, category } = this.props.design
    return (
      <DesignBox>
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
          <Checkbox
            label='active'
            defaultValue={active}
            onCheck={this.toggleActive}
          />
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
    const { albumsDesigns } = await api.AlbumDesign.getAllAdmin()

    this.setState({
      designs,
      hasMore,
      albumsDesigns: albumsDesigns.map(c => ({ value: c.title, label: c.title }))
    })
  }

  setDesign = (design) => {
    this.setState({
      designs: this.state.designs.map(de => {
        if (de._id === design._id) {
          return design
        }
        return de
      })
    })
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  createNew = async () => {
    const res = await api.Design.post({ title: this.state.title })
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
  }

  delete = async (design) => {
    const res = await api.Design.delete(design)

    this.setState({
      designs: this.state.designs.filter(design => design._id !== res.design._id)
    })
  }

  loadMore = () => {
    this.setState({ skip: this.state.skip + 9 }, this.fetchDesigns)
  }

  fetchDesigns = async () => {
    const res = await api.Design.getAll(this.state.skip)
    this.setState({
      designs: [ ...this.state.designs, ...res.designs ],
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
        <Box id='scrollableDesigns'>
          <InfiniteScroll
            dataLength={this.state.designs.length}
            next={this.loadMore}
            hasMore={this.state.hasMore}
            scrollableTarget='scrollableDesigns'
            loader={'loading'}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100vw'
            }}
          >
            { this.state.designs.map(design => (
              <Design
                key={design._id}
                design={design}
                // onDrop={this.onDrop}
                setDesign={this.setDesign}
                onDelete={this.delete}
                onUpdate={this.update}
                options={this.state.albumsDesigns}
              />
            ))}
          </InfiniteScroll>
        </Box>
        <CookiesConsent />
      </Panel>
    )
  }
}

export default DesignsDashboad
