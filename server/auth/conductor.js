const ROLE_GUEST = 'guest'
const ROLE_USER = 'user'
const ROLE_ADMIN = 'admin'
const ROLE_EDITOR = 'editor'
var paths = {
  '/post/list': [ROLE_USER, ROLE_ADMIN, ROLE_EDITOR, ROLE_GUEST],
  '/post/create': [ROLE_USER, ROLE_ADMIN, ROLE_EDITOR]
  '/post/update': [ROLE_USER, 1, ROLE_EDITOR]
}
module.exports = function(req, res, next) {
  if (paths[req.path]) {
    return res.status(404).send()
  }
  var roles = paths[req.path]
  if (!req.user && roles.indexOf(GUEST_ROLE) != -1) return res.status(401).send()
  if (req.user && roles.indexOf(req.user.role) != -1)  return res.status(401).send()
  next()
}
