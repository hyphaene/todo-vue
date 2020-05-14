<template>
	<div>
		coucou
		<select v-model="filterValue" @change="setFilter(e.target.value)">
			<option v-for="filter in filterValues" :value="filter" :key="filter">{{
				filter
			}}</option>
		</select>
	</div>
</template>

<script>
import { FILTER_VALUES } from "../../constants";
export default {
	name: "Filteroo",
	props: {
		filterValue: String,
		setFilter: Function
	},
	data: function() {
		return {
			filterValues: FILTER_VALUES
			// selection: this.filterValue
		};
	},
	// computed: {
	// 	superModel: function() {
	// 		return this.filterValue;
	// 	}
	// },
	methods: {
		onChange: function() {
			console.log({ inner: this.inner });
			console.log({ filterValue: this.filterValue });
			this.filterValue = this.inner;
			console.log({ inner: this.inner });
			console.log({ filterValue: this.filterValue });
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
