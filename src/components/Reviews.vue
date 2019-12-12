<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="reviews" :options="options">
      </v-client-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
    import Vue from 'vue'
    import VueTables from 'vue-tables-2'
    import ReviewService from "../services/reviewservice";

    Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true});

    export default {
        name: 'Reviews',
        data () {
            return {
                messagetitle: ' Reviews List ',
                reviews: [],
                errors: [],
                columns: ['_id', 'message' ,'stars', 'user', 'upvotes'],
                options: {
                    headings: {
                        _id: 'ID',
                        message: 'Message',
                        stars: 'Stars',
                        user: 'User',
                        upvotes: 'Upvotes'
                    }
                }
            }
        },
        // Fetches Reviews when the component is created.
        created () {
            this.loadReviews()
        },
        methods: {
            loadReviews: function () {
                ReviewService.fetchReviews()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.reviews = response.data;
                        console.log(this.reviews)
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error)
                    })

            }
        }
    }
</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
