<template>
	<div class="embed__file">
		<mdb-container>
			<mdb-row col="12">
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
													<a @click="LightBox(video)" style='cursor: pointer;' class="glightbox video"><mdb-icon class="play-icon" far icon="play-circle" size="lg" /></a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> 
						</div>
					</div>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	export default{
		props: ['video'],

		methods: {
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