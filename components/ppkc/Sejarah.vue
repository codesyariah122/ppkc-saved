<template>
	<div class="card__list" :style="berita__list_style">
		<mdb-container>

			<!-- header -->
			<mdb-row class="row justify-content-center header__ppkc-list-page visi-misi__content">
				<mdb-col lg="12" xs="12" sm="12">
					<h4>Sejarah</h4>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-1">
					<img :src="lists.result.foto_url" class="img-fluid"/>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2">
					<p class="text-justify">
						{{part1.slice(0,-1)}}
					</p>
				</mdb-col>
				<mdb-col lg="12" xs="12" sm="12" class="ppkc__col-3">
					<ol>
						<li v-for="(n, index) in list_history"> 
							<span>
								{{n}}
							</span>
						</li>
					</ol>
				</mdb-col>
			</mdb-row>

		</mdb-container>

	</div>
</template>

<script>
	export default{
		props: ['path', 'lists', 'part1', 'list_history'],
		data(){
			return {
				berita__list_style: this.$device.isDesktop ? 'margin-top: 8rem;' : 'margin-top: 6rem;'
			}
		}
	}
</script>