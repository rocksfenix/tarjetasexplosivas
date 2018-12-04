import React from 'react'
import styled from 'styled-components'
import { SwatchesPicker } from 'react-color'

const Box = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #FFF;
  border-radius: 6px;
  /* box-shadow: 1px 1px 11px rgba(0, 0, 0, 0.22); */
  margin: 0 2px;
  border: 2px solid #e4e4e4;
  position: relative;
  
  @media (max-width: 900px) {
    position: static;
  }

`

const Editor = styled.div`
  width: 100%;
  height: 100px;
  max-width: 400px;
  min-width: 200px;
  position: absolute;
  z-index: 100;
  top: -1em;
  left: 50%;
  transform: translateX(-50%);

`

export default class extends React.Component {
  state = {
    showEditor: false,
    color: ''
  }

  static defaultProps = {
    border: '1px solid #FFF'
  }

  componentDidMount () {
    if (this.props.color) {
      this.setState({ color: this.props.color })
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.color !== nextProps.color) {
      return { color: nextProps.color }
    }
  }

  showEditor = () => this.setState({
    showEditor: true
  })

  toggleEditor = () => this.setState({
    showEditor: !this.state.showEditor
  })

  handleChange = (color) => {
    this.setState({ color: color.hex, showEditor: false })
    this.props.onConfirm(color.hex)
  }

  render () {
    return (
      <Box style={{ background: this.state.color, border: this.props.border }} onClick={this.showEditor}>
        { this.state.showEditor
          ? <Editor>
            <SwatchesPicker color={this.state.color} onChangeComplete={this.handleChange} />
          </Editor>
          : null
        }
      </Box>
    )
  }
}
