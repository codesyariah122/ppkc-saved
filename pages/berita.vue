<template>
	<div>
		<!-- List berita page content -->
		<BeritapageListBerita :lists="lists" :loading="loading" :listToShow="listToShow" @load-more-berita="ListBerita"/>
	</div>
</template>

<script>
	export default{
		name: 'berita',
		layout: 'default',

		data(){
			return {
				loading: null,
				lists: [],
				listToShow: 3
			}
		},

		beforeMount(){
			this.ConfigApiUrl()
		},

		mounted(){
			this.ListBerita(0)
		},

		methods:{
			ListBerita(page){
				// Clear list base on page == 1
				if(page == 1) page = 0 
				this.loading=true
				this.$axios.get(`${this.api_url}/web/berita/page?start=${page ? page : 0}`)
				.then(res => {
					// console.log(res.data)
					if(res.data.list_data.length > 0){
						this.lists = res.data.list_data
					}else{
						this.lists=[]
					}
				})
				.catch(err => {
					console.log(err.message)
				})
				.finally(() => {
					setTimeout(() => {
						this.loading=false
					}, 800)
				})
			},

			LoadListBerita(page){
				// Clear list base on page == 1
				if(page == 1){
					page = 0
				}
				this.ListBerita(page)
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