import { User } from '@/api/shared/types'
import { Service } from '@/core/Service'

class _UsersService extends Service {
  async getMe() {
    const { data } = await this.axios.get<User>(this.e('show_me'))
    return data
  }
}

export const UsersService = new _UsersService('api/v1/users')
