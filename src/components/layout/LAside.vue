<script>
import store from '@/store'
import { computed, defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'LAside',
  setup () {
    const menus = computed(() => store.state.sys.menus)
    const isCollapse = computed(() => store.getters.isCollapse)
    const direction = computed(() => (isCollapse.value ? 'right' : 'left'))
    const handleCollapse = () => store.commit('changeFlag')

    return {
      menus,
      isCollapse,
      direction,
      handleCollapse
    }
  }
})
</script>
<template>
  <div class="l-aside" :class="{ close: isCollapse }">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :router="true"
    >
      <template v-for="item in menus">
        <!-- 二级菜单 -->
        <template v-if="item.children && item.children.length">
          <el-submenu :key="item.path" :index="item.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{ item.title }}</span>
            </template>

            <!-- 子菜单 -->
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="child.path"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ child.title }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else>
          <el-menu-item :key="item.path" :index="item.path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <div class="action">
      <i :class="['el-icon-d-arrow-' + direction]" @click="handleCollapse"></i>
    </div>
  </div>
</template>
