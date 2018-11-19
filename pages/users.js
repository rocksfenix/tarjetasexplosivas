import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import moment from 'moment'
import Select from 'react-select'
import api from '../client-util/api'
import { getUser } from '../client-util/session'
import Navegation from '../components/Navegation'
import InfiniteScroll from 'react-infinite-scroll-component'
import capitalize from 'capitalize'
import Search from '../components/Search'

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

const Avatar = styled.img`
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

class User extends Component {
  state = { user: {} }

  componentDidMount () {
    this.setState({ user: this.props.user })
  }

  onDrop = (files) => {
    this.props.onDrop(this.props.user, files[0])
  }

  update = () => {
    this.props.onUpdate(this.state.user)
  }

  delete = () => {
    this.props.onDelete(this.props.user)
  }

  setTitle = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        title: e.target.value
      }
    })
  }

  setPosition = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        position: e.target.value
      }
    })
  }

  changeRole = ({ value }) => {
    this.setState({
      user: {
        ...this.state.user,
        role: value
      }
    })
  }

  changeStatus= ({ value }) => {
    this.setState({
      user: {
        ...this.state.user,
        status: value
      }
    })
  }

  setActive = (k, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [k]: value
      }
    })
  }

  render () {
    const { fullname, status, createdAt, email, role, avatar, credits, cards, purchaseCredits } = this.props.user
    // console.log(this.props)
    return (
      <DesignBox>
        <Avatar src={avatar || '/static/img/user-default.jpg'} />
        <Column>
          <div>{ credits } { cards } { purchaseCredits }</div>
        </Column>
        <Column>
          <input type='text' defaultValue={fullname} onChange={this.setTitle} />
        </Column>
        <Column>
          <input type='text' defaultValue={email} onChange={this.setTitle} />
        </Column>
        <Column width='300px'>
          <SelectBox width='300px'>
            <Select isSearchable options={this.props.roles} onChange={this.changeRole} defaultValue={{ label: capitalize(role), value: role }} />
          </SelectBox>
        </Column>
        <Column width='300px'>
          <SelectBox width='300px'>
            <Select isSearchable options={this.props.status} onChange={this.changeStatus} defaultValue={{ label: capitalize(status), value: status }} />
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
    users: [],
    roles: [
      {
        label: 'Admin',
        value: 'admin'
      },
      {
        label: 'Member',
        value: 'member'
      }
    ],
    status: [
      {
        label: 'Active',
        value: 'active'
      },
      {
        label: 'Hold',
        value: 'hold'
      }
    ],
    hasMore: false,
    skip: 0
  }

  async componentDidMount () {
    const { users, hasMore } = await api.User.getAll()
    // const { categories } = await api.Category.getAllAdmin()

    this.setState({
      users,
      hasMore
      // categories: categories.map(c => ({ value: c.title, label: c.title }))
    })
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  update = async (user) => {
    console.log(user)

    const res = await api.User.update(user)

    this.setState({
      users: this.state.users.map(user => {
        if (user._id === res.user._id) {
          return res.user
        }
        return user
      })
    })
    console.log(res)
  }

  delete = async (user) => {
    const res = await api.User.delete(user)

    this.setState({
      users: this.state.users.filter(user => user._id !== res.user._id)
    })
  }

  loadMore = () => {
    this.setState({ skip: this.state.skip + 15 }, this.fetch)
  }

  fetch = async () => {
    const res = await api.User.getAll(this.state.skip)
    console.log(res)
    this.setState({
      users: [ ...this.state.users, ...res.users ],
      hasMore: res.hasMore
    })
  }

  searchUser = async (name) => {
    console.log(name)
    const res = await api.User.findByName(name)
    console.log(res)

    this.setState({ users: res.users })
  }

  render () {
    // console.log(this.state)
    return (
      <Panel>
        <Navegation user={this.props.user} />
        <SearchBox>
          <Search onSeach={this.searchUser} />
        </SearchBox>
        <Box id='scrollableUsers'>
          <InfiniteScroll
            dataLength={this.state.users.length}
            next={this.loadMore}
            hasMore={this.state.hasMore}
            scrollableTarget='scrollableUsers'
            loader={'loading'}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100vw'
            }}
          >
            { this.state.users.map(user => (
              <User
                key={user._id}
                user={user}
                onDelete={this.delete}
                onUpdate={this.update}
                roles={this.state.roles}
                status={this.state.status}

              />
            ))}
          </InfiniteScroll>
        </Box>
      </Panel>
    )
  }
}

export default DesignsDashboad
