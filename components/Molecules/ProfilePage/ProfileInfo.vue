<template>
	<div class="profile__info">
		<div v-if="loading">
			<b-skeleton animation="wave" width="85%"></b-skeleton>
			<b-skeleton animation="wave" width="55%"></b-skeleton>
			<b-skeleton animation="wave" width="70%"></b-skeleton>
		</div>
		<!-- <pre>
			{{works}}
		</pre> -->

		<ul v-else class="mt-3">
			<li v-if="profiles.phone == null || profiles.no_anggota == null" class="mb-3 mt-2">
				<mdb-alert color="warning" v-if="p1" @closeAlert="p1=false" dismiss>
					<strong>Halo {{profiles.nama}}</strong> profile anda belum lengkap silahkan edit profile.
				</mdb-alert>
			</li>
			<li class="mb-3">
				<strong class="text-primary text-uppercase">Nira</strong> <br>
				<p>
					{{profiles.no_anggota}}
				</p>
			</li>
			<li>
				<strong class="text-primary">Pekerjaan</strong> <br>
				<h6>
					{{works.jabatan}}
				</h6>
				<p class="info__context">
					{{works.nama_perusahaan}} <br>
					{{works.alamat_perusahaan}}
				</p>
			</li>
			<li>
				<strong class="text-primary">Pendidikan</strong> <br>
				<h6>
					{{studs.nama_institusi}}
				</h6> 
				<p class="info__context">
					{{studs.jenjang_value}} - {{studs.jurusan}} <br>
					{{$moment(studs.mulai_pend).format("Y")}} - {{$moment(studs.akhir_pend).format("Y")}}
				</p>
			</li>
			<li>
				<strong class="text-primary">Domisili</strong> <br>
				<p>
					{{profiles.kabupaten_name}}, {{profiles.propinsi_name}}
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		props: ['loading', 'works', 'studs', 'profiles'],

		data(){
			return {
				p1: true
			}
		}
	}
</script>