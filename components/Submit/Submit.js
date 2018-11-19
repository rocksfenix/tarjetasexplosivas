import styled from 'styled-components'

export default styled.button`
  border: 2px solid transparent;
  padding: .50em 4em;
  border-radius: 3px;
  color: #FFF;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition: all .3s ease-out;
  background-color: ${p => p.active ? '#5da508' : '#cccccc'};
  background-color: ${p => p.active ? '#4d55d8' : '#cccccc'};
  opacity: .9;
  cursor: ${p => p.active ? 'pointer' : 'not-allowed'};
  user-select: none;
  font-size: 18px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 900px) {
    font-size: 20px;
    display: block;
    padding: .50em 0;
    margin: 0 auto;
  }

  &:hover {
    opacity: 1;
  }
`
