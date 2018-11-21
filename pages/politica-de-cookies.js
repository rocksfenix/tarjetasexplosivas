import React, { Component } from 'react'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import Table from '../components/Table'
import CookiesConsent from '../components/CookiesConsent'

const Title = styled.h1`
  color: #30233F;
  font-size: 35px;

  @media (max-width: 900px) {
    margin: 1em auto;
    padding: 0 .3em;
  }
`

const Subtitle = styled.div`
  font-weight: bold;
  color: #30233F;
`

const H3 = styled.h3`
  color: #30233F;
  font-size: 35px;

  @media (max-width: 900px) {
    margin: 1em auto;
    padding: 0 .3em;
  }
`

const H4 = styled.h4`
  color: #30233F;
  font-size: 20px;

  @media (max-width: 900px) {
    margin: 1em auto;
    padding: 0 .3em;
  }
`

const Section = styled.section`
  margin: 1em auto;
  max-width: 800px;
  color: #333;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.58;
  padding-bottom: 5em;
  overflow-y: auto;

  @media (max-width: 900px) {
    width: 100%;
  }
`
const Parragraph = styled.p`
  @media (max-width: 900px) {
    width: 80%;
    margin: 1em auto;
  }
`

const Panel = styled.div`
  position: relative;
  overflow-y: auto;
  height: 100vh;
`

export default class extends Component {
  static async getInitialProps ({ req, res }) {
    const user = getUser(req)
    return { user }
  }

