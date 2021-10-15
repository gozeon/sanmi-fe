<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between" align="middle">
        <span>SanMi</span>
        <el-dropdown>
          <span class="pointer">{{ $store.state.user.name }}</span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="{ name: 'Admin' }" tag="div" class="pointer"
                >后台管理</router-link
              >
            </el-dropdown-item>
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
      <el-main>
        <pre>{{ user }}</pre>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
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
</style>
