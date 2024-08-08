<template>
  <div class="space-y-15">
    <AuthLoginPageSocialButtonsItem
      class="bg-[#3C5A99]"
      :href="socialUrls.facebook"
    >
      <SvgFacebook />
      <span>xx xx Facebook</span>
    </AuthLoginPageSocialButtonsItem>

    <AuthLoginPageSocialButtonsItem
      class="bg-[#FF2D55]"
      :href="socialUrls.google"
    >
      <SvgGoogle />
      <span>xx xx Google</span>
    </AuthLoginPageSocialButtonsItem>

    <AuthLoginPageSocialButtonsItem
      class="border border-white"
      :href="socialUrls.apple"
    >
      <SvgApple />
      <span>xx xx Apple</span>
    </AuthLoginPageSocialButtonsItem>
  </div>
</template>

<script setup lang="ts">
import { AuthService } from '@/api/modules/auth'
import AuthLoginPageSocialButtonsItem from '@/pages/AuthLoginPageSocialButtonsItem.vue'

const socialUrls = AuthService.getSocialSignInLinks()
</script>
