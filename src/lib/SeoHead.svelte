<script lang="ts">
  type Props = {
    title: string;
    description: string;
    canonical: string;
    siteName?: string;
    type?: string;
  };

  let {
    title,
    description,
    canonical,
    siteName = 'FlowersFor',
    type = 'website'
  }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={siteName} />
</svelte:head>
