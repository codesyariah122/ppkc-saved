<template>
	<div class="webinar__list">
		<!-- Header filter event page -->
		<EventpageHeader @update-list-event="ListEvent" :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" @load-more-event="LoadListEvent" :categories="categories" ref="eventChild"/>

		<!-- List event page content -->
		<EventpageListEvents :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" :message="message" :empty="empty" :token="token" :data_event="data_event"/>

	</div>
</template>

<script>
	export default{
		name: 'events',
		layout: 'default',
		data(){
			return {
				loading: null,
				loadingBtn: null,
				lists: [],
				categories: [],
				listToShow: 3,
				message:'',
				empty: null
			}
		},

		beforeMount(){
			this.ConfigApiUrl()
		},

		mounted(){
			this.ListEvent(1,'', '', '')
		},

		methods:{
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			ListEvent(page, keyword, category, month, loadingBtn){
				// Clear list base on page == 1
				// if(page == 1) page = 0 
					const search_data = {
						'page': page,
						'keyword': keyword,
						'category': category,
						'month': month
					}
					// console.log(search_data)

					this.loadingBtn = loadingBtn ? loadingBtn : null
					this.loading=true
					const url = `${this.api_url}/web/event/paging?keyword=${keyword ? keyword : ''}&page=${page ? page : ''}&jenis_pelatihan=${category ? category : ''}&bulan_pelatihan=${month ? month : ''}`

					this.$axios.get(url)
					.then(res => {
						this.categories = res.data.list_jenis_kegiatan
						this.$refs.eventChild.ResetForm()

						// console.log(res.data.list_kegiatan_terdekat.length)
						if(res.data.list_kegiatan_terdekat.length > 0){
							this.empty=false
							this.lists = res.data.list_kegiatan_terdekat
						}else{
							this.empty=true
							if(search_data.month == undefined){
								this.message = "Pilih bulan pelatihan terlebih dahulu"
							}else{
								this.message = 'Data event yang dicari tidak di temukan'
							}
						}
					})
					.catch(err => {
						console.log(err.message)
					})
					.finally(() => {
						setTimeout(() => {
							this.loading=false
							this.loadingBtn=false
						}, 800)
					})
				},

			LoadListEvent(page){
				// Clear list base on page == 1
				// console.log(page)
				// if(page == 1){
				// 	page = 0
				// }
				this.ListEvent(page,'', '', '')
			},

			ConfigApiUrl(){
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			},

			SetEventLogin(data){
				this.$store.dispatch('config/setEventToLogin', JSON.stringify(data))
				this.$router.push({
					name: 'auth-login'
				})
			},

			GetEventDataLogin(){
				this.$store.dispatch('config/getEventDataToLogin', 'event')
			}
		},

		computed:{
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			},

			api_url(){
				return this.$store.getters['config/ConfigApiUrl']
			},

			set_event(){
				return this.$store.getters['config/ConfigSetEventLogin']
			},

			data_event(){
				return this.$store.getters['config/ConfigEventDataLogin']
			}
		}
	}
</script>