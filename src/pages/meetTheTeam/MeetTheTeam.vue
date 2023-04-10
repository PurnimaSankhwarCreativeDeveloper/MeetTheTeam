<template>
  <div ref="main">
    <div class="error-message" v-if="error">
      <p>{{ errorMessage }}</p>
    </div>
    <p class="header">Meet the Team</p>
    <div v-if="isLoading" id="loading-spinner"></div>
    <TopBar
      v-else
      :is-card-view="isCardView"
      @change="handleChange"
      @sort="sortUsers"
      @filter="filterUsers"
    />
    <div v-if="isCardView">
      <CardTemplate
        :displayed-users="filteredUsers"
        @childMounted="loadUsers"
      />
    </div>
    <div v-else>
      <ListTemplate
        :displayed-users="filteredUsers"
        @childMounted="loadUsers"
      />
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
      error: false,
      errorMessage: "",
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
        try {
          const response = await Api.fetchIndividuals();
          if (response) {
            this.users.push(...response.results);
          }
        } catch (error) {
          this.error = true;
          this.errorMessage =
            "Oops, something went wrong. Please try again later.";
        }
      }
      this.currentPage = currentPage;
      this.isLoading = false;
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
.error-message {
  position: absolute;
  left: 10%;
  width: 78%;
  background-color: #ffcccc;
  border: 1px solid #ff0000;
  color: #ff0000;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  top: 0;
}

#loading-spinner {
  border: 5px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s infinite linear;
  position: absolute;
  left: 43%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

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

  #loading-spinner {
    left: 50%;
  }

  .error-message {
    left: 30%;
    width: 38%;
    top: 5%;
  }
}
</style>