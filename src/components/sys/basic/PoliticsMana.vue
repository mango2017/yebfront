<template>
  <div>
    <div>
      <el-input
        size="small"
        placeholder="添加政治面貌..."
        suffix-icon="el-icon-plus"
        @keydown.enter.native="addPolitics"
        v-model="politicsStatus.name"
        style="width:500px;margin-right:4px">
      </el-input>
      <el-button size="small" icon="el-icon-plus" type="primary" @click="addPolitics">添加政治面貌</el-button>
    </div>
    <div>
      <el-table
        :data="allPolitics.filter(data => !searchPolitics || data.name.toLowerCase().includes(searchPolitics.toLowerCase()))"
        style="width: 600px">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="政治面貌" width="180"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
        <template #header>
          <el-input
            v-model="searchPolitics"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="success" round @click="showPolitics(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" round @click="deletePolitics(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <el-tag>政治面貌</el-tag>
        <el-input v-model="updatePolitics.name" size="small"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'PoliticsMana',
  methods: {
    initPolitics() {
      this.getRequest('/politics-status/all/').then(resp => {
        if (resp) {
          this.allPolitics = resp
        }
      })
    },
    addPolitics() {
      this.postRequest('/politics-status/all/', this.politicsStatus).then(resp => {
        if (resp) {
          this.initPolitics()
        }
      })
    },
    showPolitics(index, row) {
      Object.assign(this.updatePolitics, row)
      this.dialogVisible = true
    },
    deletePolitics(index, row) {
      this.$confirm('此操作将永久删除[' + row.name + '],是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/politics-status/all/' + row.id).then(resp => {
            if (resp) {
              this.initPolitics()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    doUpdate() {
      this.putRequest('/politics-status/all/', this.updatePolitics).then(resp => {
        if (resp) {
          this.initPolitics()
          this.dialogVisible = false
        }
      })
    }
  },
  mounted() {
    this.initPolitics()
  },
  data() {
    return {
      allPolitics: [],
      searchPolitics: '',
      search: '',
      dialogVisible: false,
      politicsStatus: {
        name: ''
      },
      updatePolitics: {
        name: ''
      }
    }
  }
}
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
