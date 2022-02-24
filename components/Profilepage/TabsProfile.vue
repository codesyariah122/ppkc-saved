<template>
	<div>
		<b-card v-if="loading">
			<b-skeleton animation="throb" width="85%"></b-skeleton>
			<b-skeleton animation="throb" width="55%"></b-skeleton>
			<b-skeleton animation="throb" width="70%"></b-skeleton>
		</b-card>

		<b-tabs v-else content-class="mt-4" fill>
			<b-tab title="Akun" active class="font-weight-bold">
				<mdb-card class="content__tabs">
					<ProfileInfo :loading="loading" :profiles="profiles" :studs="studs" :works="works"/>
				</mdb-card>
			</b-tab>
			<b-tab title="Event yang diikuti" class="font-weight-bold">
				<MoleculesProfilePageEventDiikuti :FilterEventChild="FilterEventChild" :loading="loading" :categories="categories" :pelatihans="pelatihans" :profiles="profiles"/>
			</b-tab>

			<b-tab title="Sertifikat" class="font-weight-bold">
				<MoleculesProfilePageEventSertifikat :FilterEventChild="FilterEventChild" :categories="categories" :loading="loading"/>
			</b-tab>
		</b-tabs>
	</div>
</template>

<script>
	import ProfileInfo from '@/components/Molecules/ProfilePage/ProfileInfo'

	export default{
		props: ['profiles', 'studs', 'works', 'pelatihans', 'categories', 'loading', 'field'],
		
		components: {
			ProfileInfo
		},

		mounted(){
			console.log(this.categories ? true : false)
		},

		methods: {
			FilterEventChild(){
				this.$emit('filter-event-child')
			},

			ChangeCategoryChild(e){
				this.$emit('change-category-child', e)
			},

			ChangeMonthChild(e){
				this.$emit('change-month-child', e)
			}
		}
	}
</script>