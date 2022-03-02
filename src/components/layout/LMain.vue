<script>
import store from '@/store'
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LMain',
  setup () {
    return {
      isCollapse: computed(() => store.getters.isCollapse)
    }
  }

})
</script>
<template>
  <div class="l-main" :class="{openFlag:isCollapse}">
    <slot></slot>
  </div>
</template>