  render () {
    return (
      <Panel>
        <SeoHead />
        <Navegation user={this.props.user} />
        <Section>
          <Title>Política de cookies</Title>
          <Subtitle>Última actualización el 20 de Octubre del 2018</Subtitle>
          <Parragraph>
            Como responsable de esta web, me he esmerado en cumplir con la normativa referente a las cookies, no obstante, teniendo en cuenta la forma en la que funciona Internet y los sitios web, no siempre es posible contar con información actualizada de las cookies que terceras partes puedan utilizar a través de este sitio web.
          </Parragraph>
          <Parragraph>
            Esto se aplica especialmente a casos en los que esta página web contiene elementos integrados: es decir, textos, documentos, imágenes o breves películas que se almacenan en otra parte, pero se muestran en nuestro sitio web.
          </Parragraph>
          <Parragraph>
            Por consiguiente, en caso de que te encuentres con este tipo de cookies en este sitio web y no estén enumeradas en la lista siguiente, te ruego que me lo comuniques. También puedes ponerte en contacto directamente con el tercero para pedirle información sobre las cookies que coloca, la finalidad y la duración de la cookie, y cómo ha garantizado su privacidad.
          </Parragraph>

          <H3>¿QUÉ SON LAS COOKIES?</H3>
          <Parragraph>
            Las cookies constituyen una herramienta empleada por los servidores Web para almacenar y recuperar información acerca de sus visitantes. No es más que un fichero de texto que algunos servidores piden a nuestro navegador que escriba en nuestro disco duro, con información acerca de lo que hemos estado haciendo por sus páginas. Poseen una fecha de caducidad, que puede oscilar desde el tiempo que dure la sesión hasta una fecha futura especificada, a partir de la cual dejan de ser operativa.
          </Parragraph>
          <H3>1. LAS COOKIES QUE UTILIZA ESTA WEB</H3>
          <Parragraph>
            En esta web se utilizan cookies propias y de terceros para conseguir que tengas una mejor experiencia de navegación, puedas compartir contenido en redes sociales, para mostrarte anuncios en función a tus intereses y para obtener estadísticas de usuarios.
          </Parragraph>
          <Parragraph>
            Las cookies empleadas en https://tarjetasexplosivas.com/ se asocian únicamente con un Usuario anónimo y su ordenador, no proporcionan referencias que permitan deducir el nombre y apellidos del Usuario y no pueden leer datos de su disco duro ni incluir virus en sus textos. Asimismo, https://tarjetasexplosivas.com/ no puede leer las cookies implantadas en el disco duro del Usuario desde otros servidores.
            no autorizado.
          </Parragraph>

          <Parragraph>
            El usuario puede libremente decidir acerca de la implantación o no en su disco duro de las cookies empleadas en https://tarjetasexplosivas.com/. En este sentido, el usuario puede configurar su navegador para aceptar o rechazar por defecto todas las cookies o para recibir un aviso en pantalla de la recepción de cada cookie y decidir en ese momento su implantación o no en su disco duro. Para ello le sugerimos consultar la sección de ayuda de su navegador para saber cómo cambiar la configuración que actualmente emplea.
          </Parragraph>
          <Parragraph>
            Aun cuando el Usuario configurase su navegador para rechazar todas las cookies o rechazase expresamente las cookies de https://tarjetasexplosivas.com/ podrá navegar por el Portal con el único inconveniente de no poder disfrutar de las funcionalidades del Portal que requieran la instalación de alguna de ellas. En cualquier caso, el Usuario podrá eliminar las cookies implantadas en su disco duro en cualquier momento, siguiendo el procedimiento establecido en la sección de ayuda de su navegador y que posteriormente detallaremos.
          </Parragraph>
          <Parragraph>
            Como usuario, puedes rechazar el tratamiento de los datos o la información bloqueando estas cookies mediante la configuración apropiada de tu navegador. Sin embargo, debes saber que, si lo haces, este sitio no funcione adecuadamente.
          </Parragraph>
          <H4>Las cookies de esta web ayudan a:</H4>
          <Parragraph>
            <ul>
              <li>Hacer que esta web funcione correctamente</li>
              <li>Ahorrarle el tener que iniciar sesión cada vez que visitas este sitio</li>
              <li>Recordarte tus ajustes durante y entre las visitas</li>
              <li>Permitirte visualizar videos</li>
              <li>Mejorar la velocidad / seguridad del sitio</li>
              <li>Que pueda compartir páginas con redes sociales</li>
              <li>Mejorar continuamente de este sitio web</li>
              <li>Mostrarte anuncios en función de tus hábitos de navegación</li>
            </ul>
          </Parragraph>
          <H4>No utilizaré jamás cookies para:</H4>
          <Parragraph>
            <ul>
              <li>Recoger información de identificación personal (sin tu permiso expreso)</li>
              <li>Recoger información sensible (sin tu permiso expreso)</li>
              <li>Compartir datos de identificación personal a terceros</li>
            </ul>
          </Parragraph>

          <H3>2. COOKIES DE TERCEROS QUE UTILIZAMOS EN ESTA WEB Y QUE DEBES CONOCER</H3>
          <Parragraph>
            Esta web, como la mayoría de sitios web, incluye funcionalidades proporcionadas por terceros.
            También se ponen a prueba regularmente nuevos diseños o servicios de terceros para recomendaciones e informes.
          </Parragraph>
          <Parragraph>
            Esto puede modificar ocasionalmente la configuración de cookies y que aparezcan cookies no detalladas en la presente política. Es importante que sepas que son cookies provisionales que no siempre es posible informar y que solo tienen finalidades de estudio y valoración. En ningún caso se van a utilizar cookies que comprometan tu privacidad.
          </Parragraph>
          <Parragraph>
            Entre las cookies de terceros más estables están:
          </Parragraph>
          <Parragraph>
            <ul>
              <li>
                Las generadas por servicios de análisis, concretamente, Google Analytics para ayudar al website a analizar el uso que hacen los Usuarios del sitio web y mejorar la usabilidad del mismo, pero en ningún caso se asocian a datos que pudieran llegar a identificar al usuario.
                Google Analytics, es un servicio analítico de web prestado por Google, Inc., una compañía de Delaware cuya oficina principal está en 1600 Amphitheatre Parkway, Mountain View (California), CA 94043, Estados Unidos (“Google”).
                El usuario puede consultar aquí el tipo de cookies utilizadas por Google. Cookie de Google+ y Google Maps, según lo dispuesto en su página sobre qué tipo de cookies utilizan.
              </li>
              <li>
                Cookies de redes sociales: Las Cookies de redes sociales pueden almacenarse en su navegador mientras navega por abcoach.com por ejemplo, cuando utiliza el botón de compartir contenidos de abcoach.com en alguna red social.
              </li>
            </ul>
          </Parragraph>
          <Parragraph>
            Las empresas que generan estas cookies correspondientes a las redes sociales que utiliza esta web tienen sus propias políticas de cookies:
            <ul>
              <li>Facebook: https://www.facebook.com/help/323540651073243/</li>
              <li>Twitter: https://twitter.com/privacy</li>
              <li>Instagram: https://help.instagram.com/155833707900388</li>
            </ul>
          </Parragraph>
          <Parragraph>
            Las implicaciones de privacidad estarán en función a cada red social y dependerán de la configuración de privacidad que ha elegido en estas redes. En ningún caso, ni el responsable de esta web ni los anunciantes pueden obtener información personal identificable de estas cookies.
          </Parragraph>
          <Parragraph>
            A continuación, se detallan las cookies que pueden instalarse habitualmente durante la navegación por este sitio web:
          </Parragraph>
          <Table />

          <H3>3. ¿CÓMO PUEDO GESTIONAR Y DESACTIVAR ESTAS COOKIES?</H3>
          <Parragraph>
            En el caso de no desear que el sitio web no instale ninguna cookie en tu equipo, cabe la posibilidad de adaptar tu navegador de modo que se te notifique antes de que se descargue ninguna cookie.
          </Parragraph>
          <Parragraph>
            Así las cosas, se puede igualmente modificar la configuración del navegador de forma que rechace todas las cookies o únicamente las cookies de terceros. También puedes eliminar cualquiera de las cookies que ya se encuentren en tu equipo. Ten en cuenta que tendrás que adaptar por separado la configuración de cada navegador y equipo que utilices.
          </Parragraph>
          <Parragraph>
            <strong>https://tarjetasexplosivas.com/</strong> pone a disposición de los usuarios que quieran impedir la instalación de las mencionadas cookies, enlaces facilitados al efecto por navegadores cuyo uso se considera más extendido:
            <li>
              <a href='https://support.google.com/chrome/answer/95647?hl=es-419'>Google Chorome</a>
            </li>
            <li>
              <a href='https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-10'>Internet Explorer</a>
            </li>
            <li>
              <a href='https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias?redirectlocale=es&redirectslug=habilitar-y-deshabilitar-cookies-que-los-sitios-we'>Mozilla Firefox</a>
            </li>
            <li>
              <a href='https://support.apple.com/es-lamr/HT201265'>Apple Safari</a>
            </li>
            <li>
              <a href='http://help.opera.com/Linux/10.60/es-ES/cookies.html'>Opera</a>
            </li>
          </Parragraph>
          <Parragraph>
          Además, también puede gestionar el almacén de cookies en su navegador a través de herramientas como las siguientes
            <li>Ghostery: www.ghostery.com/</li>
            <li>Your online choices: www.youronlinechoices.com/es/</li>
          </Parragraph>
          <Parragraph>
          Si tiene alguna pregunta o comentario sobre esta Política de cookies, envíe un correo electrónico a te-privacidad@gmail.com
          </Parragraph>
        </Section>
        <CookiesConsent />
      </Panel>
    )
  }
}
