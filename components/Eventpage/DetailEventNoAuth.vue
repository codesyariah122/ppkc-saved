<template>
	<div>
		<mdb-row>
			<mdb-col md="3" sm="12" xs="12" class="col-1">
				<img :src="events.kegiatan.photo" class="rounded">
			</mdb-col>

			<mdb-col md="9" sm="12" xs="12" col="12" class="col-2">
				<h1>
					{{events.kegiatan.kegiatan_title}}
				</h1>
				<h4 class="mt-3">
					{{events.kegiatan.harga ? $format(events.kegiatan.harga) : 'Rp. -'}}
				</h4>

				<mdb-row class="inside__first mt-3">
					<mdb-col md="4">
						<h5>Jenis kegiatan</h5>
						<p>
							{{events.kegiatan.kegiatan_value}}
						</p>
					</mdb-col>
					<mdb-col md="4">
						<h5>Nilai SKP</h5>
						<p>
							{{events.kegiatan.nomor_skp ? events.kegiatan.nomor_skp : '-'}}
						</p>
					</mdb-col>
					<mdb-col md="12">
						<h5>Deskripsi</h5>
						<p>
							{{events.kegiatan.kegiatan_desc}}
						</p>
					</mdb-col>
					<mdb-col md="12">
						<h5>Waktu</h5>
						<p>
							{{$moment(events.kegiatan.tanggal_awal).format("LL")}} - {{$moment(events.kegiatan.tanggal_akhir).format("LL")}}
						</p>
					</mdb-col>
				</mdb-row>

				<mdb-row class="inside__second mt-3">
					<mdb-col>
						<mdb-btn size="md" gradient="peach" disabled class="mb-3 not__allowed">
							<mdb-icon far icon="calendar-plus" size="lg"/> Daftar
						</mdb-btn>
					</mdb-col>
				</mdb-row>

			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['events']
	}
</script>