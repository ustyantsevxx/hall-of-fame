export default ({ $auth, redirect }) => {
  if ($auth.loggedIn) {
    redirect('/')
  }
}
