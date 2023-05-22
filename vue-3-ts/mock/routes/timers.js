export const timersRoutes = ctx => {
  ctx.namespace = 'timers'

  ctx.get('index', schema => {
    return {
      items: schema.db.timers,
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 1,
        total: 1
      }
    }
  })
}
