<template>
	<mdb-container>
		<mdb-row col="12">
			<mdb-col lg="12">
				<b-embed
				type="iframe"
				aspect="16by9"
				:src="video"
				allowfullscreen
				></b-embed>
			</mdb-col>
		</mdb-row>
	</mdb-container>
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