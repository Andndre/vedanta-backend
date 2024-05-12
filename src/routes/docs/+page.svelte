<svelte:head>
	<title>Docs</title>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@latest/swagger-ui.css"
	/>
	<script src="https://unpkg.com/swagger-ui-dist@latest/swagger-ui-bundle.js" defer></script>
	<script defer>
		async function loadSwagger() {
			const response = await fetch(`/api-json`);
			const spec = await response.json();
			await new Promise((resolve) => setTimeout(resolve, 3000));
			console.log(spec);
			var swaggerUIOptions = {
				url: 'https://petstore.swagger.io/v2/swagger.json',
				dom_id: '#ui-wrapper-new', // Determine what element to load swagger ui
				docExpansion: 'list',
				deepLinking: true, // Enables dynamic deep linking for tags and operations
				filter: true,
				spec: spec,
				presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
				plugins: [SwaggerUIBundle.plugins.DownloadUrl]
			};

			var ui = SwaggerUIBundle(swaggerUIOptions);

			/** Export to window for use in custom js */
			window.ui = ui;
		}

		loadSwagger();
	</script>
</svelte:head>

<div id="ui-wrapper-new">Loading....</div>
