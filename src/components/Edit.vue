<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-comments" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <review-form :review="review" reviewBtnTitle="Update Review"
                           @review-is-created-updated="updateReview"></review-form>
          </template>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import ReviewService from '@/services/ReviewService'
import Review from './Review'
import ReviewForm from './ReviewForm'

export default {
  data () {
    return {
      review: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Update Review '
    }
  },
  components: {
    Review,
    'review-form': ReviewForm
  },
  created () {
    this.getReview()
  },
  methods: {
    getReview: function () {
      ReviewService.fetchReview(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.review = this.temp[0]
          this.childDataLoaded = true
          console.log('Getting Review in Edit: ' + JSON.stringify(this.review, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateReview: function (review) {
      console.log('Before PUT ' + JSON.stringify(review, null, 5))
      ReviewService.putReview(this.$router.params, review)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(review, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
