<template>
	<div class="sidebar-item">
		<div :class="`${scrolledToBottom ? 'fixed-sidebar': ''}`">
			<div v-for="(item, index) in pelatihans" :key="item.id">
				<b-button v-b-toggle="`collapse-${item.id}`" class="btn__pelatihan shadow-none" @click="ToggleFile">
					<mdb-row class="row justify-content-between">
						<mdb-col md="8">  
							{{item.title}}
						</mdb-col>
						<mdb-col md="1">
							<mdb-icon :icon="`${show_collapse == false ? 'plus-circle' : 'minus-circle'}`" size="lg"/>
						</mdb-col>
					</mdb-row>
				</b-button>

				<b-collapse :id="`collapse-${item.id}`" class="collapse__category-event mb-3 shadow-none">
					<b-card class="shadow-none">
						<div v-for="(c, index) in item.categories"  :key="c.id">
							<div v-for="(d, index) in c.details" :key="d.id">
								<b-list-group class="list__modul">
									<b-list-group-item id="navbar__event-detail">
										<mdb-icon :icon="FilterIcon(d.kategori)"/>&nbsp; <a class="font-weight-bold link__text" :href="`#item-${d.kategori}`" @click="ShowField(d, d.kategori == 3 || d.kategori == 4 || d.kategori == 6 ? d.id : d.kategori, d.kategori)">
											{{d.title}}
										</a>
									</b-list-group-item>
								</b-list-group>
							</div>
						</div>
					</b-card>
				</b-collapse>
			</div>
			<div class="col-lg-12 mt-3">
				<div class="row profile__collapse">
					<div class="col-md-3">
						<img v-if="profiles.photo !== 'https://api.ppkc-online.com/image-profiles/null'" :src="profiles.photo" class="img-fluid image rounded-circle"/>
						<img v-else src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="img-fluid image rounded-circle">
					</div>
					<div class="col-md-5">
						<b-button v-b-toggle="'collapse-2'" class="m-1 shadow-none"> 
							<div class="row justify-content-between">
								<div class="col-md-9">
									{{profiles.nama}} 
								</div>
								<div class="col-sm-1">
									<mdb-icon icon="angle-down" size="lg"/>
								</div>
							</div>
						</b-button>
						<b-collapse id="collapse-2" class="shadow-none">
							<b-card class="shadow-none">
								<ul>
									<li>
										<nuxt-link :to="`/profile/${username}`"><mdb-icon icon="user-md" size="md"/> Profile</nuxt-link>
									</li>
									<li>
										<a href="#!" @click="LogoutProfile"><mdb-icon icon="sign-out-alt" size="md"/> Logout</a>
									</li>
								</ul>
							</b-card>
						</b-collapse>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['pelatihans', 'profiles', 'username', 'loading', 'scrolledToBottom'],

		data(){
			return {
				show_collapse: false
			}
		},

		methods: {
			FilterIcon(type){
				switch(type){
					case 1:
					return 'video'
					break;
					case 2:
					return 'file-pdf'
					break;
					case 3:
					return 'file-alt'
					break;
					case 4:
					return 'file-archive'
					break;
					case 5:
					return 'file-pdf'
					break;
					case 6:
					return 'file-video'
					break;
					default:
					return 'No type here'
				}
			},

			ShowField(raw, id_kategori='', type){
				this.$emit('show-field', raw, id_kategori, type)
			},

			ToggleFile(){
				// this.show_collapse = !this.show_collapse
				this.$emit('toggle-file')
			},

			LogoutProfile(){
				// console.log(this.$route.path)
				this.$swal({
					title: `Keluar sebagai ${this.profiles.nama}?`,
					text: "Anda akan keluar dari halaman profile!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Ya, Lanjut keluar!'
				}).then((result) => {
					if (result.isConfirmed) {
						this.$store.dispatch('config/storeConfigAuth', '')
						this.$store.dispatch('config/setEventToLogin', '')
						this.$store.dispatch('config/setProfileLogout', JSON.stringify({logout: true, username: this.$username(this.profiles.nama)}))
						this.$swal(
							'Logout!',
							`Anda berhasil keluar dari profile ${this.profiles.nama}.`,
							'success'
							)
						this.$router.push({
							// name: 'auth-login'
							path: this.$route.path
						})
						setTimeout(() => {
							location.reload()
						}, 900)
					}
				})
			}
		}
	}
</script>