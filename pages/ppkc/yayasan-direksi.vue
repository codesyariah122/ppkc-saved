<!-- Component base on directory /components/ppkc -->
<template>
	<div>
		<mdb-container>
			<h1 style="margin-top:10rem;">Yayasan & Direksi</h1>

			<!-- testing example component -->
			<ppkcTestComponent :test="test"/>
		</mdb-container>
	</div>
</template>

<script>
	export default{
		name: 'ppkc-yayasan_direksi',
		layout: 'default',

		data(){
			return {
				test: `Test Component ${this.$route.path}`
			}
		}
	}
</script>