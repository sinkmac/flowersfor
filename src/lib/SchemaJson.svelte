<script lang="ts">
  let { schema }: { schema: Record<string, unknown> | Record<string, unknown>[] } = $props();
  const schemaJson = $derived(JSON.stringify(schema).replace(/</g, '\u003c'));
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${schemaJson}</script>`}
</svelte:head>
