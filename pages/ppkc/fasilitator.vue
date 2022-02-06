<template>
	<div>
		<mdb-container>
			<h1 style="margin-top:10rem;">Fasilitator</h1>

			<!-- testing example component -->
			<ppkcTestComponent :test="test"/>
		</mdb-container>
	</div>
</template>

<script>
	export default{
		name: 'ppkc-fasilitator',
		layout: 'default',
		data(){
			return {
				test: `Test Component ${this.$route.path}`
			}
		}
	}
</script>