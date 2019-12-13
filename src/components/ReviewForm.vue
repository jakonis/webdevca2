<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-comments" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <form @submit.prevent="submit">
            <div class="form-group">
              <label class="form-label">Select Stars</label>
              <select id="stars" name="stars" class="form-control"
                      type="text" v-model="stars">
                <option value="null" selected disabled hidden>Choose Stars Type</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div class="form-group" :class="{ 'form-group--error': $v.user.$error }">
              <label class="form__label">User Name</label>
              <input class="form__input" v-model.trim="$v.user.$model"/>
            </div>

            <div class="form-group" :class="{ 'form-group--error': $v.message.$error }">
              <label class="form__label">Personal Message</label>
              <input class="form__input" v-model.trim="$v.message.$model"/>
            </div>
            <div class="error" v-if="!$v.message.required">Message is Required</div>
            <div class="error" v-if="!$v.message.minLength">Message must have at least {{$v.message.$params.minLength.min}} letters.</div>
            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ reviewBtnTitle }}</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Review!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Reviewing...</p>
          </form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>
here
<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
// eslint-disable-next-line standard/object-curly-even-spacing
import { required, minLength} from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'Review',
  props: ['reviewBtnTitle', 'donation'],
  data () {
    return {
      messagetitle: ' Review ',
      message: '',
      stars: 0,
      user: '',
      upvotes: 0,
      review: {},
      submitStatus: null
    }
  },
  validations: {
    message: {
      required,
      minLength: minLength(5)
    },
    user: {
      required,
      minLength: minLength(1)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var review = {
            stars: this.stars,
            user: this.user,
            upvotes: this.upvotes,
            message: this.message
          }
          // eslint-disable-next-line no-undef
          this.review = review
          console.log('Submitting in ReviewForm : ' +
                JSON.stringify(this.review, null, 5))
          this.$emit('review-is-created-updated', this.review)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .review-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
