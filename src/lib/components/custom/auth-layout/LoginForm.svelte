<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "./loginSchema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
 
  export let data: SuperValidated<Infer<FormSchema>>;
 
  const form = superForm(data, {
    validators: zodClient(formSchema),
  });
 
  const { form: formData, enhance } = form;
</script>

<form method="POST" class="space-y-6" use:enhance>
  <Form.Field {form} name="username">
    <Form.Control let:attrs>
      <Form.Label>Username</Form.Label>
      <Input {...attrs} bind:value={$formData.username} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>Password</Form.Label>
      <Input {...attrs} bind:value={$formData.password} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button class="w-full">Sign In</Form.Button>
</form>

<p class="mt-10 text-center text-sm text-gray-500">
	Tersesat?
	<a href="/" class="font-semibold leading-6 text-primary">kembali ke beranda</a>
</p>
