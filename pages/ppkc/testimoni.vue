<!-- Component base on directory /components/ppkc -->
<template>
	<div>
		<TestimonipageListTestimoni :path="path" :lists="lists" :loading="loading" :listToShow="listToShow" @load-more-testi="LoadListTestimoni"/>
		<!-- <pre>
			{{lists}}
		</pre> -->
	</div>
</template>

<script>
	export default{
		name: 'ppkc-testimoni',
		layout: 'default',

		data(){
			return {
				loading: null,
				lists: [],
				listToShow: 2,
				path: this.$route.name
			}
		},

		beforeMount(){
			this.ConfigApiUrl()
		},

		mounted(){
			this.ListTestimoni(0)
		},

		methods: {
			ListTestimoni(page){
				// Clear list base on page == 1
				if(page == 1) page = 0
				this.loading=true
				this.$axios.get(`${this.api_url}/web/testimoni/page?start=${page}`)
				.then(res => {
					// console.log(res.data.list_data)
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

			LoadListTestimoni(page){
				// console.log(page)
				this.ListTestimoni(page)
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