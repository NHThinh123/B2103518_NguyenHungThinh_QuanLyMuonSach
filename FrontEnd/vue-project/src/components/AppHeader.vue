<script>
export default {
  props: {
    user: { type: Object, required: true },
  },
};
</script>
<template>
  <div class="container-fluid navbar navbar-dark background-img header">
    <div>
      <nav class="navbar navbar-expand-sm">
        <div class="header-left">
          <p class="navbar-custom-brand" style="text-decoration: none" href="/">
            Quản Lý Mượn Sách
          </p>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto test">
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'contactbook',
                    params: {
                      id: user._id,
                    },
                  }"
                  class="nav-link"
                >
                  <p class="nav-custom-item">Kho Sách</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'contactNXB',
                    params: {
                      id: user._id,
                    },
                  }"
                  class="nav-link"
                >
                  <p class="nav-custom-item">Nhà Xuất Bản</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="header-right">
      <router-link :to="{ name: 'login' }">
        <p class="nav-custom-item sign-out">Đăng Xuất</p>
      </router-link>
    </div>
  </div>
</template>
