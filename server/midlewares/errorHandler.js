export default function errorHandler (err, req, res, next) {
  console.log(err)

  if (!err) {
    return res.sendStatus(500)
  }

  res.status(err.status || 500).json({ error: err.message })
}
