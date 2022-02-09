<template>
	<div class="event__detail mb-5">
		<mdb-container>
			<pre>
				{{$route.params.id}}
			</pre>
		</mdb-container>
	</div>
</template>

<script>
	import {FetchData} from '@/helpers'

	export default{
		name: 'detail-berita-slug',
		layout: 'default'
	}
</script>