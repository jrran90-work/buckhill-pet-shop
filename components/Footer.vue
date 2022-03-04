<template>
  <v-footer class="py-12" color="secondary">
    <v-container>
      <v-row>
        <v-col md="2">
          <div class="logo primary--text text-center">
            <v-icon color="primary" size="68">mdi-paw</v-icon>
            <div>
              petson.
            </div>
          </div>
        </v-col>
        <v-col md="1">
          <div class="column--heading font-weight-medium">Petson</div>
          <v-list color="transparent">
            <v-list-item class="px-0" to="/about">
              <v-list-item-title class="text--secondary">About us</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0" to="/about">
              <v-list-item-title class="text--secondary">Blog</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0" to="/about">
              <v-list-item-title class="text--secondary">Store Locator</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col md="2">
          <div class="column--heading font-weight-medium">Contact</div>
          <v-list color="transparent">
            <v-list-item class="px-0">
              <v-list-item-title class="text--secondary">contact@petson.com</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0">
              <v-list-item-title class="text--secondary">+358 000 000</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0">
              <v-list-item-title class="text--secondary">35 Shnauzer avenue, Dogville AL</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col md="2">
          <div class="column--heading font-weight-medium">Information</div>
          <v-list color="transparent">
            <v-list-item class="px-0" to="/about">
              <v-list-item-title class="text--secondary">Ordering and shipping</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0" to="/about">
              <v-list-item-title class="text--secondary">FAQ</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0" to="/about">
              <v-list-item-title class="text--secondary">GDPR statement</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="3">
          <div class="column--heading font-weight-medium invisible">Information</div>
          <v-list color="transparent">
            <v-list-item class="px-0">
              <v-list-item-content class="d-block text--secondary">
                If you can’t find answer to your question, please contact our <a href="/">customer service</a>.
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>