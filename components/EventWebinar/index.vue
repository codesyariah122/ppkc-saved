<template>
	<div class="embed__file">
		<mdb-container>
			<mdb-row col="12" v-if="loading" class="mt-5">
				<mdb-col lg="12">
					<div class="spinner-grow text-danger" role="status" style="width: 5rem; height:5rem;">
						<span class="sr-only">Loading...</span>
					</div>
				</mdb-col>
			</mdb-row>

			<mdb-row col="12" v-else>
				<mdb-col lg="12">
					 <b-embed 
                      type="iframe"
                      aspect="16by9"
                      :src="details.url"
                      allowfullscreen
                      @click="LightBox(details.url)"
                      allowfullscreen
                      ></b-embed>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	export default{
		props: ['id_webinar', 'token', 'api_url'],

		data(){
			return{
				loading: null,
				details: {}
			}
		},

		mounted(){
			this.WebinarDetail()
		},

		methods: {
			WebinarDetail(){
				this.loading = true
				const url = `${this.api_url}/web/webinar/${this.id_webinar}`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios
				.get(url)
				.then(({data}) => {
					this.details = data.webinar
				})
				.catch(err => {
					console.log(err.message)
				})
				.finally(() => {
					setTimeout(() => {
						this.loading=false
					}, 900)
				})
			},

			LightBox(video){
                GLightbox({
                    'href': video,
                    'type': 'video',
                    'source': 'local', //vimeo, youtube or local
                    'width': 800,
                    'autoplayVideos': true,
                });
            },
		}
	}
</script>