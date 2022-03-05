<template>
	<div>
		<mdb-datatable
		:data="data"
		striped
		bordered
		/>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				data: {
					columns: [
					{
						label: 'No',
						field: 'no',
						sort: 'asc'
					},
					{
						label: 'Kegiatan',
						field: 'kegiatan',
						sort: 'asc'
					},
					{
						label: 'Waktu Pelaksanaan',
						field: 'waktu_pelaksanaan',
						sort: 'asc'
					},
					{
						label: 'Sasaran',
						field: 'sasaran',
						sort: 'asc'
					},
					{
						label: 'Keterangan',
						field: 'keterangan',
						sort: 'asc'
					},
					],
					rows: [
					{
						no: '1',
						kegiatan: 'Sosialisasi penghitungan kebutuhan tenaga keperawatan (tandum dengan Bu Susan)',
						waktu_pelaksanaan: 'Maret 2022 <br/> Sesuai jadwal meeting HN',
						sasaran: 'Perawat Intensif',
						keterangan: 'Saat meeting HN'
					},
					{
						no: '2',
						kegiatan: 'Pengajuan kredensial dan re-kredensial perawat Intensif',
						waktu_pelaksanaan: 'Maret 2022 <br/> Minggu ke 3',
						sasaran: 'HDON, seluruh HN, CNE',
						keterangan: 'Koordinasi dengan CNE dan Sub Komite Kredensial'
					},
					{
						no: '3',
						kegiatan: 'Inventaris alat medis Intensif tiap 3 bulan sekali',
						waktu_pelaksanaan: 'April 2022 <br> Minggu ke 2',
						sasaran: 'Alat medis ICU, HCU, NICU',
						keterangan: 'Perbaiki buku peminjaman alat'
					},
					{
						no: '4',
						kegiatan: 'Supervisi penerima delegasi',
						waktu_pelaksanaan: 'Maret - Juni 2022',
						sasaran: 'Second layer, PIC Data Mutu, IPCLN, PIC NICU',
						keterangan: 'Siapkan form uraian point yang di supervisi agar fokus'
					}
					]	
				}
			}
		}
	}
</script>