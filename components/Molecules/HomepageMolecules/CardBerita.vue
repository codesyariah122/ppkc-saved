<template>
	<div>
		<mdb-row col="12" class="slider__berita">
			<mdb-col v-if="listsIndex <= lists.length" v-for="listsIndex in listsToShow" md="5" class="card__berita-list"  :key="lists[listsIndex-1].id">
				<mdb-card class="mt-2">
					<mdb-card-image :src="lists[listsIndex-1].foto_url" alt="Card image cap"></mdb-card-image>
					<mdb-card-body>
						<mdb-card-title class="mb-5 mt-1">{{lists[listsIndex-1].judul}}</mdb-card-title>
						<nuxt-link :to="{name: `detail-berita-id-slug`, params: {id: lists[listsIndex-1].id, slug: $slug(lists[listsIndex-1].judul)}}" class="mt-2 mb-2" color="primary">Baca Selengkapnya <mdb-icon icon="arrow-right" /></nuxt-link>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>
			
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['lists'],
		data(){
			return {
				listsToShow: 6
			}
		},
		mounted(){
			this.TnsSlider()
		},
		methods: {
			TnsSlider(){
				tns({
					"container": ".slider__berita",
					"items": this.$device.isDesktop ? 2 : 1,
					"center": true,
					"slideBy": 'page',
					"loop": false,
					"autoplay": false,
					"speed": 400,
					"autoplayButtonOutput": false,
					"swipeAngle": true,
					"mouseDrag": true,
					"lazyload": false,
					"speed": 400,
					"nav": false,
					"controls": true,
					"controlsText": ['<span class="fas fa-chevron-circle-left"></span>', '<span class="fas fa-chevron-circle-right"></span>'],
				});
			}
		}
	}
</script>

<style lang="scss">
	.tns-outer {
		position: relative;
	}
	[data-controls] {
		border: 0;
		padding: 0;
		font-size: 40px;
		position: absolute;
		top: 50%;
		margin-top: -18px;
		z-index: 1;
		background: transparent;
		color: $color-primary;
	}
	button[disabled]{
		color: $default-gray!important;
		cursor: not-allowed;
	}
	[data-controls="prev"] {
		left: -8px;
	}
	[data-controls="next"] {
		right: 5px;
	}
</style>