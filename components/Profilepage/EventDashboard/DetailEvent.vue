<template>
	<div>
		<div v-if="loading" class="mb-5">
			<b-card>
				<b-skeleton animation="wave" width="85%"></b-skeleton>
				<b-skeleton animation="wave" width="55%"></b-skeleton>
				<b-skeleton animation="wave" width="70%"></b-skeleton>
			</b-card>
		</div>
		<div v-else class="title-section">
			<mdb-row class="event__detail-content">
				<mdb-col md="5" sm="12" xs="12" class="col-1">
					<div class="event__image-wrap">
						<img :src="details.photo" class="rounded image img-fluid" width="300">
						<div class="overlay__event-img">
							<a :data-gall="details.photo" :href="details.photo" class="event-profile icon" :title="details.kegiatan_title">
								<mdb-icon icon="search-plus" />
							</a>
						</div>
					</div>
				</mdb-col>

				<mdb-col md="7" sm="12" xs="12" col="12" class="col-2">
					<h4>
						{{details.kegiatan_title}}
					</h4>
					<h6 class="mt-3">
						{{details.harga ? $format(details.harga) : 'Rp. -'}}
					</h6>

					<mdb-row class="inside__first mt-3">
						<mdb-col md="4">
							<h5>Jenis kegiatan</h5>
							<p>
								{{details.kategori_value}}
							</p>
						</mdb-col>
						<mdb-col md="4">
							<h5>Nilai SKP</h5>
							<p>
								{{details.nomor_skp ? details.nomor_skp : '-'}}
							</p>
						</mdb-col>
						<mdb-col md="12">
							<h5>Deskripsi</h5>
							<p>
								{{details.kegiatan_desc}}
							</p>
						</mdb-col>
						<mdb-col md="12">
							<h5>Waktu</h5>
							<p>
								{{$moment(details.tanggal_awal).format("LL")}} - {{$moment(details.tanggal_akhir).format("LL")}}
							</p>
						</mdb-col>
					</mdb-row>

					<mdb-row class="inside__second mt-3">


						<mdb-col>
							<div v-if="loading">
								<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
								Loading...
							</div>
							<div v-else>
								<mdb-btn disabled color="success" size="md" block> 
									<mdb-icon icon="check" size="lg"/> {{status_pendaftaran}}
								</mdb-btn>
							</div>
						</mdb-col>

					</mdb-row>

				</mdb-col>
			</mdb-row>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['details', 'loading', 'status_pendaftaran'],

		beforeMount(){
			this.VenoBox()
		},

		methods: {
			VenoBox(){
				new VenoBox({
					selector: '.event-profile',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			},
		}
	}
</script>