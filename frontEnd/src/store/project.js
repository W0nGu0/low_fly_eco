import { defineStore } from 'pinia'
import { getProjects, getProjectById, getProjectsByCategory } from '../api/project'

// 简单的图片路径处理函数
function processImagePath(path) {
  if (!path) return '';
  
  // 处理以@开头的路径
  if (path.startsWith('@/assets/')) {
    return path.replace('@/assets/', '/src/assets/');
  }
  
  return path;
}

// 处理对象中的图片路径
function processObjectImages(obj, imageKeys) {
  if (!obj || typeof obj !== 'object') return obj;
  
  const result = { ...obj };
  
  for (const key of imageKeys) {
    if (result[key]) {
      result[key] = processImagePath(result[key]);
    }
  }
  
  return result;
}

// 处理数组中所有对象的图片路径
function processArrayImages(array, imageKeys) {
  if (!Array.isArray(array)) return array;
  
  return array.map(item => processObjectImages(item, imageKeys));
}

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
    getProjectById: (state) => (id) => {
      const project = state.projects.find(project => project.id === Number(id))
      return project ? processObjectImages(project, ['coverImage']) : null
    },
    
    getPopularProjects: (state) => {
      const popularProjects = state.projects.filter(project => project.isPopular)
      return processArrayImages(popularProjects, ['coverImage'])
    },
    
    getProjectsByCategory: (state) => (categoryId) => {
      const filteredProjects = state.projects.filter(project => project.categoryId === Number(categoryId))
      return processArrayImages(filteredProjects, ['coverImage'])
    }
  },
  
  actions: {
    // 获取所有项目
    async fetchProjects() {
      this.loading = true
      this.error = null
      try {
        const data = await getProjects()
        this.projects = processArrayImages(data, ['coverImage'])
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
        const data = await getProjectById(id)
        this.currentProject = processObjectImages(data, ['coverImage'])
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
        const data = await getProjectsByCategory(categoryId)
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
    },
    
    clearCurrentProject() {
      this.currentProject = null
    }
  }
}) 