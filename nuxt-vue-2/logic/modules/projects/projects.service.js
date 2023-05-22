import { BaseService } from '~/logic/core/base.service'

class _ProjectsService extends BaseService {
  async getProjects({ page, q } = {}) {
    const response = await this.axios.get(this.getPath(), {
      params: {
        page: page || undefined,
        q: q || undefined
      }
    })
    return response?.data
  }

  async createProject({ name, userId }) {
    try {
      const { status, data } = await this.axios.post(this.getPath(), {
        name,
        user_id: userId
      })

      return {
        success: status === 201,
        data
      }
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors
      }
    }
  }

  async updateProject(projectId, { name, userId }) {
    try {
      const { status, data } = await this.axios.put(this.getPath(projectId), {
        name,
        user_id: userId
      })

      return {
        success: status === 204,
        data
      }
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors
      }
    }
  }

  async archiveProject(projectId) {
    const { status } = await this.axios.post(this.getPath(projectId, 'archive'))
    return { success: status === 204 }
  }

  async unarchiveProject(projectId) {
    const { status } = await this.axios.post(this.getPath(projectId, 'restore'))
    return { success: status === 204 }
  }

  async deleteProject(projectId) {
    const { status } = await this.axios.post(this.getPath(projectId, 'delete'))
    return { success: status === 204 }
  }

  async updateProjectName(projectId, newName) {
    const { status } = await this.axios.patch(this.getPath(projectId), {
      name: newName
    })
    return { success: status === 204 }
  }

  async getAllProjects() {
    const { data } = await this.axios.get(this.getPath('all'))
    return data
  }

  async updateMany(projects) {
    const { status } = await this.axios.put(
      this.getPath('update-many'),
      projects
    )
    return { success: status === 204 }
  }
}

export const ProjectsService = new _ProjectsService('api/v1/projects')
