<template>
	<div>
		<mdb-row class="justify-content-center card__content">
			<!-- column event -->
			<mdb-col v-if="listIndex <= lists.length" v-for="listIndex in listsToShow" md="4" class="col-lg-4 d-flex align-items-stretch" :key="lists[listIndex-1].kegiatan_id">
				<mdb-card>
					<mdb-view hover>
						<a :href="`/detail/event/${lists[listIndex-1].kegiatan_id}/${$slug(lists[listIndex-1].kegiatan_title)}`">
							<mdb-card-image
							:src="lists[listIndex-1].photo"
							alt="Card image cap" class="img-fluid"/>
							<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
						</a>
					</mdb-view>
					<mdb-card-body>
						<mdb-container>
							<mdb-row>
								<mdb-col md="12">									
									<mdb-badge class="badge btn-outline-primary mb-4 badge__category">{{lists[listIndex-1].kategori_value}}</mdb-badge>
								</mdb-col>

								<mdb-col md="12">									
									<mdb-card-title>{{lists[listIndex-1].kegiatan_title}}</mdb-card-title>
								</mdb-col>

								<mdb-col md="12">									
									<span class="mt-5">{{$moment(lists[listIndex-1].tgl_awal).format("LL")}} - {{$moment(lists[listIndex-1].tgl_akhir).format("LL")}}</span>
								</mdb-col>

								<mdb-col md="12">
									<span class="mt-2 idr__color">
										{{$format(lists[listIndex-1].harga)}}
									</span>
									<nuxt-link :to="{name: `detail-event-id-slug`, params: {id: lists[listIndex-1].kegiatan_id, slug: $slug(lists[listIndex-1].kegiatan_title)}}" class="btn btn-outline-primary mt-3 mb-2 btn-block" color="primary">Detail Event</nuxt-link>
								</mdb-col>
							</mdb-row>							
						</mdb-container>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['lists', 'listsToShow']
	}
</script>