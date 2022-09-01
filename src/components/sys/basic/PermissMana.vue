<template>
  <div>
    <div class="permissManaTool">
      <el-input placeholder="请输入角色英文名" v-model="role.name" size="small">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input placeholder="请输入角色中文名" v-model="role.nameZh" size="small"></el-input>
      <el-button type="primary" size="small" icon="el">添加</el-button>
    </div>
    <div class="permissManaMain">
      <el-collapse accordion @change="change" v-model="activeNames">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <el-button style="float: right; padding: 3px 0; color: red;" type="text" icon="el-icon-delete"></el-button>
            </div>
            <div>
              <el-tree :data="allMenus" :props="defaultProps" show-checkbox :default-checked-keys="selectedMenus" node-key="id" ref="tree"></el-tree>
              <div style="display:flex;justify-content:flex-end">
                <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                <el-button size="mini" type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PermissMana',
  data() {
    return {
      role: {
        name: '',
        nameZh: ''
      },
      roles: [],
      allMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectedMenus: [],
      activeNames: -1
    }
  },
  mounted() {
    this.initRoles()
  },
  methods: {
    initRoles() {
      this.getRequest('/system/basic/permiss/').then(resp => {
        if (resp) {
          this.roles = resp
        }
      })
    },
    initAllMenus() {
      this.getRequest('/system/basic/permiss/menus/').then(resp => {
        if (resp) {
          this.allMenus = resp
        }
      })
    },
    change(rid) {
      if (rid) {
        this.initAllMenus()
        this.initSelectedMenus(rid)
      }
    },
    initSelectedMenus(rid) {
      console.log('rid=' + rid)
      this.getRequest('/system/basic/permiss/mid/' + rid).then(resp => {
        if (resp) {
          this.selectedMenus = resp
        }
      })
    },
    doUpdate(rid, index) {
      const tree = this.$refs.tree[index]
      const selectedKeys = tree.getCheckedKeys(true)
      console.log(selectedKeys)
      let url = '/system/basic/permiss/update/?rid=' + rid
      selectedKeys.forEach(key => {
        url += '&mids=' + key
      })
      this.putRequest(url).then(resp => {
        if (resp) {
          this.initRoles()
          this.activeNames = -1
        }
      })
    },
    cancelUpdate() {
      this.activeNames = -1
    }
  }
}
</script>
<style>
  .permissManaTool{
    display: flex;
    justify-content: flex-start;
  }
  .permissManaTool .el-input{
    width: 300px;
    margin-right: 6px;
  }
  .permissManaMain{
    margin-top: 10px;
    width: 700px;
  }
</style>
