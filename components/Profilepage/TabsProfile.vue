<template>
	<div>
		<b-tabs content-class="mt-4" fill>
			<b-tab title="Akun" active class="font-weight-bold">
				<mdb-card class="content__tabs">
					<ProfileInfo :profiles="profiles" :studs="studs" :works="works"/>
				</mdb-card>
			</b-tab>
			<b-tab title="Event yang diikuti" class="font-weight-bold">
				<MoleculesProfilePageEventDiikuti :FilterEventChild="FilterEventChild" :loading="loading" :categories="categories" :pelatihans="pelatihans"/>
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