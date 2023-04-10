<template>
  <div ref="main">
    <p class="header">Meet the Team</p>
    <TopBar
      :is-card-view="isCardView"
      @change="handleChange"
      @sort="sortUsers"
      @filter="filterUsers"
    />
    <div v-if="isCardView">
      <CardTemplate :displayed-users="filteredUsers" @childMounted="loadUsers" />
    </div>
    <div v-else>
      <ListTemplate :displayed-users="filteredUsers" @childMounted="loadUsers" />
    </div>
  </div>
</template>

<script>
import Api from "../meetTheTeam/meetTheTeam.api";
import TopBar from "../meetTheTeam/components/TopBar.vue";
import CardTemplate from "../meetTheTeam/components/CardTemplate.vue";
import ListTemplate from "../meetTheTeam/components/ListTemplate.vue";

export default {
  data() {
    return {
      users: [],
      displayedUsers: [],
      isLoading: false,
      isCardView: true,
      resultsPerPage: 6,
      currentPage: 1,
      searchInput: "",
      sortAsc: false,
    };
  },

  components: {
    CardTemplate,
    ListTemplate,
    TopBar,
  },

  methods: {
    handleChange(value) {
      this.isCardView = value;
    },

    filterUsers(searchInput) {
      this.searchInput = searchInput;
    },

    sortUsers(sortAsc) {
      this.sortAsc = sortAsc;
    },

    async loadUsers(currentPage) {
      this.isLoading = true;
      if (this.users.length === 0) {
        const response = await Api.fetchIndividuals();
        if (response) {
          this.users.push(...response.results);
        }
      }
      this.currentPage = currentPage;
    },
  },

  computed: {
    filteredUsers() {
      let filteredUsers = this.users;

      if (this.searchInput) {
        filteredUsers = filteredUsers.filter((user) =>
          user.name.first.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }

      if (this.sortAsc) {
        filteredUsers = filteredUsers.sort((a, b) =>
          a.name.first.localeCompare(b.name.first)
        );
      } else {
        filteredUsers = filteredUsers.sort((a, b) =>
          b.name.first.localeCompare(a.name.first)
        );
      }
      return filteredUsers.slice(0, this.currentPage * this.resultsPerPage);
    },

    canLoadMore() {
      return this.filteredUsers.length < this.users.length;
    },
  },
};
</script>
<style scoped>
.header {
  margin-left: 5%;
  padding: 10px;
  font-size: x-large;
  font-weight: 500;
}

@media (min-width: 600px) {
  .header {
    margin-left: 30%;
    font-size: xx-large;
    font-weight: 500;
  }
}
</style>