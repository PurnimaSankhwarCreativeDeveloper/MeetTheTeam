<template>
  <div class="top-bar">
    <div v-on:click="sort()" class="sort">
      <i v-if="sortAsc" class="fa-regular fa-arrow-up-a-z"></i>
      <i v-else class="fa-regular fa-arrow-down-z-a"></i>
    </div>
    <div>
      <span class="search-icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input
        type="text"
        v-model="search"
        @keydown.enter="preventEnterKey"
        @keyup="inputChange"
        @keydown.tab.prevent
      />
    </div>
    <div class="toggle">
      <i
        v-if="cardView"
        class="fa-sharp fa-regular fa-grid-2"
        v-on:click="toggle(false)"
      ></i>
      <i v-else class="fa-regular fa-bars" v-on:click="toggle(true)"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isCardView: {
      type: Boolean,
    },
  },

  data() {
    return {
      cardView: this.isCardView,
      sortAsc: false,
      search: "",
    };
  },

  methods: {
    inputChange(event) {
      let text = event.target.value;
      clearInterval(this.timer);
      this.timer = setTimeout(() => {
        this.$emit("filter", text);
      }, 700);
    },

    preventEnterKey(event) {
      event.preventDefault();
      console.log("hi");
    },

    sort() {
      this.sortAsc = !this.sortAsc;
      this.$emit("sort", this.sortAsc);
    },

    toggle() {
      this.cardView = !this.cardView;
      this.$emit("change", this.cardView);
    },
  },
};
</script>
<style>
.search-icon {
  left: 9%;
  position: absolute;
  z-index: 1;
  padding-top: 4px;
  padding-bottom: 5px;
  margin-left: 8px;
  margin-top: -20px;
}

input {
  left: 0;
  position: absolute;
  border: none;
  outline: none;
  border-radius: 20px;
  font-size: 16px;
  padding: 1px 15px 2px 30px;
  height: 20px;
  font-family: system-ui;
  margin-top: -20px;
  margin-left: 9%;
}

.toggle {
  position: absolute;
  display: flex;
  cursor: pointer;
  font-size: 20px;
  margin-top: 10px;
  flex-direction: row-reverse;
  width: 80%;
  padding: 5px;
}

.sort {
  cursor: pointer;
  font-size: 20px;
  margin-top: 10px;
  padding: 5px;
  width: 85%;
}

.top-bar {
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;
  display: flex;
  flex-direction: row-reverse;
}

@media (min-width: 600px) {
  .sort {
    margin-top: 0px;
    width: 0%;
    flex-direction: inherit;
    padding: inherit;
  }
  .top-bar {
    display: grid;
    grid-template-columns: 40px 380px 210px;
  }

  .toggle {
    width: auto;
    position: inherit;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
    font-size: 20px;
    margin-top: 0px;
    padding: inherit;
  }

  input {
    position: relative;
    left: 0%;
    margin-left: 0;
  }
  .search-icon {
    left: auto;
    position: absolute;
    z-index: 1;
    padding-top: 1px;
    padding-bottom: 5px;
    margin-left: 8px;
    margin-top: 0px;
  }
}
</style>
