import { BaseService } from '../../shared/base.service'
import { SendEmailFeedbackParams } from './email-forms.types'

class MailFormsServiceClass extends BaseService {
  async sendEmailFeedback(params: SendEmailFeedbackParams) {
    return this.axios.post(this.getPath('send'), params)
  }
}

export const MailFormsService = new MailFormsServiceClass('api/v1/mail-forms')
