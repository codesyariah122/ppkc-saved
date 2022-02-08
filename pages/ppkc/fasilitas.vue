<!-- Component base on directory /components/ppkc -->
<template>
	<div>
		<ppkcFasilitas :path="path" :lists="lists" :kamar="kamar" :dapur="dapur" :lab="laboratorium" :perpus="perpustakaan" :kelas="kelas" :tempat_makan="tempat_makan"/>
	</div>
</template>

<script>
	export default{
		name: 'ppkc-visi_misi',
		layout: 'default',

		data(){
			return{
				path: this.$route.name
			}
		},

		async asyncData({$axios}){
			const lists = await $axios.$get('/web/fasilitas')
			const dapur = lists.list_data.filter(d => d.nama == 'Dapur')
			const kamar = lists.list_data.filter(d => d.nama == 'Kamar')
			const laboratorium = lists.list_data.filter(d => d.nama == 'Laboratorium')
			const perpustakaan = lists.list_data.filter(d => d.nama == 'Perpustakaan')
			const kelas = lists.list_data.filter(d => d.nama == 'Ruang Kelas')
			const tempat_makan = lists.list_data.filter(d => d.nama == 'Tempat Makan 2')

			// console.log(laboratorium)

			return {
				lists,
				dapur,
				kamar,
				laboratorium,
				perpustakaan,
				kelas,
				tempat_makan
			}
		}
	}
</script>