<template>
  <div>
    <v-snackbar
      v-for="(notification, i) in notifications"
      :key="i"
      v-model="notification.show"
      top
      :color="notification.color"
      :style="{'margin-top':calcMargin(i)}"
      :timeout="-1"
    >
      {{ notification.text }}
      <template #action>
        <v-btn icon text right @click="close(notification)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      notifications: []
    }
  },
  computed: {
    ...mapGetters({
      stateNotifications: 'notification/list'
    })
  },
  watch: {
    stateNotifications (notifications) {
      this.notifications = notifications
      console.log(notifications)
    }
  },
  methods: {
    calcMargin(i) {
      return (i*60) + 'px'
    },
    close (notification)   {
      this.$store.dispatch('notification/remove', notification)
    }
  }
}
</script>