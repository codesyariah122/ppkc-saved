<template>
	<div class="profile__info">
		<ul class="mt-3">
			<li v-if="profiles.phone == null || profiles.no_anggota == null" class="mb-3 mt-2">
				<mdb-alert color="warning" v-if="p1" @closeAlert="p1=false" dismiss>
					<strong>Halo {{profiles.nama}}</strong> profile anda belum lengkap silahkan edit profile.
				</mdb-alert>
			</li>
			<li class="mb-3">
				<strong class="text-primary text-uppercase font-weight-bold">Nira</strong> <br>
				
				<mdb-badge color="success">{{profiles.no_anggota}}</mdb-badge>
			</li>
			<li>
				<strong class="text-primary text-uppercase font-weight-bold">Pekerjaan</strong> <br>
				<p>
					<strong class="font-weight-bold">
						{{works.bidang_pekerjaan}}
					</strong>
					<small>
						{{works.nama_perusahaan}} <br>
						{{works.alamat_perusahaan}}
					</small>
				</p>
			</li>
			<li>
				<strong class="text-primary text-uppercase font-weight-bold">Pendidikan</strong> <br>
				<p>
					<strong class="font-weight-bold">
						{{studs.nama_institusi}}
					</strong> <br>
					<small>
						{{studs.jenjang_value}} - {{studs.jurusan}} <br>
						{{$moment(studs.mulai_pend).format("Y")}} - {{$moment(studs.akhir_pend).format("Y")}}
					</small>
				</p>
			</li>
			<li>
				<strong class="text-primary text-uppercase font-weight-bold">Domisili</strong> <br>
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