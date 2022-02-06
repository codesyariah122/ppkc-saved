<!-- Component base on directory /components/ppkc -->
<template>
	<div>
		<ppkcSejarah :path="path" :lists="lists"/>
	</div>
</template>

<script>
	export default{
		name: 'ppkc-testimoni',
		layout: 'default',

		data(){
			return{
				path: this.$route.name
			}
		},

		async asyncData({$axios}){
			const lists = await $axios.$get('/web/sejarah')
			
			return {
				lists
			}
		}
		
	}
</script>