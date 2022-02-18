<template>
	<div>
		<mdb-row>
			<mdb-col md="3" sm="12" xs="12" class="col-1">
				<div class="event__image-wrap">
					<img :src="details.photo" class="rounded image">
					<div class="overlay__event-img">
						<a :data-gall="details.photo" :href="details.photo" class="event-lists icon" title="Lihat Foto">
							<mdb-icon icon="search-plus" />
						</a>
					</div>
				</div>
			</mdb-col>

			<mdb-col md="9" sm="12" xs="12" col="12" class="col-2">
				<h1>
					{{details.kegiatan_title}}
				</h1>
				<h4 class="mt-3">
					{{details.harga ? $format(details.harga) : 'Rp. -'}}
				</h4>

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
					<mdb-col v-if="status_pendaftaran == 'Daftar'">
						<div v-if="loading">
							<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
							Loading...
						</div>
						<div v-else>
							<mdb-btn @click="RegistrasiEvent(details.kegiatan_id)" gradient="blue" size="md">
								<mdb-icon far icon="calendar-plus" /> {{status_pendaftaran}}
							</mdb-btn>
						</div>
					</mdb-col>

					<mdb-col v-else-if="status_pendaftaran == 'Menunggu Konfirmasi'">
						<div v-if="loading">
							<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
							Loading...
						</div>
						<div v-else>
							<mdb-btn @click="RegistrasiEvent(details.kegiatan_id)" disabled color="info" size="md"> 
								<mdb-icon icon="check" /> {{status_pendaftaran}}
							</mdb-btn>
						</div>
					</mdb-col>

					<mdb-col v-else>
						<div v-if="loading">
							<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
							Loading...
						</div>
						<div v-else>
							<mdb-btn v-if="data_event || token.accessToken" color="success" size="md" disabled>
								<mdb-icon far icon="calendar-check" /> {{status_pendaftaran}}
							</mdb-btn>
						</div>
						<mdb-btn v-else size="md" color="grey" disabled class="mb-3 not__allowed">Daftar</mdb-btn>
					</mdb-col>
				</mdb-row>

			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['loading', 'details', 'data_event', 'status_pendaftaran', 'token'],

		mounted(){
			this.VenoBox()
		},

		methods: {
			RegistrasiEvent(id){
				// alert(id)
				this.$emit('registrasi-event', id)
			},

			VenoBox(){
				new VenoBox({
					selector: '.event-lists',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			}
		}
	}
</script>