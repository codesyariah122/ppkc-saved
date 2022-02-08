<template>
	<div class="card__list" :style="berita__list_style">
		<mdb-container>

			<!-- header -->
			<mdb-row class="row justify-content-center header__ppkc-list-page">
				<mdb-col lg="12" xs="12" sm="12">
					<h4>Fasilitas</h4>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2 mt-2">
					<h5>Kelas</h5>
					<MoleculesFasilitasMoleculesKelas :kelas="kelas[0]"/>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2 mt-2">
					<h5>Perpustakaan</h5>
					<MoleculesFasilitasMoleculesPerpus :perpus="perpus[0]"/>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2 mt-2">
					<h5>Laboratorium</h5>
					<MoleculesFasilitasMoleculesLab :lab="lab[0]"/>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2 mt-2">
					<h5>Kamar</h5>
					<MoleculesFasilitasMoleculesKamar :kamar="kamar[0]"/>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2 mt-2">
					<h5>Tempat Makan</h5>
					<MoleculesFasilitasMoleculesTempatMakan :tempat_makan="tempat_makan[0]"/>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2 mt-2">
					<h5>Dapur</h5>
					<MoleculesFasilitasMoleculesDapur :dapur="dapur[0]"/>
				</mdb-col>

			</mdb-row>

		</mdb-container>

	</div>
</template>

<script>
	export default{
		props: ['path', 'lists', 'kamar' , 'dapur', 'lab', 'perpus', 'kelas', 'tempat_makan'],
		data(){
			return {
				berita__list_style: this.$device.isDesktop ? 'margin-top: 8rem;' : 'margin-top: 6rem;'
			}
		}
	}
</script>