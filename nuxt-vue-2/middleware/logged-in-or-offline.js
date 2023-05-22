export default ({ $auth, redirect, route: { path, fullPath } }) => {
  const loggedIn = $auth.loggedIn
  const offline = window?.$nuxt?.isOffline

  if (!loggedIn && !offline && path !== '/login') {
    return redirect(`/login?next=${fullPath}`)
  }
}
