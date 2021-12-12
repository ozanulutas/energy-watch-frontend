// Prepares date to send to backend in YYYY-MM-DD format
const prepareDate = (date) => {
  return new Date(date).toLocaleDateString("fr-CA")
}


export { prepareDate }