import React from 'react'
import styled, { keyframes } from 'styled-components'

const Table = styled.table`
  border: 1px solid gray;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 17px;

  @media (max-width:900px) {
    border: 0;
    width: 100%;
  }
`

const Tr = styled.tr`
  border: 1px solid #DDD;
  padding: 10px;

  /* :nth-child(even) {
    background: #EEE;
  } */

  @media (max-width:900px) {
    margin-bottom: 10px;
    display: block;
    border-bottom: 2px solid gray;
  }
`

const Td = styled.td`
  padding: 10px;
  text-align: left;

  @media (max-width:900px) {
    text-align: left;
    display: block;
    font-size: 16px;
    /* border-bottom: 1px dashed black; */

    :before {
      content: attr(data-label);
      /* float: left; */
      text-align: left;
      font-weight: bold;

      display: block;
    }
  }
`

const Th = styled.th`
  padding: 10px;
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 1px;

  @media (max-width:900px) {
    display: none;
  }
`

class TableComponent extends React.Component {
  render () {
    return (
      <Table>
        <thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Finalidad</Th>
            <Th>Duracion</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td data-label='NOMBRE'>
              <p>jwt jwt-rfs t_sub</p>
              <p>Propia Persistente</p>
            </Td>
            <Td data-label='FINALIDAD'>
              Son cookies necesarias para el manejo de autentificacion y autorizacion dentro de nuestro sitio
            </Td>
            <Td data-label='DURACION'>1 Semana</Td>
          </Tr>

          <Tr>
            <Td data-label='NOMBRE'>
              <p>_csrf</p>
              <p>Propia No persistente</p>
            </Td>
            <Td data-label='FINALIDAD'>
              Es necesaria para el evitar ataques tipo XSRF 'Cross-site request forgery'
            </Td>
            <Td data-label='DURACION'>Caduca al recargar la pagina</Td>
          </Tr>

          <Tr>
            <Td data-label='NOMBRE'>
              <p>_ga _gid _gcl_aw</p>
              <p>Terceros Persistente</p>
            </Td>
            <Td data-label='FINALIDAD'>
              Se usa para distinguir a los usuarios. Es una cookie perteneciente a Google Analytics. <a href='https://policies.google.com/?hl=es'>Más información</a></Td>
            <Td data-label='DURACION'>2 años a partir de la configuración</Td>
          </Tr>
          <Tr>
            <Td data-label='NOMBRE'>
              <p>_gat</p>
              <p>Terceros persistente</p>
            </Td>
            <Td data-label='FINALIDAD'>Se usa para saber el ratio de recarga. Es una cookie perteneciente a Google Analytics.  <a href='https://policies.google.com/?hl=es'>Más información</a></Td>
            <Td data-label='DURACION'>10 minutos</Td>
          </Tr>

          <Tr>
            <Td data-label='NOMBRE'>
              <p>1P_JAR</p>
              <p>Terceros persistente</p>
            </Td>
            <Td data-label='FINALIDAD'>Google utiliza esta cookie para recopilar estadísticas del sitio web y hacer un seguimiento de las tasas de conversión.</Td>
            <Td data-label='DURACION'>1 Semana</Td>
          </Tr>

          <Tr>
            <Td data-label='NOMBRE'>
              <p>fr</p>
              <p>Terceros persistente</p>
            </Td>
            <Td data-label='FINALIDAD'>Se trata de la cookie de publicidad principal de Facebook. Se utiliza para ofrecer, analizar y mejorar la relevancia de los anuncios. <a href='https://www.facebook.com/policy/cookies/printable'>Más información</a></Td>
            <Td data-label='DURACION'>90 días</Td>
          </Tr>

          <Tr>
            <Td data-label='NOMBRE'>
              <p>datr </p>
              <p>Terceros persistente</p>
            </Td>
            <Td data-label='FINALIDAD'>
              De Facebook que identifica a los navegadores con fines de seguridad e integridad del sitio, entre ellos, la recuperación de cuentas y la identificación de cuentas que puedan estar en riesgo. <a href='https://www.facebook.com/policy/cookies/printable'>Más información</a>
            </Td>
            <Td data-label='DURACION'>2 años desde su instalación</Td>
          </Tr>
        </tbody>
      </Table>
    )
  }
}

export default TableComponent
