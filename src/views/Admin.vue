<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between" align="middle">
        <span>SanMi</span>
        <el-dropdown>
          <span class="pointer">{{ $store.state.user.name }}</span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link
                :to="{ name: 'Logout', query: { nextUrl: $route.fullPath } }"
                tag="div"
                class="pointer"
                >退出</router-link
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router :default-active="$route.name">
          <el-menu-item index="Admin" :route="{ name: 'Admin' }">
            <i class="el-icon-s-home"></i>
            <span slot="title">控制台</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>账户管理</span>
            </template>
            <el-menu-item index="Admin.Role" :route="{ name: 'Admin.Role' }">
              <span slot="title">角色</span>
            </el-menu-item>
            <el-menu-item index="Admin.User" :route="{ name: 'Admin.User' }">
              <span slot="title">用户</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <router-view />
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data: function () {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  background: rgb(84, 92, 100);
  .el-row {
    height: 100%;

    span:first-child {
      cursor: pointer;
      color: #fff;
      font-weight: 800;
      &:hover {
        opacity: 0.8;
      }
    }

    .el-dropdown {
      color: #fff;
    }
  }
}

.el-aside {
  height: calc(100vh - 60px);
  .el-menu {
    height: 100%;
  }
}
</style>
