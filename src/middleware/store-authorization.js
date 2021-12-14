import { BToast } from 'bootstrap-vue'

// Checks if user authorized by given params
const authorizeOrDie = ({ userRole, contidions, message }) => {
  if (!contidions.includes(userRole)) {
    const toast = new BToast()

    // Show error toast
    toast.$bvToast.toast(message, {
      title: "Error",
      toaster: "b-toaster-bottom-center",
    })

    throw new Error("Authorization viloation!")
  }
}

export { authorizeOrDie }