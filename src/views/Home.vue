<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <template v-for="(item, index) in routes">
              <el-submenu :index="index+''" :key="index" v-if="!item.hidden">
                <template slot="title">
                  <i :class="item.iconCls" style="color:bisque;margin-right:5px"></i>{{ item.name }}</template>
                <el-menu-item
                  :index="children.path"
                  v-for="(children, indexj) in item.children"
                  :key="indexj"
                  >{{ children.name}}</el-menu-item
                >
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from '@/store'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  computed: {
    routes () {
      return store.state.routes
    }
  }
}
</script>

<style scoped>
</style>
