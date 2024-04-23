<template>
  <AppHeader :user="user"></AppHeader>
  <div>
    <InputSearch v-model="searchText" />
  </div>

  <div class="row">
    <div class="mt-3 col-md-6">
      <h4>Danh Sách NXB</h4>
      <NXBList
        v-if="filteredNXBsCount > 0"
        :NXBs="filteredNXBs"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Hiện tại chưa có NXB nào</p>
      <div class="mt-3 row justify-content-around align-items-center gap-3">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddNXB()">
          Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllNXBs()">
          Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeNXB">
        <h4>Thông tin NXB</h4>
        <NXBCard :NXB="activeNXB" />
        <router-link
          :to="{
            name: 'NXB.edit',
            params: { id: activeNXB._id },
          }"
        >
          <span class="mt-2 badge badge-warning"> Chỉnh sửa </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NXBCard from "@/components/NXBCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import NXBList from "@/components/NXBList.vue";
import NXBService from "@/services/nxb.service";
import AppHeader from "@/components/AppHeader.vue";

import userService from "@/services/user.service";

export default {
  components: {
    NXBCard,
    InputSearch,
    NXBList,
    AppHeader,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      NXBs: [],
      activeIndex: -1,
      searchText: "",
      user: null,
    };
  },
  watch: {
    //giam sat thay doi cua bien searchText
    //bo chon cac phan tu dan duoc chon trog danh sach
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    //chuyen cac doi tuong contact hanh chuoi de de tim kiem
    NXBStrings() {
      return this.NXBs.map((NXB) => {
        const { MaNXB, TenNXB, diaChi } = NXB;
        console.log(NXB);
        return [MaNXB, TenNXB, diaChi].join("");
      });
    },
    //tra ve cac contact co chua thong tin tim kiem
    filteredNXBs() {
      if (!this.searchText) return this.NXBs;
      return this.NXBs.filter((_NXB, index) =>
        this.NXBStrings[index].includes(this.searchText)
      );
    },
    activeNXB() {
      if (this.activeIndex < 0) return null;
      return this.filteredNXBs[this.activeIndex];
    },
    filteredNXBsCount() {
      return this.filteredNXBs.length;
    },
  },
  methods: {
    async retrieveNXBs() {
      try {
        this.NXBs = await NXBService.findAllNXB();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveNXBs();
      this.activeIndex = -1;
    },
    async removeAllNXBs() {
      if (confirm("Ban muon xoa tat ca Lien he???")) {
        try {
          await NXBService.deleteAllNXB();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddNXB() {
      this.$router.push({ name: "NXB.add" });
    },
    async getUser(id) {
      this.user = await userService.findOneUser(id);
    },
  },
  mounted() {
    this.refreshList();
  },
  created() {
    this.getUser(this.id);
  },
};
</script>
