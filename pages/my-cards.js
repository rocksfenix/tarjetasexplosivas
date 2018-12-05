import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getUser } from '../client-util/session'
import api from '../client-util/api'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import WorkCard from '../components/WorkCard'
import CookiesConsent from '../components/CookiesConsent'

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: #f4f7f9;
`

const Works = styled.section`
  max-width: 850px;
  display: flex;
  flex-wrap: wrap;
  margin: 1em auto;
`

const LastPanel = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 2em auto;
  justify-content: center;
  align-items: center;
`

const Button = styled.a`
  background-color: #ffffff;
  border: 2px solid #2196f3;
  padding: 0.8em 2em;
  font-size: 18px;
  color: #2196F3;
  border-radius: 55px;
  cursor: pointer;
  text-decoration: none;
  display: flex;

  :hover {
    background-color: #2196f3;
    color: #FFF;
  }
`

const Icon = styled.i`
  margin: 0 0 0 10px;
  font-size: 25px;
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
    return { user }
  }

  state = {
    works: [],
    skip: 0
  }

  componentDidMount () {
    this.fetch()
  }

  loadMore = () => {
    this.setState({ skip: this.state.skip + 9 }, this.fetch)
  }

  fetch = async () => {
    try {
      const res = await api.Work.getAllSelf(this.state.skip)
      this.setState({
        works: [ ...this.state.works, ...res.works ],
        hasMore: res.hasMore
      })
    } catch (error) {
    }
  }

  render () {
    return (
      <Panel id='scrollableWorks'>
        <SeoHead title='Tus Diseños' />
        <Navegation user={this.props.user} />
        <InfiniteScroll
          dataLength={this.state.works.length}
          next={this.loadMore}
          hasMore={this.state.hasMore}
          scrollableTarget='scrollableWorks'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
          loader={'loading'}
        >
          <Works>
            <LastPanel>
              <Button href='/cube-app/new'>
                Crear Nueva
                <Icon className='icon-star' />
              </Button>
            </LastPanel>
            {this.state.works.map(work => (
              <WorkCard key={work._id} work={work} />
            ))}
          </Works>
        </InfiniteScroll>
        <CookiesConsent />
      </Panel>
    )
  }
}

export default App
