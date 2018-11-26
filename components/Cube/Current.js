import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`
  position: absolute;
  width: 50px;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  min-height: 300px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 32px;
    left: 0px;
  }
`

const Side = styled.img`
  width: 100%;
  opacity: 1;
  margin: .2em;

  @media (max-width: 900px) {
    margin: .3em;
  }
`

export default ({ active }) => {
  return (
    <Panel>
      { active === 0 ? <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side0-active.svg' /> : <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side0-inactive.svg' /> }
      { active === 1 ? <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side1-active.svg' /> : <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side1-inactive.svg' /> }
      { active === 2 ? <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side2-active.svg' /> : <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side2-inactive.svg' /> }
      { active === 3 ? <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side3-active.svg' /> : <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side3-inactive.svg' /> }
      { active === 4 ? <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side4-active.svg' /> : <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side4-inactive.svg' /> }
      { active === 5 ? <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side5-active.svg' /> : <Side src='https://d39p6dv27gzlaf.cloudfront.net/static/img/cube/side5-inactive.svg' /> }
    </Panel>
  )
}
