<template>
	<div class="mt-2 card__content-events">
		<mdb-container>
			
			<mdb-row col="12" class="d-flex align-items-stretch mb-5 webinar__content">
				<mdb-col v-if="loading" v-for="(item, index) in lists" lg="12" :key="item.id">
					<b-card>
						<b-row>
							<b-col cols="12" class="mb-3">
								<b-skeleton-img></b-skeleton-img>
							</b-col>
							<b-col cols="12">
								<b-skeleton animation="wave" width="85%"></b-skeleton>
								<b-skeleton animation="wave" width="55%"></b-skeleton>
								<b-skeleton animation="wave" width="70%"></b-skeleton>
							</b-col>
						</b-row>
					</b-card>
				</mdb-col>
				<div v-else>
					<center>
						<mdb-col v-if="lists.length < 1" lg="12" xs="12" sm="12">
							<mdb-alert color="primary" class="text-center">
								<mdb-icon icon="info-circle" size="lg"/> Belum ada event terdekat
							</mdb-alert>
						</mdb-col>

						<mdb-col v-else id="show-event" v-for="list in lists" md="4" xs="12" sm="12" :key="list.kegiatan_id">
							<mdb-card>
								<div class="event__image-wrap">
									<mdb-card-image :src="list.photo" alt="Card image cap"></mdb-card-image>
									<div class="overlay__event-img">
										<a :data-gall="list.photo" :href="list.photo" class="list-events icon" title="Lihat Foto">
											<mdb-icon icon="search-plus" />
										</a>
									</div>
								</div>
								<mdb-card-body>
									<mdb-badge class="badge btn-outline-primary" style="color:#004899!important;">{{list.kategori_value}}</mdb-badge>


									<mdb-card-title>{{list.kegiatan_title}}</mdb-card-title>
									<span>{{$moment(list.tgl_awal).format("LL")}} - {{$moment(list.tgl_akhir).format("LL")}}</span>

									<p class="text-gray text-truncate mb-2">
										{{list.kegiatan_desc}}
									</p>

									<span class="idr__color">
										{{$format(list.harga)}}
									</span>


									<div v-if="$route.path === '/events'">
										<nuxt-link  :to="{name: `detail-event-id-slug`, params: {id: list.kegiatan_id, slug: $slug(list.kegiatan_title)}}" class="btn btn-outline-primary mt-5 mb-2 btn-block" color="primary">Detail Event</nuxt-link>
									</div>

									<div v-else>
										<mdb-btn v-if="data_event || token.accessToken" color="primary" size="md" class="btn btn-outline-primary mt-5 mb-2 btn-block" @click="RegistrasiEvent(list.kegiatan_id)">Daftar</mdb-btn>

										<nuxt-link v-else :to="{name: `detail-event-id-slug`, params: {id: list.kegiatan_id, slug: $slug(list.kegiatan_title)}}" class="btn btn-outline-primary mt-5 mb-2 btn-block" color="primary">Detail Event</nuxt-link>
									</div>
								</mdb-card-body>
							</mdb-card>
						</mdb-col>
					</center>
				</div>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	export default{
		props: ['loading', 'lists', 'listToShow', 'token', 'data_event'],

		mounted(){
			this.VenoBox()
		},

		methods: {
			RegistrasiEvent(id){
				this.$emit('registrasi-event', id)
			},
			VenoBox(){
				new VenoBox({
					selector: '.list-events',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			}
		}
	}
</script>