<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addPosInput"
        placeholder="添加职位..."
        suffix-icon="el-icon-plus"
        @keydown.enter.native="addPosition()"
        v-model="pos.name">
      </el-input>
      <el-button size="small" icon="el-icon-plus" type="primary" @click="addPosition()">添加</el-button>
    </div>
    <div class="posManaMain">
      <el-table :data="positions" size="small" border stripe style="width: 70%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="职位" width="180">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
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
      positions: []
    }
  },
  mounted() {
    this.initPositions()
  },
  methods: {
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
    handleEdit(index, row) {
        console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
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
</style>
