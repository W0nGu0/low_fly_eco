import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem('theme') || 'default'
  }),
  
  actions: {
    setTheme(theme) {
      this.theme = theme
      localStorage.setItem('theme', theme)
    }
  }
})
