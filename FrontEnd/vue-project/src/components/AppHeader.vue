<template>
  <div class="container-fluid navbar navbar-dark background-img header">
    <div>
      <nav class="navbar navbar-expand-sm">
        <div class="header-left">
          <a class="navbar-custom-brand" style="text-decoration: none" href="/"
            >Quản Lý Mượn Sách
          </a>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto test">
              <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                  <p class="nav-custom-item">Kho Sách</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'contactNXB' }" class="nav-link">
                  <p class="nav-custom-item">Nhà Xuất Bản</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="header-right">
      <button class="info-icon">Ảnh</button>
    </div>
  </div>
</template>
