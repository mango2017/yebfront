<template>
  <div style="width:500px">
    <el-input
        placeholder="输入部门名称进行搜索..."
        v-model="filterText" prefix-icon="el-icon-search">
    </el-input>
    <el-tree
      class="filter-tree"
      :data="deps"
      :props="defaultProps"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }" style="display:flex;justify-content:space-between;width: 100%;">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="primary"
            size="mini"
            class="depBtn"
            @click="() => showAddDep(data)">
            添加部门
          </el-button>
          <el-button
            type="danger"
            size="mini"
            class="depBtn"
            @click="() => deleteDep(node, data)">
            删除部门
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="添加部门"
      :visible.sync="dialogVisible"
      width="30%">
    <div>
      <table>
        <tr>
          <td>
            <el-tag>上级部门</el-tag>
          </td>
          <td>{{pname}}</td>
        </tr>
        <tr>
          <td>
            <el-tag>添加部门</el-tag>
          </td>
          <td>
            <el-input v-model="dep.name" placeholder="请输入部门名称..."></el-input>
          </td>
        </tr>
      </table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAddDep">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'DepMana',
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.initDeps()
  },
  methods: {
    initDep() {
      this.dep = {
        name: '',
        parentId: -1
      }
      this.pname = ''
    },
    addDep2Deps(deps, dep) {
      console.log(dep)
      for (let i = 0; i < deps.length; i++) {
        const d = deps[i]
        if (d.id === dep.parentId) {
          d.children = d.children.concat(dep)
        } else {
          this.addDep2Deps(d.children, dep)
        }
      }
    },
    doAddDep() {
      this.postRequest('/system/basic/department/', this.dep).then(resp => {
        if (resp) {
          this.addDep2Deps(this.deps, resp.object)
          this.dialogVisible = false
          this.initDep()
        }
      })
    },
    showAddDep(data) {
      this.pname = data.name
      this.dep.parentId = data.id
      console.log(data)
      this.dialogVisible = true
    },
    deleteDep(node, data) {
      console.log(node)
      console.log(data)
    },
    initDeps() {
      this.getRequest('/system/basic/department/').then(resp => {
        if (resp) {
          this.deps = resp
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    }
  },
  data() {
    return {
      filterText: '',
      deps: [],
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dep: {
        name: '',
        parentId: -1
      },
      pname: ''
    }
  }
}
</script>
<style>
  .depBtn {
    padding: 2px;
  }
</style>
