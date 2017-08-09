<template>
	<div class="layout">
		<group>
		    <x-switch title="showGrid" v-model="showGrid"></x-switch>
		</group>
		<div v-if="showGrid">
			<grid :rows="5">
		      	<grid-item v-for="i in 5" :key="i" link="/Form">
			        <span class="grid-center">{{i}}</span>
			    </grid-item>
		    </grid>
		</div>
	</div>		
</template>

<script>
import { Group,XSwitch ,Grid,GridItem} from 'vux'

export default {
	name: 'LatOut',
	data () {
		return {
			showGrid:false,
		}
			
	},
	methods:{

	},

	mounted () {
	},
	watch:{
	},
	components: {
		Group,XSwitch ,Grid,GridItem
	}
}
</script>

