<template>
  <q-btn flat color="amber" icon="face" title="참여자">
    <q-popup-proxy>
      <q-list>
        <q-item v-for="participant in room!.participants" :key="participant.id">
          <q-item-section avatar>
            <avatar :user="participant" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ participant.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Avatar } from "@/shared/components";
import useChatStore from "../store/useChatStore";

const { room } = storeToRefs(useChatStore());
</script>
