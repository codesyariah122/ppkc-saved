<template>
	<div class="embed__file">
		<mdb-container>
			<mdb-row col="12" class="webinar__content">
				<mdb-col lg="12">
					<div class="intro-video-area overlay div">
						<div class="container">
							<div class="row">
								<div class="col-12">
									<div class="div-title white-text">
										
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-12">
									<div class="intro-video-play">
										<div class="row justify-content-center">
											<div class="col-lg-10 col-12">
												<div class="play-thumb zoomIn" style="visibility: visible; animation-delay: 0.2s; animation-name: zoomIn;">
													<a @click="LightBox(details.url)" style='cursor: pointer;' class="glightbox video"><mdb-icon class="play-icon" far icon="play-circle" size="lg" /></a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> 
						</div>
					</div>
				</mdb-col>

				<!-- Informasi webinar -->
				<mdb-col lg="12" class="mt-2">
					<mdb-list-group>
						<mdb-list-group-item>
							<h4>Informasi Webinar</h4>
						</mdb-list-group-item>
						<mdb-list-group-item>
							<strong><b> Link Room : </b><a :href="details.link_room">Webinar Room</a> </strong>
								
							</span>
						</mdb-list-group-item>
						<mdb-list-group-item>
							<strong><b>Meeting ID : </b><span class="grey-text">{{details.username_room}}</span></strong> 
						</mdb-list-group-item>
						<mdb-list-group-item>
							<strong><b>Passcode : </b><span class="grey-text"> {{details.password_room}} </span></strong>
						</mdb-list-group-item>
					</mdb-list-group>	
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
				details: {}
			}
		},

		mounted(){
			this.WebinarDetail()
		},

		methods: {
			WebinarDetail(){
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
			},

			LightBox(video){
                GLightbox({
                    'href': video,
                    'type': 'video',
                    'source': 'youtube', //vimeo, youtube or local
                    'width': 800,
                    'autoplayVideos': true,
                });
            },
		}
	}
</script>