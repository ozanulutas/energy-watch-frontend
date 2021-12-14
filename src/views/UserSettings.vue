<template>
  <div>
    <h1 class="mt-4"><i class="fas fa-industry"></i> {{ $tc("userSettings.pageTitle", 2) }}</h1>
    <hr class="my-4">

    <h2>Profile Settings</h2>

    <!-- Profile Settings -->
    <UserProfileSettingsForm />

    <hr>

    <h2>Password Settings</h2>
    <!-- Password Settings -->
    <UserProfilePasswordForm />
    
  </div>
</template>

<script>

import UserProfileSettingsForm from "@/components/UserProfileSettingsForm";
import UserProfilePasswordForm from "@/components/UserProfilePasswordForm";

export default {
  name: "UserSettings",
  components: {
    UserProfileSettingsForm,
    UserProfilePasswordForm
  },


};
</script>
