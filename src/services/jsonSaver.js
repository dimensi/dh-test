export default {
  save: data => localStorage.setItem('family', JSON.stringify(data)),
  get: () => {
    try {
      return JSON.parse(localStorage.getItem('family'))
    } catch (err) {
      return null
    }
  },
  remove: () => localStorage.removeItem('family')
}
