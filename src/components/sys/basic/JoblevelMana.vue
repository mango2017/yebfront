<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addJoblevelInput"
        placeholder="添加职称名称..."
        suffix-icon="el-icon-plus"
        @keydown.enter.native="addJoblevel"
        v-model="joblevel.name" style="margin-right:10px">
      </el-input>
      <el-select size="small" v-model="joblevel.titleLevel" placeholder="请选择职称等级">
        <el-option
          v-for="item in titleLevel"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button size="small" icon="el-icon-plus" type="primary" @click="addJoblevel">添加</el-button>
    </div>
    <div class="joblevelManaMain">
      <el-table :data="joblevels" size="small" border stripe style="width: 70%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="职称名称" width="180">
        </el-table-column>
        <el-table-column prop="titleLevel" label="职称等级" width="180">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间"> </el-table-column>
        <el-table-column prop="enabled" label="是否启用">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
            <el-tag v-else type="danger">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditView(scope.$index, scope.row)"
              >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button size="small" style="margin-top:8px" type="danger" :disabled="this.multipleSelection.length==0" @click="deleteMany">批量删除</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <table>
          <tr>
            <td>
              <el-tag>职称名称</el-tag>
            </td>
            <td>
              <el-input v-model="updateJoblevel.name" size="small"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <el-tag>职位等级</el-tag>
            </td>
            <td>
              <el-select size="small" v-model="updateJoblevel.titleLevel" placeholder="请选择职称等级">
              <el-option
                v-for="item in titleLevel"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              <el-tag>是否启用</el-tag>
            </td>
            <td>
              <el-switch
                v-model="updateJoblevel.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="已启用"
                inactive-text="未启用">
              </el-switch>
            </td>
          </tr>
        </table>
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
  name: 'JobleveMana',
  data() {
    return {
      joblevel: {
        name: '',
        titleLevel: ''
      },
      dialogVisible: false,
      updateJoblevel: {
        name: '',
        titleLevel: '',
        enabled: false
      },
      joblevels: [],
      multipleSelection: [],
      // 正高级','副高级','中级','初级','员级
      titleLevel: [
        '副高级',
        '中级',
        '初级',
        '员级'
      ]
    }
  },
  mounted() {
    this.initJoblevels()
  },
  methods: {
    initJoblevels() {
      this.getRequest('/system/basic/joblevel/').then((resp) => {
        if (resp) {
          this.joblevels = resp
          this.joblevel.name = ''
          this.joblevel.titleLevel = ''
        }
      })
    },
    addJoblevel() {
      if (this.joblevel.name && this.joblevel.titleLevel) {
        this.postRequest('/system/basic/joblevel/', this.joblevel).then((resp) => {
          if (resp) {
            this.initJoblevels()
          }
        })
      } else {
        this.$message.error('字段不能为空')
      }
    },
    showEditView(index, data) {
        console.log(data)
        Object.assign(this.updateJoblevel, data)
        this.updateJoblevel.createDate = ''
        this.dialogVisible = true
    },
    doUpdate() {
        this.putRequest('/system/basic/joblevel/', this.updateJoblevel).then(resp => {
          if (resp) {
            this.initJoblevels()
            this.dialogVisible = false
          }
        })
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.name + ']职称,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/basic/joblevel/' + data.id).then(resp => {
            if (resp) {
              this.initJoblevels()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteMany() {
      this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条职称,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = '?'
          this.multipleSelection.forEach(item => {
            ids += 'ids=' + item.id + '&'
          })
          this.deleteRequest('/system/basic/joblevel/' + ids).then(resp => {
            if (resp) {
              this.initJoblevels()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSelectionChange(val) {
        this.multipleSelection = val
    }
  }
}
</script>
<style>
  .addJoblevelInput{
    width: 300px;
  }
  .joblevelManaMain{
    margin-top: 10px;
  }
</style>
