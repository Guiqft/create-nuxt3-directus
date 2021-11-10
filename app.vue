<template>
    <Suspense>
        <template #default>
            <NuxtPage />
        </template>
        <template #fallback>
            <ProgressSpinner />
        </template>
    </Suspense>
</template>

<style>
body {
    margin: 0;
}

@keyframes p-progress-spinner-color {
    100%,
    0% {
        stroke: var(--blue-100);
    }
    40% {
        stroke: var(--blue-100);
    }
    66% {
        stroke: var(--blue-100);
    }
    80%,
    90% {
        stroke: var(--blue-100);
    }
}
</style>
