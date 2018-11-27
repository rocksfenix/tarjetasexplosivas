import fs from 'fs'
import path from 'path'
import moment from 'moment'

moment.locale('es')

const CONTENT = (work, sub) => `
\r\n
\r\n
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n
    Regalaras algo maravillos, unico y personalizado\r\n
    La persona afortunada de recibir esta valiosa tarjeta\r\n
    se sentira muy feliz.\r\n
    \r\n
    Puedes encontrar el video de como realizar la tarjeta\r\n
    en este enlace:\r\n
    https://www.tarjetasexplosivas.com/cubo-instrucciones\r\n
\r\n
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n
  \r\n
  Si tienes cualquier problema no dudes en contactarnos en:\r\n
  hola@tarjetasexplosivas.com\r\n

\r\n
     Datos del projecto:\r\n
     ID: ${work._id}\r\n
     SUB: ${sub}\r\n
     Fecha de compilacion: ${moment(Date.now()).format('LLLL')}\r\n
     Link de tu Diseño: https://tarjetasExplosivas.com/cube-app/${work._id}\r\n
\r\n
\r\n
  Con amor <3 El equipo de:\r\n
  ╔╦╗┌─┐┬─┐ ┬┌─┐┌┬┐┌─┐┌─┐╔═╗─┐ ┬┌─┐┬  ┌─┐┌─┐┬┬  ┬┌─┐┌─┐ ┌─┐┌─┐┌┬┐\r\n
   ║ ├─┤├┬┘ │├┤  │ ├─┤└─┐║╣ ┌┴┬┘├─┘│  │ │└─┐│└┐┌┘├─┤└─┐ │  │ ││││\r\n
   ╩ ┴ ┴┴└─└┘└─┘ ┴ ┴ ┴└─┘╚═╝┴ └─┴  ┴─┘└─┘└─┘┴ └┘ ┴ ┴└─┘o└─┘└─┘┴ ┴\r\n
\r\n
`
const createReadme = (endPath, filename, work, sub) => new Promise((resolve, reject) => {
  const location = path.resolve(endPath, filename)
  fs.writeFile(location, CONTENT(work, sub), { encoding: 'utf8' }, (error) => {
    if (error) return reject(error)
    resolve()
  })
})

export default createReadme
