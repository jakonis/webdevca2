import Api from '@/services/api'

export default {
  fetchReviews () {
    return Api().get('/reviews')
  },
  postReviews (review) {
    return Api().post('/reviews', review,
      { headers: {'Content-type': 'application/json'} })
  }
}
