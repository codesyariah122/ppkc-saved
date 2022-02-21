<template>
	<div class="profile__info">

		<!-- <pre>
			{{works}}
		</pre> -->

		<ul class="mt-3">
			<li v-if="profiles.phone == null || profiles.no_anggota == null" class="mb-3 mt-2">
				<mdb-alert color="warning" v-if="p1" @closeAlert="p1=false" dismiss>
					<strong>Halo {{profiles.nama}}</strong> profile anda belum lengkap silahkan edit profile.
				</mdb-alert>
			</li>
			<li class="mb-3">
				<strong class="text-primary text-uppercase font-weight-bold">Nira</strong> <br>
				<p>
					{{profiles.no_anggota}}
				</p>
			</li>
			<li>
				<strong class="text-primary font-weight-bold">Pekerjaan</strong> <br>
				<h6 class="font-weight-bold text-capitalize">
					{{works.jabatan}}
				</h6>
					<p class="info__context">
						<small>
						{{works.nama_perusahaan}} <br>
						{{works.alamat_perusahaan}}
					</small>
				</p>
			</li>
			<li>
				<strong class="text-primary font-weight-bold">Pendidikan</strong> <br>
				<h6 class="font-weight-bold text-capitalize">
					{{studs.nama_institusi}}
				</h6> 
				<p class="info__context">
					<small>
						{{studs.jenjang_value}} - {{studs.jurusan}} <br>
						{{$moment(studs.mulai_pend).format("Y")}} - {{$moment(studs.akhir_pend).format("Y")}}
					</small>
				</p>
			</li>
			<li>
				<strong class="text-primary font-weight-bold">Domisili</strong> <br>
				<p>
					{{profiles.kabupaten_name}}, {{profiles.propinsi_name}}
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		props: ['works', 'studs', 'profiles'],

		data(){
			return {
				p1: true
			}
		}
	}
</script>