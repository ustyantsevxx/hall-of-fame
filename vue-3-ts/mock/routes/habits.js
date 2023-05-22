export const habitsRoutes = ctx => {
  ctx.namespace = 'habits'

  ctx.get('index', schema => {
    return {
      items: schema.db.habits,
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 1,
        total: 1
      }
    }
  })
}
