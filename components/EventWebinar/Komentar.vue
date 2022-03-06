<template>
	<div>
		<mdb-badge pill color="light-blue" class="mt-2 mb-3"><mdb-icon far icon="comments" size="lg" /> Komentar : </mdb-badge>
		<div v-if="loading_lists">
			<b-card  no-body class="comment__box overflow-hidden mb-3">
				<b-row no-gutters class="row justify-content-center">
					<b-col md="2">
						<b-skeleton type="avatar" class="rounded-pill" width="100"></b-skeleton>
					</b-col>
					<b-col md="8">
						<b-card-body>
							<b-skeleton animation="fade" width="85%"></b-skeleton>
							<b-skeleton animation="fade" width="55%"></b-skeleton>
							<b-skeleton animation="fade" width="70%"></b-skeleton>
						</b-card-body>
					</b-col>
				</b-row>
			</b-card>
		</div>
		<div v-else>
			<b-card v-if="listIndex <= lists.length" v-for="(listIndex, index) in listToShow" :key="index" no-body class="comment__box overflow-hidden mb-2">
				<b-row no-gutters class="row justify-content-center">
					<b-col md="2">
						<b-card-img :src="lists[listIndex-1].user_photo" alt="Image" class="rounded-pill"></b-card-img>
					</b-col>
					<b-col md="8">
						<b-card-body :title="lists[listIndex-1].user_name">
							<b-card-text>
								{{lists[listIndex-1].komentar}}
							</b-card-text>
							<small class="text-disable">
								{{$moment(lists[listIndex-1].created_at).format("LLLL")}}
							</small>
						</b-card-body>
					</b-col>
				</b-row>
			</b-card>


			<b-button v-if="lisToShow <= lists.length || lists.length > listToShow" variant="success" pill block class="mt-4" @click="LoadMore">
				<div>
					Lebih Banyak <mdb-icon icon="angle-down" size="lg"/>
				</div>
			</b-button>

		</div>

		<div class="send__komentar mt-5">
			<b-form-textarea
			id="textarea"
			v-model="field.komentar"
			placeholder="Tulis komentar Anda ..."
			rows="3"
			max-rows="6"
			></b-form-textarea>

			<mdb-alert v-if="error" color="danger" @closeAlert="error=false" dismiss class="mt-5">
				<strong>Oops ! </strong> {{validation.error}}
			</mdb-alert>

			<mdb-alert v-if="success" color="success" @closeAlert="success=false" dismiss class="mt-5">
				<strong>Halo, {{comment.user_name}} </strong> komentar anda telah terkirim
			</mdb-alert>

			<b-button @click.prevent="KirimKomentar" variant="primary" pill class="mt-4 float-right">
				<div v-if="loading_send">
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					Loading...
				</div>
				<div v-else>
					Kirim Komentar <mdb-icon far icon="paper-plane" size="md"/>
				</div>
			</b-button>
		</div>

	</div>
</template>

<style lang="scss">
	@media (min-width: 992px) {
		.comment__box{
			max-width:800px;
			.card-img,.b-skeleton-avatar{
				margin-left: 2rem;
				margin-top: 1rem;
				margin-bottom: 1rem;
				max-width: 80px;
			}

			.send__komentar{
				textarea{
					background: $scroll-bar-bg!important;
				}
			}
		}
	}
</style>

<script>
	export default{
		props: [
			'api_url',
			'token',
			'profiles'
		],

		data(){
			return {
				detail_webinar: localStorage.getItem("detail_webinar") ? JSON.parse(localStorage.getItem("detail_webinar")) : '',
				loading_lists: null,
				loading_send: null,
				lists: [],
				listToShow: 3,
				field: {},
				data_status: '',
				comment: {},
				validation: {},
				error: false,
				success: null
			}
		},

		mounted(){
			this.KomentarLists()
		},

		methods: {
			KomentarLists(start){
				this.loading_lists = true
				const url = `${this.api_url}/web/webinar/komentar/list?start=${start ? start : 0}&pelatihan_detail_id=${this.detail_webinar.webinar.pelatihan_detail_id}`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(url)
				.then(({data}) => {
					this.lists = data.list_data

				})
				.catch(err => console.log(err.response))
				.finally(() => {
					setTimeout(() => {
						this.loading_lists = false
					}, 2500)
				})
			},

			LoadMore(){
				this.loading=true
				this.listToShow += 1
				setTimeout(() => {
					this.loading=false
				},1500)
			},

			KirimKomentar(){
				this.loading_send=true
				const url = `${this.api_url}/web/webinar/komentar`
				const data = {
					pelatihan_id: this.detail_webinar.webinar.pelatihan_detail_id,
					komentar: this.field.komentar
				}
				this.$axios.post(url,{
					pelatihan_detail_id: data.pelatihan_id,
					komentar: data.komentar
				})
				.then(({data}) => {
					this.comment = data.comment
					if(this.comment.data_status === 1){
						window.scrollTo(0,0)
						this.success=true
						this.field.komentar = ''
						this.data_status = this.comment.data_status
					}
				})
				.catch(err => {
					console.log(err.message)
					this.loading_send=false
					this.error = true
					this.validation.error=err.message
				})
				.finally(() => {
					setTimeout(() => {
						this.KomentarLists()
						this.loading_send=false
					}, 1500)
				})
			}
		}
	}
</script>