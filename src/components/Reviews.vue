<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="reviews" :options="options">
        <a slot="upvote" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="upvote(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editReview(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteReview(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
    import Vue from 'vue'
    import VueTables from 'vue-tables-2'
    import ReviewService from "../services/ReviewService";

     import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect

      import 'sweetalert2/dist/sweetalert2.min.css';

      Vue.use(VueSweetalert2);

    Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true});

    export default {
        name: 'reviews',
        data () {
            return {
                messagetitle: ' Reviews List ',
                reviews: [],
                props: ['_id'],
                errors: [],
                columns: ['_id', 'message' ,'stars', 'user', 'upvotes','upvote', 'edit', 'remove'],
                options: {
                    perPage: 10,
                    filterable: ['stars', 'message', 'upvotes'],
                    sortable: ['upvotes'],
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

            },
            upvote: function (id) {
                ReviewService.upvoteReview(id)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.loadReviews();
                        console.log(response)
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error)
                    })
            },
            editReview: function (id) {
                this.$router.params = id;
                this.$router.push('edit')
            },
            deleteReview: function (id) {
                this.$swal({
                    title: 'Are you totaly sure?',
                    text: 'You can\'t Undo this action',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK Delete it',
                    cancelButtonText: 'Cancel',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    console.log('SWAL Result : ' + result)
                    if (result.value === true) {
                        ReviewService.deleteReview(id)
                            .then(response => {
                                // JSON responses are automatically parsed.
                                this.message = response.data
                                console.log(this.message)
                                this.loadReviews()
                                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                                this.$swal('Deleted', 'You successfully deleted this Reviews ' + JSON.stringify(response.data, null, 5), 'success')
                            })
                            .catch(error => {
                                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
                                this.errors.push(error)
                                console.log(error)
                            })
                    } else {
                        this.$swal('Cancelled', 'Your Review still Counts!', 'info')
                    }
                })
            },}}
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

  button.swal2-confirm.swal2-styled {
    color: white;
    background-color: red;
    border-color: black;
    border: 1px;
    height: 50px;
  }

</style>
