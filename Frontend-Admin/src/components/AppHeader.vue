<template>
    <nav class="navbar border-end border-dark" style="min-height: 100vh;">
        <div style="width: 100%;">
            <h1 class="fs-2 text-center ">Dashboard</h1>
        </div>
        <div class=" navbar-nav" style="width: 100%;">
            <li class="nav-item d-flex flex-column">
                <router-link :to="{ name: 'home' }" class="nav-link border text-center" >
                    Home
                    <i class="fas fa-book"></i>
                </router-link>
                <router-link :to="{ name: 'product' }" class="nav-link border text-center" >
                    Sản phẩm
                    <i class="fas fa-book"></i>
                </router-link>
                <router-link :to="{ name: 'product' }" class="nav-link border text-center" >
                    Thông báo
                    <i class="fas fa-bell"></i>
                </router-link>
                <router-link :to="{ name: 'revenue' }" class="nav-link border text-center" >
                    Doanh thu
                    <i class="fas fa-dollar"></i>
                </router-link>
                <router-link :to="{ name: 'order' }" class="nav-link border text-center" >
                    Đơn hàng
                    <i class="fa-solid fa-box"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>