// if route requires authentication and user is not authenticated, prevent access
export default function(to, next, router, store) {
  const user = store.getters["user/getUser"]
  if (!(user && user.id)) {

    store.$app.$bvToast.toast("Unauthorized access!", {
      title: "You need to login to open dashboard.",
      toaster: "b-toaster-bottom-center",
    })

    // // if user is logging out from admin page, redirect to home page
    // if(to.fullPath === "/admin") {
    //   router.push("/").catch(() => {})
    // }
  } else {
    next();
  }
}