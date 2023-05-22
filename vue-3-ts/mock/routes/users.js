export const usersRoutes = ctx => {
  ctx.namespace = 'users'

  ctx.get('show_me', schema => schema.db.users.find(1))
}
