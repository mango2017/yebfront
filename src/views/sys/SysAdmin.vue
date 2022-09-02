<template>
  <div>
    <div style="display:flex;justify-content:center;margin-bottom: 10px;">
      <el-input placeholder="通过用户名搜索用户" prefix-icon="el-icon-search" style="width:400px;margin-right: 10px;"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="admin">
      <el-card class="admin-card" v-for="(admin,index) in admins" :key="index">
        <div slot="header" class="clearfix">
          <span>{{admin.name}}</span>
          <el-button style="float: right; padding: 3px 0;color: red" type="text" icon="el-icon-delete"></el-button>
        </div>
        <div>
          <div class="img-container">
            <img :src="admin.userFace" :alt="admin.name" :title="admin.name" class="userface-img"/>
          </div>
          <div class="userinfo-container">
            <div>用户名：{{admin.name}}</div>
            <div>手机号码：{{admin.phone}}</div>
            <div>住宅电话：{{admin.telephone}}</div>
            <div>联系地址：{{admin.address}}</div>
            <div>用户状态：
              <el-switch
                v-model="admin.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="已启用"
                inactive-text="未启用">
              </el-switch>
            </div>
            <div>
              用户角色：
              <el-tag style="margin-right: 4px;" type="success" v-for="(role,indexj) in admin.roles" :key="indexj">{{role.nameZh}}</el-tag>
              <el-button type="text" icon="el-icon-more"></el-button>
            </div>
            <div>备注：{{admin.remark}}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SysAdmin',
  data() {
    return {
      admins: []
    }
  },
  mounted() {
    this.initAdmins()
  },
  methods: {
    initAdmins() {
      this.getRequest('/system/admin/').then(resp => {
        if (resp) {
          console.log(resp)
          this.admins = resp
        }
      })
    }
  }
}
</script>
<style>
  .admin{
    display: flex;
    justify-content: space-around;
  }
  .admin-card{
    width: 700px;
    margin-right: 20px;
  }
  .userface-img{
    width: 72px;
    height: 72px;
    border-radius: 72px;
  }
  .img-container{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .userinfo-container{
    font-size: 12px;
    color:rgb(243, 150, 28);
  }
</style>
