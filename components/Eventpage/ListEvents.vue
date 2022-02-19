<template>
	<div class="mt-2 card__content-events">
		<mdb-container>
			<mdb-row v-if="loading" class="d-flex justify-content-center mt-2 mb-5" col="12">
				<mdb-col lg="12">
					<center>						
						<div class="spinner-border text-primary" style="width:7rem; height: 7rem;" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</center>
				</mdb-col>
			</mdb-row>
			<mdb-row v-else class="row justify-content-center mb-5 webinar__content">
				<mdb-col v-if="lists.length < 1" lg="12" xs="12" sm="12">
					<mdb-alert color="primary" class="text-center">
						Belum ada event terdekat
					</mdb-alert>
				</mdb-col>

				<mdb-col v-else id="show-event" v-for="list in lists" class="col-md-4 d-flex align-items-stretch" md="4" xs="12" sm="12" :key="list.kegiatan_id">
					<mdb-card :style="`${$device.isMobile ? 'max-width:335px;margin-bottom: 2rem;' : ''}`">
						<div class="event__image-wrap">
							<mdb-card-image :src="list.photo" alt="Card image cap"></mdb-card-image>
							<div class="overlay__event-img">
								<a :data-gall="list.photo" :href="list.photo" class="list-events icon" title="Lihat Foto">
									<mdb-icon icon="search-plus" />
								</a>
							</div>
						</div>
						<mdb-card-body>
							<mdb-badge class="badge btn-outline-primary mb-3" style="color:#004899!important;">{{list.kategori_value}}</mdb-badge>


							<mdb-card-title>{{list.kegiatan_title}}</mdb-card-title>

							<p class="mt-2 text-gray">
								{{list.kegiatan_desc}}
							</p>

							<span >{{$moment(list.tgl_awal).format("LL")}} - {{$moment(list.tgl_akhir).format("LL")}}</span>
							<br>

							<span class="idr__color">
								{{$format(list.harga)}}
							</span>


							<div v-if="$route.path === '/events'">
								<nuxt-link  :to="{name: `detail-event-id-slug`, params: {id: list.kegiatan_id, slug: $slug(list.kegiatan_title)}}" class="btn btn-outline-primary mt-3 mb-5 btn-block" color="primary">Detail Event</nuxt-link>
							</div>

							<div v-else>
								<mdb-btn v-if="data_event || token.accessToken" color="primary" size="md" class="btn btn-outline-primary mt-3 mb-5 btn-block" @click="RegistrasiEvent(list.kegiatan_id)">Daftar</mdb-btn>

								<nuxt-link v-else :to="{name: `detail-event-id-slug`, params: {id: list.kegiatan_id, slug: $slug(list.kegiatan_title)}}" class="btn btn-outline-primary mt-3 mb-5 btn-block" color="primary">Detail Event</nuxt-link>
							</div>
						</mdb-card-body>
					</mdb-card>
				</mdb-col>
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