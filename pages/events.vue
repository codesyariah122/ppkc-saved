<template>
	<div>
		<!-- Header filter event page -->
		<EventpageHeader @update-list-event="ListEvent" :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" @load-more-event="LoadListEvent" :categories="categories" ref="testChild"/>

		<!-- List event page content -->
		<EventpageListEvents :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" :message="message" :empty="empty"	/>

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
			this.ListEvent(0,'', '', '')
		},

		methods:{
			ListEvent(page, keyword, category, month, loadingBtn){
				// Clear list base on page == 1
				if(page == 1) page = 0 
				const search_data = {
					'page': page,
					'keyword': keyword,
					'category': category,
					'month': month
				}
				// console.log(search_data)
				this.loadingBtn = loadingBtn ? loadingBtn : null
				this.loading=true
				this.$axios.get(`${this.api_url}/web/event/page?jenis_pelatihan=${category ? category : ''}&bulan_pelatihan=${month ? month : ''}&start=${page ? page : ''}&keyword=${keyword ? keyword : ''}`)
				.then(res => {
					this.categories = res.data.list_jenis_kegiatan
					// console.log(res.data)
					if(res.data.list_kegiatan_terdekat.length > 0){
						this.empty=false
						this.lists = res.data.list_kegiatan_terdekat
					}else{
						this.empty=true
						this.lists=[]
						this.message = 'Data event yang dicari tidak di temukan'
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
				if(page == 1){
					page = 0
				}
				this.ListEvent(page,'', '', '')
			},

			ConfigApiUrl(){
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			}

		},

		computed:{
			api_url(){
				return this.$store.getters['config/ConfigApiUrl']
			}
		}
	}
</script>
