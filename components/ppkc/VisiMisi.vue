<template>
	<div class="card__list" :style="berita__list_style">
		<mdb-container>

			<!-- header -->
			<mdb-row class="row justify-content-center header__ppkc-list-page">
				<mdb-col lg="12" xs="12" sm="12">
					<h4>Visi & Misi</h4>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-1">
					<center>						
						<mdb-card reverse class="card__berita-img">
							<mdb-view hover cascade>
								<a href="#!">
									<mdb-card-image :src="lists.result.foto_url" alt="Card image cap"></mdb-card-image>
									<mdb-mask waves overlay="white-slight"></mdb-mask>
								</a>
							</mdb-view>
						</mdb-card>
					</center>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2">
					<h5>Visi</h5>
					<p>
						{{visi}}
					</p>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-3">
					<h5>Misi</h5>
					<ol>
						<li v-for="n in misi.length" v-if="n % 2 == 1"> 
							{{misi[n]}}
						</li>
					</ol>
				</mdb-col>
			</mdb-row>

		</mdb-container>

	</div>
</template>

<script>
	export default{
		props: ['path', 'lists', 'visi', 'misi'],
		data(){
			return {
				berita__list_style: this.$device.isDesktop ? 'margin-top: 8rem;' : 'margin-top: 6rem;'
			}
		}
	}
</script>