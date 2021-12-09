// if route requires authentication and user is not authenticated, prevent access
// returns error name for logging
export default function(to, next, router, store) {

  if (!store.state.isLoggedIn) {
    console.log("geçemen");
    // store.dispatch("smackbar", {
    //   show: true,
    //   text: "Unauthorized access!",
    //   btn: {
    //     close: {
    //       color: "pink"
    //     }
    //   }
    // });

    // // if user is logging out from admin page, redirect to home page
    // if(to.fullPath === "/admin") {
    //   router.push("/").catch(() => {})
    // }
  } else {
    next();
  }
}