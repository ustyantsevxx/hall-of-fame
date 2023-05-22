import { Context } from '@nuxt/types'

import { AnnouncementsModule } from '~/logic/modules/announcements'

// first place to execute app init code
// here you have access to $auth

export default async ({ app, $accessor }: Context) => {
  if (app.$auth.loggedIn) {
    await $accessor.fetchUserData()
    const activeAnnouncement =
      await AnnouncementsModule.getActiveAnnouncementText()
    $accessor.SET_ACTIVE_ANNOUNCEMENT(activeAnnouncement)
  }
}
