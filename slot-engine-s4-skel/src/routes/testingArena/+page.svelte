<script lang="ts">
	import TablewithmultiSelect from '$lib/Components/table with multiSelect.svelte';
	import {
		slotsData_default_SlotInfos,
		slotsData_defaultColumns,
		slotsData_defaultColumns_types,
		slotsData_newRow,
		Instruments_list
	} from '$lib/Defaults/defaultValues';
	slotsData_default_SlotInfos;
</script>

<TablewithmultiSelect
	columns={slotsData_defaultColumns}
	columns_types={slotsData_defaultColumns_types}
	newColumnData={slotsData_newRow[0]}
	multiSelect_selectOptions={[null, null, null, null, null, Instruments_list, Instruments_list]}
	data={slotsData_default_SlotInfos}
	editable={true}
></TablewithmultiSelect>
