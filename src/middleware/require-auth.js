// if route requires authentication and user is not authenticated, prevent access
export default function (to, next, router, store) {

  const user = store.getters["user/getUser"]
  if (!(user && user.id)) {

    // if user is logging out from admin page, redirect to home page
    if (to.fullPath !== "/") {
      router.push("/").catch(() => { })
    }

    store.$app.$bvToast.toast("Unauthorized access!", {
      title: "You need to login to open dashboard.",
      toaster: "b-toaster-bottom-center",
    })


  } else {
    next();
  }
}