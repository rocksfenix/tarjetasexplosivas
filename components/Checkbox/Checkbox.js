import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Panel = styled.div`
  width: 100%;
  height: 35px;
  margin: .5em auto .5em 1em;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Label = styled.label`

`

const Checkbox = styled.span`
  border: 1px solid #a8a0af;
  border: 2px solid #6169e0;
  width: 35px;
  height: 35px;
  display: inline-block;
  margin-right: 1em;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.img`
  width: 70%;
  transition: 200ms ease-out;
  transform: ${p => p.isChecked ? 'scale(1)' : 'scale(0)'};
`

export default class extends React.Component {
  state = { isChecked: false }

  componentDidMount () {
    this.setState({ isChecked: this.props.defaultValue })
  }

  toggleChecked = () => this.setState(state => ({
    isChecked: !state.isChecked
  }), () => {
    this.props.onCheck(this.props.label, this.state.isChecked)
  })

  render () {
    return (
      <Panel onClick={this.toggleChecked}>
        <Checkbox>
          <Icon src='https://d39p6dv27gzlaf.cloudfront.net/static/img/success2.svg' isChecked={this.state.isChecked} />
        </Checkbox> <Label>{ this.props.children }</Label>
      </Panel>
    )
  }
}
