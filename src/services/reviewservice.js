import Api from '@/services/api'

export default {
  fetchReviews () {
    return Api().get('/reviews')
  },
  postReview (review) {
    return Api().post('/reviews', review,
      { headers: {'Content-type': 'application/json'} })
  },
  upvoteReview (id) {
    return Api().put(`/reviews/${id}/vote`)
  },
  deleteReview (id) {
    return Api().delete(`/reviews/${id}`)
  },
  fetchReview (id) {
    return Api().get(`/reviews/${id}`)
  },
  putReview (id, review) {
    console.log('REQUESTING ' + review._id + ' ' +
      JSON.stringify(review, null, 5))
    return Api().put(`/reviews/${id}`, review,
      { headers: {'Content-type': 'application/json'} })
  }
}
