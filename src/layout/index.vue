<script>
import { defineComponent } from '@vue/composition-api'
import LAside from '_c/layout/LAside.vue'
import LHeader from '_c/layout/LHeader.vue'
import LMain from '_c/layout/LMain.vue'

export default defineComponent({
  components: { LHeader, LAside, LMain }
})
</script>

<template>
  <div class="app-main">
    <LHeader></LHeader>
    <LAside></LAside>
    <LMain>
      <router-view></router-view>
    </LMain>
  </div>
</template>
