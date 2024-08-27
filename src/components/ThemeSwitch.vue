<script setup lang="ts">
  import { ref, onMounted } from "vue";

  const isPressed = ref(true);
  const themeValue = ref("dark");

  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  );

  onMounted(() => {
    let currentThemeSetting = getThemeString(
      localStorageTheme,
      systemSettingLight
    );
    updatePageTheme(currentThemeSetting);
  })

  const toggleIsPressed = () => {
    isPressed.value = !isPressed.value;
    const newTheme = themeValue.value === "dark"
      ? "light"
      : "dark";
    localStorage.setItem("theme", newTheme);
    updatePageTheme(newTheme);
  };

  function getThemeString(
    localValue: string | null,
    systemValue: MediaQueryList
  ): string {
    if (localValue !== null) return localValue;
    if (systemValue.matches) return "light";
    return "dark";
  }

  function updatePageTheme(theme: string) {
    themeValue.value = theme;
    document.querySelector("html").setAttribute("data-theme", theme);
  }
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    role="switch"
    aria-label="prefer dark theme"
    data-theme-toggle
    :aria-checked="String(isPressed)"
    @click="toggleIsPressed"
  >
    <svg
      v-show="!isPressed"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="sun"
    >
      <path
        d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
      />
    </svg>
    <svg
      v-show="isPressed"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="moon"
    >
      <path
        fill-rule="evenodd"
        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>

<style scoped>
  .theme-toggle {
    border: 1px solid var(--accentGray);
    background: var(--background);
    display: grid;
    place-items: center;
    border-radius: 50%;
    width: 2.25rem;
    height: 2.25rem;
    margin: 0 auto;
    cursor: pointer;
    transition: border 0.15s ease-in-out;
  }

  .theme-toggle:hover {
    border-color: var(--accentTan);
  }

  .theme-toggle svg {
    width: calc(100% - 0.125rem);
    height: calc(100% - 0.125rem);
    color: var(--text);
    transition: color 0.15s ease-in-out;
  }

  .theme-toggle svg:hover {
    color: var(--accentTan);
  }
</style>
