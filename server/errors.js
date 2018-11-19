// La petición estaba bien formada pero no se pudo seguir debido a errores de semantica.
export const ValidationError = (message) => {
  const error = new Error('Validation Error')
  error.message = message || 'unknow'
  error.status = 422
  return error
}

// El cliente no posee los permisos necesarios para cierto contenido
// por lo que el servidor está rechazando otorgar una respuesta apropiada.
export const ForbiddenError = (message) => {
  const error = new Error('Forbidden Error')
  error.message = message || 'unknow'
  error.status = 403
  return error
}

// La autentificacion es requerida para esta solicitud
export const AuthenticationRequiredError = (message) => {
  const error = new Error('Authentication is required')
  error.message = message || 'unknow'
  error.status = 401
  return error
}

// El servidor no pudo encontrar el contenido solicitado.
export const NotFound = (message) => {
  const error = new Error('Not Found')
  error.message = message || 'unknow'
  error.status = 404
  return error
}

// Error desconocido
export const UnknownError = (message) => {
  const error = new Error('Unknown Error')
  error.message = message || 'unknow'
  error.status = 500
  return error
}
