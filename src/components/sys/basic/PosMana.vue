<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addPosInput"
        placeholder="添加职位..."
        suffix-icon="el-icon-plus"
        @keydown.enter.native="addPosition"
        v-model="pos.name">
      </el-input>
      <el-button size="small" icon="el-icon-plus" type="primary" @click="addPosition">添加</el-button>
    </div>
    <div class="posManaMain">
      <el-table :data="positions" size="small" border stripe style="width: 70%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="职位" width="180">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间"> </el-table-column>
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
        <el-tag>职位名称</el-tag>
        <el-input v-model="updatePos.name" class="updatePosInput" size="small"></el-input>
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
  name: 'PosMana',
  data() {
    return {
      pos: {
        name: ''
      },
      positions: [],
      dialogVisible: false,
      updatePos: {
        name: ''
      },
      multipleSelection: []
    }
  },
  mounted() {
    this.initPositions()
  },
  methods: {
    deleteMany() {
      this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条职位,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = '?'
          this.multipleSelection.forEach(item => {
            ids += 'ids=' + item.id + '&'
          })
          this.deleteRequest('/system/cfg/pos/' + ids).then(resp => {
            if (resp) {
              this.initPositions()
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
        this.putRequest('/system/cfg/pos/', this.updatePos).then(resp => {
          if (resp) {
            this.initPositions()
            this.dialogVisible = false
          }
        })
    },
    addPosition() {
      if (this.pos.name) {
        this.postRequest('/system/cfg/pos/', this.pos).then((resp) => {
          if (resp) {
            this.initPositions()
          }
        })
      } else {
        this.$message.error('职位名称不能为空')
      }
    },
    initPositions() {
      this.getRequest('/system/cfg/pos/').then((resp) => {
        if (resp) {
          this.positions = resp
          this.pos.name = ''
        }
      })
    },
    showEditView(index, data) {
        Object.assign(this.updatePos, data)
        this.updatePos.createDate = ''
        this.dialogVisible = true
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.name + '],是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/cfg/pos/' + data.id).then(resp => {
            if (resp) {
              this.initPositions()
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
.addPosInput {
  width: 300px;
  margin-right: 8px;
}
.posManaMain {
  margin-top: 10px;
}
.updatePosInput{
  width: 200px;
  margin-left: 8px;
}
</style>
