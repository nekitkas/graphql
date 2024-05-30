<script>
	export let data;

	const { user } = data.data;

	const { attrs, login, campus } = user[0];

	let attrsArray = Object.entries(attrs);
</script>

<div class="text-white p-4">
	<div class="mb-4">
		<p class="text-lg font-semibold">{login}</p>
		<p class="text-sm text-slate-400">{campus}</p>
	</div>

	<div>
		<table class="min-w-full bg-slate-800 rounded-lg overflow-hidden">
			<thead class="bg-slate-700 text-slate-300">
			<tr>
				<th class="px-4 py-2">Attribute</th>
				<th class="px-4 py-2">Value</th>
			</tr>
			</thead>
			<tbody>
			{#each attrsArray as [k, v]}
				<tr class="border-b border-slate-700 last:border-none">
					<td class="px-4 py-2 text-slate-500 text-center">{k}</td>
					<td class="px-4 py-2">{v}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
    /* Custom styles can be added here if needed */
</style>
