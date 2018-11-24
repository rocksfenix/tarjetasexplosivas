import React, { Component } from 'react'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import CookiesConsent from '../components/CookiesConsent'

const Title = styled.h1`
  color: #30233F;
  font-size: 35px;

  @media (max-width: 900px) {
    margin: 1em auto;
    padding: 0 .3em;
  }
`

const H3 = styled.h3`
  color: #30233F;
  font-size: 30px;

  @media (max-width: 900px) {
    margin: 1em auto;
    padding: 0 .3em;
  }
`

const P = styled.p`
  @media (max-width: 900px) {
    width: 80%;
    margin: 1em auto;
  }
`

const Section = styled.section`
  margin: 1em auto;
  max-width: 660px;
  color: #333;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.58;
  padding-bottom: 5em;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const Panel = styled.div`
  position: relative;
  overflow-y: auto;
  height: 100vh;
`

const Subtitle = styled.div`
  font-weight: bold;
  color: #30233F;
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
          <Title>Terminos y Condiciones de Uso</Title>
          <Subtitle>Última actualización el 22 de Noviembre del 2018</Subtitle>
          <H3>1. Terminos</H3>
          <P>
            Al acceder al sitio web de tarjetasExplosivas.com/ usted acepta estar sujeto a estos Términos y condiciones de uso, a todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.
          </P>

          <H3>2. Licencia de uso</H3>
          <P>
            Usted es el propietario y responsable de las imagenes que incluya en sus diseños.
          </P>
          <P>
            Se concede permiso para descargar copias de los Materiales/Diseños en el sitio web de tarjetasExplosivas.com/ para visualización y uso transitoria personal, no comercial. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede:
          </P>
          <ul>
            <li>
              Copiar los materiales/Diseños y difundirlos en otro sitios;
            </li>
            <li>
              usar los Materiales/Diseños para cualquier propósito comercial, o para cualquier exhibición pública (comercial o no comercial);</li>
            <li>
              intentar descompilar o aplicar ingeniería inversa a cualquiera de los Materiales/Diseños;
            </li>
            <li>
              eliminar cualquier copyright u otra notación de propiedad de los Materiales/Diseños donde se especifique.
            </li>
            <li>
              Transferir los Materiales/Diseños a otra persona o "reflejar" los Materiales/Diseños en cualquier otro servidor.
            </li>
            <li>
              Automatizar la descarga masiva de materiales/Diseños de cualquier manera.
            </li>
          </ul>

          <P>
            Esta licencia terminará automáticamente si viola cualquiera de estas restricciones y puede ser cancelada por tarjetasExplosivas.com/ en cualquier momento. Al finalizar su visualización de estos Materiales / Diseños o al finalizar esta licencia, debe destruir cualquier Material descargado en su poder, ya sea en formato electrónico o impreso.
          </P>

          <H3>3. Renuncia</H3>
          <P>
            Los materiales se proporcionan "tal cual". tarjetasExplosivas.com/ no ofrece ninguna garantía, expresa o implícita, y por este medio niega y niega todas las demás garantías, incluidas, entre otras, las garantías o condiciones implícitas de comercialización, idoneidad para un fin particular o la no infracción de la propiedad intelectual u otra violación de los derechos. Además, tarjetasExplosivas.com/ no garantiza ni hace ninguna representación con respecto a la precisión, los resultados probables o la confiabilidad del uso de los Materiales o relacionados con dichos Materiales o en cualquier sitio web vinculado a este sitio web.
          </P>

          <H3>4. Limitaciones</H3>
          <P>
            En ningún caso, tarjetasExplosivas.com/ o sus proveedores serán responsables de los daños (incluidos, entre otros, los daños debido a la interrupción del negocio) que surjan del uso o la incapacidad de utilizar los Materiales, incluso si tarjetasExplosivas.com/ o un representante autorizado de tarjetasExplosivas.com/ ha sido notificado oralmente o por escrito sobre la posibilidad de dicho daño. Debido a que algunas jurisdicciones no permiten limitaciones sobre garantías implícitas o limitaciones de responsabilidad por daños indirectos o incidentales, estas limitaciones pueden no aplicarse a usted.
          </P>

          <H3>5. Política de reembolso</H3>
          <P>
            Solo sera aplicable un rembolso en caso de un pago errado o duplicado, si tienene alguna consulta adicional o quiere su rembolso puede enviarnos un email a hola@tarjetasExplosivas.com para solicitarlo, en el cual debera de incluir lo siguiente:
          </P>
          <ul>
            <li>
              email registrado con nosotros
            </li>
            <li>
              Motivo de Rembolso
            </li>
            <li>
              Fecha de pago
            </li>
          </ul>

          <P>
            Nosotros nos encargaremos de revisar su solicitud y le responderemos en un plazo maximo de 72 Horas en dias habiles.
          </P>

          <H3>6. Revisiones y erratas</H3>
          <P>
            tarjetasExplosivas.com/ no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: por errores u omisiones en los contenidos, por falta de disponibilidad del sitio web, – el cual realizará paradas periódicas por mantenimientos técnicos. Los Materiales podrían incluir errores, incluidos, entre otros, técnicos, tipográficos o fotográficos. tarjetasExplosivas.com/ no garantiza que ninguno de los Materiales sea preciso, completo o actual. tarjetasExplosivas.com/ puede realizar cambios y actualizaciones en nuestra plataforma en cualquier momento sin previo aviso.
          </P>

          <P>
            En caso de que tenga problemas con su Material / Diseño o tenga problemas para poder descargarlo, puede enviarnos un email a hola@tarjetasExplosivas.com donde le podremos brindar soporte.
          </P>

          <H3>7. Links</H3>
          <P>
            tarjetasExplosivas.com/ pudiera contener en enlaces a otros sitios que pudieran ser de su interés. Una vez que usted de
            clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y
            por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros
            sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad y terminos de uso por lo cual es recomendable
            que los consulte para confirmar que usted está de acuerdo con estas.
          </P>

          <H3>8. Modificaciones de los términos de uso del sitio</H3>
          <P>
          tarjetasExplosivas.com/ puede revisar estos Términos y condiciones de uso en cualquier momento sin previo aviso. Al utilizar este sitio web, usted acepta regirse por la versión actual de estos Términos y condiciones de uso.
          </P>

          <H3>9. Compras</H3>
          <P>
            Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual puede incluir validación de la forma de pago y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. En algunos casos puede que se requiera una verificación por medio de correo electrónico en donde el usuario deberá enviar la información solicitada para la respectiva validación del pago.
          </P>

          <H3>10. Cookies</H3>
          <P>
            Utilizamos cookies para asegurar que damos la mejor experiencia al usuario en nuestro sitio web, si desea saber mas puede revisar nuestra <a href='/politica-de-cookies'>Politica de Cookies</a>
          </P>

          <H3>11. Politica de Privacidad</H3>
          <P>
            Este sitio web tarjetasExplosivas.com/ garantiza que la información personal que usted envía cuenta con la seguridad necesaria, si desea saber mas puede consultar nuestra <a href='/politica-de-privacidad'>Politica de Privacidad</a>
          </P>
        </Section>
        <CookiesConsent />
      </Panel>
    )
  }
}
