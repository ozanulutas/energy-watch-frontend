export default {
  namespaced: true,
  
  state: () => ({

  }),
  mutations: {

  },
  actions: {
    // Show msg box for confirmation
    showMsgBox(_, payload) {
      return this.$app.$bvModal.msgBoxConfirm(payload, {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          return value
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  getters: {

  }
}