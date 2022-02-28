<template>
	<div class="embed__file">
		<mdb-container>
			<mdb-row col="12" class="webinar__content">
				<mdb-col lg="12">
					<mdb-col lg="12">
						<b-embed
						type="iframe"
						aspect="16by9"
						:src="`https://www.youtube-nocookie.com/embed/${details.url}?autoplay=0&version=3&enablejsapi=1&showinfo=0&controls=0&rel=0&showinfo=0&disablekb=1&iv_load_policy=3&modestbranding=0`"
						allowfullscreen
						></b-embed>


						<div id="ytplayer"></div>
						<!-- <div class="embed-responsive embed-responsive-16by9">
							<iframe :src="details.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div> -->
						<!-- <video-embed ref="youtube" :src="details.url"></video-embed> -->
					</mdb-col>
				</mdb-col>

				<!-- Informasi webinar -->
				<mdb-col lg="12" class="mt-2">
					<mdb-list-group>
						<mdb-list-group-item>
							<h4>Informasi Webinar</h4>
						</mdb-list-group-item>
						<mdb-list-group-item>
							<strong><b> Link Room : </b><a :href="details.link_room">Link Webinar Room</a> </strong>
								
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

<style lang="scss">
	.list-group{
		.list-group-item{
			border:0;
		}
	}
</style>

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
			SetupEmbed(){
				var tag = document.createElement('script');
				tag.src = "https://www.youtube.com/player_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				var player;
				player = new YT.Player('ytplayer', {
					height: '360',
					width: '640',
					host: 'https://www.youtube-nocookie.com',
					videoId: 'M7lc1UVf-VE',
					rel: '0',
					controls: '0',
					showinfo: '0',
					autoplay:'0',
					iv_load_policy:'3',

				});
			},
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