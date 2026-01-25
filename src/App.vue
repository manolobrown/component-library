<script setup lang="ts">
import { ref } from 'vue'
import { Button } from './components'

const count = ref(0)
</script>

<template>
  <div class="min-h-screen bg-neutral-50 p-8">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-8 text-3xl font-bold text-neutral-900">Component Library</h1>
      <div class="flex gap-4">
        <Button @click="count++">Count: {{ count }}</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  </div>
</template>
