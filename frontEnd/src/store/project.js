import { defineStore } from 'pinia'
import { getProjects, getProjectById, getProjectsByCategory } from '../api/project'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [],
    currentProject: null,
    categories: [
      { id: 1, name: '热气球观光' },
      { id: 2, name: '直升机游览' },
      { id: 3, name: '无人机体验' },
      { id: 4, name: '滑翔伞' },
      { id: 5, name: '动力伞' }
    ],
    loading: false,
    error: null
  }),
  
  getters: {
    getProjectsInCategory: (state) => (categoryId) => {
      return state.projects.filter(project => project.categoryId === categoryId)
    },
    
    getPopularProjects: (state) => {
      return state.projects.filter(project => project.isPopular)
    }
  },
  
  actions: {
    // 获取所有项目
    async fetchProjects() {
      this.loading = true
      this.error = null
      try {
        const { data } = await getProjects()
        this.projects = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 根据ID获取项目详情
    async fetchProjectById(id) {
      this.loading = true
      this.error = null
      try {
        const { data } = await getProjectById(id)
        this.currentProject = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 根据分类获取项目
    async fetchProjectsByCategory(categoryId) {
      this.loading = true
      this.error = null
      try {
        const { data } = await getProjectsByCategory(categoryId)
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // 重置当前项目
    resetCurrentProject() {
      this.currentProject = null
    }
  }
}) 