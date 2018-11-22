import React, { Component } from 'react'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'

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

const H4 = styled.h4`
  color: #30233F;
  font-size: 22px;

  @media (max-width: 900px) {
    margin: 1em auto;
    padding: 0 .3em;
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
  overflow-y: auto;

  @media (max-width: 900px) {
    width: 100%;
  }
`
const P = styled.p`
  @media (max-width: 900px) {
    width: 80%;
    margin: 1em auto;
  }
`

const Present = styled.img`
  display: block;
  margin: 0 auto;
`

const Panel = styled.div`
  position: relative;
  overflow-y: auto;
  height: 100vh;
`

const Strong = styled.strong`
  color: #30233F;
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
          <Present src='/static/img/privacy.svg' />
          <Title>POLÍTICA DE PRIVACIDAD</Title>
          <Subtitle>Última actualización el 22 de Noviembre del 2018</Subtitle>
          <P>
            El presente Política de Privacidad establece los términos en que tarjetasExplosivas.com/  usa
            y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web.
            Estamos comprometidos con la seguridad de los datos de nuestros usuarios.
            Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado,
            lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento.
            Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada
            por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de
            acuerdo con dichos cambios.
          </P>
          <H3>1. ¿QUÉ SON LOS DATOS PERSONALES?</H3>
          <P>
            Una pequeña aproximación es importante, por ello, debes saber que sería cualquier información relativa a una persona que nos facilita cuando visita nuestro sitio web, en nuestro caso nombre e email, y si compra algún producto necesitando factura, solicitaremos Domicilio completo, nombre, apellidos y IFE, INE, DNI o CIF.
          </P>
          <Strong>PRINCIPIOS PARA EL TRATAMIENTO DE DATOS</Strong>
          <P>
            Para tratar tus datos personales, aplicarémos según el RGPD los siguientes principios:
          </P>
          <ul>
            <li><Strong>Principio de licitud, lealtad y transparencia:</Strong> Siempre vamos a requerir tu consentimiento para el tratamiento de tus datos personales para uno o varios fines específicos que te informaré previamente con absoluta transparencia.</li>
            <li><Strong>Principio de minimización de datos:</Strong>Solo te voy a solicitar datos estrictamente necesarios en relación con los fines para los que los requiero.</li>
            <li><Strong>Principio de limitación del plazo de conservación:</Strong> como más adelante podrás comprobar, los datos serán mantenidos durante no más tiempo del necesario para los fines del tratamiento, en función a la finalidad, te informaré del plazo de conservación correspondiente, en el caso de suscripciones, periódicamente revisaré mis listas y eliminaré aquellos registros inactivos durante un tiempo considerable.</li>
            <li><Strong>Principio de integridad y confidencialidad:</Strong> Tus datos serán tratados de tal manera que se garanticemos una seguridad adecuada de los datos personales y se garantice confidencialidad. Debes saber que tomamos todas las medidas encaminadas a evitar el acceso no autorizado o uso indebido de los datos de nuestros usuarios por parte de terceros.</li>
          </ul>

          <H3>2. FINALIDAD, LEGITIMACION, CATEGORÍA DE LOS DATOS RECABADOS, CONSENTIMIENTO AL TRATAMIENTO, MENORES DE EDAD.</H3>

          <H4>2.1 FINALIDAD</H4>
          <P>
            Tal y como se recoge en la normativa, se informa al USUARIO que, a través de los formularios de contacto, o suscripciones se recaban datos, los cuales se almacenan en un fichero, con la exclusiva finalidad de envío de comunicaciones electrónicas, tales como: boletines (newsletters), nuevas entradas (posts), ofertas comerciales, confirmaciones de pago etc.
          </P>
          <P>
            Asimismo podrá dar cumplimiento mediante los datos, a los requerimientos solicitados por los USUARIOS.
          </P>
          <P>
            En definitiva la <Strong>FINALIDAD</Strong> es la siguiente:
          </P>
          <ul>
            <li>El desarrollo de una plataforma que permita diseñar tarjetas de regalo</li>
            <li>La venta de Material / Diseños para Impresion de de tarjetas personalizados para regalo</li>
            <li>Subministramos contenidos en nuestro blog</li>
            <li>Gestionar la lista de suscriptores y usuarios adscritos a la web.</li>
          </ul>
          <P>
            Únicamente el titular tendrá acceso a sus datos, y bajo ningún concepto, estos datos serán cedidos, compartidos, transferidos, ni vendidos a ningún tercero.
          </P>

          <P>
            La aceptación de la política de privacidad, mediante el procedimiento establecido de dole opt-in, se entenderá a todos los efectos como la prestación de CONSENTIMIENTO EXPRESO E INEQUIVOCO del USUARIO al tratamiento de los datos de carácter personal en los términos que se exponen en el presente documento, así como a la transferencia internacional de datos que se produce, exclusivamente debido a la ubicación física de las instalaciones de los proveedores de servicios y encargados del tratamiento de datos.
          </P>

          <P>
            En ningún caso se realizará un uso diferente que la finalidad para los que han sido recabados los datos ni muchos menos cederémos a un tercero estos datos.
          </P>

          <H4>2.2 MENORES DE EDAD</H4>
          <P>
            En el supuesto de ser mayor de catorce años, podrás registrarte en tarjetasexplosivas.com/ sin necesidad del consentimiento previo de tus padres o tutores.
          </P>

          <P>
            ¿Qué ocurre en el caso de que seas menor de 14 años?
          </P>

          <P>
            En este supuesto, será condición obligatoria el consentimiento de tus padres o tutores para que podamos tratar sus datos personales
          </P>

          <P>
            Advertencia: Si tienes menos de catorce años y no has obtenido el consentimiento de tus padres, no puedes registrarte en la web por lo que procederemos a denegar su solicitud en caso de tener constancia de ello.
          </P>

          <H4>2.3 LEGITIMACIÓN</H4>

          <P>
            Gracias al consentimiento, podemos tratar tus datos siendo requisito obligatorio para poder suscribirte a la página web.
          </P>

          <P>
            Como bien sabes, puedes retirar tu consentimiento en el momento que lo desees.
          </P>

          <H4>2.4 CATEGORÍA DE LOS DATOS</H4>
          <P>
            Los datos recabados en ningún momento son especialmente protegidos, sino que se encuentran categorizados como datos identificativos.
          </P>

          <H4>2.5 TIEMPO DE CONSERVACIÓN DE LOS DATOS</H4>
          <P>
            Conservaré tus datos durante el tiempo legalmente establecido o hasta que solicites eliminarlos.
          </P>

          <H4>2.6 EXACTITUD Y VERACIDAD DE LOS DATOS</H4>

          <P>
            Obviamente eres el único responsable de la veracidad y exactitud de los datos que nos remitas eximiéndonos de cualquier tipo de responsabilidad al respecto.
          </P>

          <P>
            Como usuario, debes garantizar la exactitud y autenticidad de los datos personales facilitados debiendo aportar la información completa y correcta en los distintos formularios de captación de datos.
          </P>

          <H3>3. CUMPLIMIENTO DE LA NORMATIVA DE APLICACIÓN</H3>

          <P>
            TarjetasExplosivas.com cumple con el Reglamento General (UE) sobre Protección de Datos, velando por garantizar un correcto uso y tratamiento de los datos personales del usuario.
          </P>

          <P>
            En cumplimiento de lo establecido en la normativa, le informamos que los datos suministrados, así como aquellos datos derivados de su navegación, podrán ser almacenados en los ficheros de TarjetasExplosivas.com y tratados para la finalidad de atender su solicitud y el mantenimiento de la relación que se establezca en los formularios que suscriba.
          </P>

          <P>
            Adicionalmente, el USUARIO consiente el tratamiento de sus datos con la finalidad de informarles, por cualquier medio, incluido el correo electrónico, de productos y servicios de TarjetasExplosivas.com
          </P>

          <P>
            En caso de no autorizar el tratamiento de sus datos con la finalidad señalada anteriormente, el USUARIO podrá ejercer su derecho de oposición al tratamiento de sus datos en los términos y condiciones previstos más adelante en el apartado “Ejercicio de Derechos”
          </P>

          <H3>4. MEDIDAS DE SEGURIDAD</H3>
          <P>
            TarjetasExplosivas.com le informa que tiene implantadas las medidas de seguridad de índole técnica y organizativas necesarias para garantizar la seguridad de sus datos de carácter personal y evitar su alteración, pérdida y tratamiento y/o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos, ya provengan de la acción humana o del medio físico o natural. Todo ello de conformidad con lo previsto en el RGPD.
          </P>

          <P>
            Asimismo, TarjetasExplosivas.com ha establecido medidas adicionales en orden a reforzar la confidencialidad e integridad de la información en su organización. Manteniendo continuamente la supervisión, control y evaluación de los procesos para asegurar el respeto a la privacidad de los datos.
          </P>

          <P>
            Igualmente, tal y como pueden comprobar, la web dispone de certificado SSL por lo que se garantiza la seguridad de sus datos.
          </P>

          <H3>5. EJERCICIO DE DERECHOS</H3>
          <P>
            Aquellas personas físicas que hayan facilitado sus datos a través de tarjetasExplosivas.com/, podrán dirigirse al titular de la misma con el fin de poder ejercitar gratuitamente sus derechos de acceso a sus datos, rectificación o supresión, limitación y oposición respecto de los datos incorporados en sus ficheros.
          </P>

          <P>
            El método más rápido y sencillo sería accediendo en tu cuenta de usuario directamente y modificar tus datos o borrar tu cuenta de usuario. Cualquier información que necesitemos almacenar, en virtud de una obligación legal o contractual, será bloqueada y sólo utilizada para dichos fines en lugar de ser borrada.
          </P>

          <P>
            El interesado podrá ejercitar sus derechos mediante comunicación por escrito dirigida a tarjetasExplosivas.com/ con la referencia “Protección de datos”, especificando sus datos, acreditando su identidad y los motivos de su solicitud en la siguiente dirección de correo electronico: <Strong>hola@tarjetasExplosivas.com</Strong>
          </P>

          <H3>6. Enlaces a Terceros</H3>
          <P>
            Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez que usted de click en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.
          </P>

          <H3>7. MODIFICACIÓN DE LA POLÍTICA DE PRIVACIDAD</H3>
          <P>
            TarjetasExplosivas.com/ se reserva el derecho a modificar su Política de Privacidad, de acuerdo a su propio criterio, motivado por un cambio legislativo, jurisprudencial o doctrinal de las agencias de proteccionn de datos de cada pais respectivamente.
          </P>
          <P>
            Cualquier modificación de la Política de Privacidad será publicada al menos diez días antes de su efectiva aplicación. El uso de tarjetasExplosivas.com/ después de dichos cambios, implicará la aceptación de los mismos.
          </P>

          <H3>8. SERVICIOS OFRECIDOS POR TERCEROS EN ESTA WEB</H3>
          <P>
            Para prestar servicios estrictamente necesarios para el desarrollo de nuestra actividad, TarjetasExplosivas.com/ utiliza los siguientes prestadores bajo sus correspondientes condiciones de privacidad.
            <ul>
              <li>Hosting: Heroku</li>
              <li>CDN: Amazon Cloud Font</li>
              <li>Almacenamiento de ficheros: Amazon S3</li>
              <li>Bases de datos: MongoDB Atlas</li>
              <li>Medios de pago: Paypal</li>
              <li>Metricas: Google Analytics</li>
              <li>Videos: Wistia</li>
            </ul>
          </P>

          <P>
            En tarjetasExplosivas.com también se estudian las preferencias de sus usuarios, sus características demográficas, sus patrones de tráfico, y otra información en conjunto para comprender mejor quiénes constituyen nuestra audiencia y qué es lo que necesita. El rastreo de las preferencias de nuestros usuarios también nos ayuda a mostrarle los avisos publicitarios más relevantes.
          </P>

          <P>
            El usuario y, en general, cualquier persona física o jurídica, podrá establecer un hiperenlace o dispositivo técnico de enlace (por ejemplo, links o botones) desde su sitio web a tarjetasExplosivas.com/ (el “Hiperenlace“). El establecimiento del Hiperenlace no implica en ningún caso la existencia de relaciones entre tarjetasExplosivas.com/ y el propietario del sitio o de la página web en la que se establezca el Hiperenlace, ni la aceptación o aprobación por parte de tarjetasExplosivas.com/ de sus contenidos o servicios. En todo caso, tarjetasExplosivas.com/ se reserva el derecho de prohibir o inutilizar en cualquier momento cualquier Hiperenlace al Sitio Web.
          </P>

          <H3>9. ¿ NO DESEAS RECIBIR INFORMACION DE NOSOTROS O DESEAS REVOCAR TU CONSENTIMIENTO ?</H3>
          <P>
            De conformidad con lo dispuesto en la Ley 34/20023, de 11 de junio de Servicios de la Sociedad de la Información y del Comercio Electrónico puedes oponerte al uso de su información para fines publicitarios, investigaciones de mercado o desarrollo de encuestas de satisfacción en cualquier momento, así como revocar tu consentimiento en cualquier momento (sin efecto retroactivo).
          </P>

          <P>
            Para ello, deberás enviar un correo electrónico a la dirección <Strong>hola@tarjetasExplosivas.com</Strong>. Si has recibido publicidad por correo electrónico, también podrás oponerte desde dicho correo electrónico, pinchando en el enlace incluido en el mismo siguiendo las instrucciones que te sean facilitadas.
          </P>

          <P>
            Por favor, ten en cuenta que nuestros sistemas pueden requerir un lapso de tiempo que en ningún caso superará 48 horas para que tu oposición o revocación se hagan efectivas, entendiéndose que durante dicho periodo de tiempo puedes seguir recibiendo mensajes.
          </P>

          <P>
            En relación con la gestión de tus datos asociados a los perfiles sociales de tarjetasExplosivas.com/, el ejercicio del derecho de acceso, dependerá de la funcionalidad de la red social y las posibilidades de acceso a la información de los perfiles de los usuarios. Con relación a los derechos de acceso y rectificación, le recomendamos que sólo podrá satisfacerse en relación a aquella información que se encuentre bajo el control de tarjetasExplosivas.com/.
          </P>

          <P>
            Además podrá dejar de interactuar, seguir o recibir información de los perfiles sociales de tarjetasExplosivas.com/ eliminar los contenidos que dejen de interesarte o restringir con quien comparte sus conexiones, mediante los mecanismos estipulados en las diferentes redes sociales.
          </P>

          <P>
            El usuario podrá acceder a las políticas de privacidad de cada Red Social, así como configurar su perfil para garantizar su privacidad. tarjetasExplosivas.com/ anima a los usuarios a familiarizarse con las condiciones de uso de las distintas redes sociales antes de comenzar a usarlas.
          </P>
          <ul>
            <li>Facebook: https://www.facebook.com/help/323540651073243/</li>
            <li>Twitter: https://twitter.com/privacy</li>
            <li>Instagram: https://help.instagram.com/155833707900388</li>
          </ul>

          <H3>10. ACEPTACIÓN, CONSENTIMIENTO Y REVOCABILIDAD</H3>
          <P>
            El Usuario declara haber sido informado de las condiciones sobre protección de datos de carácter personal, aceptando y consintiendo el tratamiento de los mismos por parte de  tarjetasExplosivas.com/ en la forma y para las finalidades indicadas en el aviso legal.
          </P>

          <P>
            Como bien sabes y le hemos comunicado a lo largo de las presentes políticas de privacidad, en cualquier momento podrá revocar sus datos, pero siempre sin carácter retroactivo.
          </P>

          <H3>¿QUÉ SON LAS COOKIES?</H3>
          <P>
            Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor
            servicio personalizado de su web.
          </P>
          <P>
            Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente, visitas a una web . Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener  un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies.
            Si se declinan es posible que no pueda utilizar algunos de nuestros servicios, puede encontrar mas informacion aqui <a href='/politica-de-cookies'>Politica de Cookies</a>.
          </P>
        </Section>
      </Panel>
    )
  }
}
