<template>
  <div class="user-list">
    <ul @scroll="handleScroll" ref="listTemplate">
      <li
        v-for="user in displayedUsers"
        :key="user.id"
        :style="{ backgroundColor: getRandomColor() }"
      >
        <div class="div1" :style="{ backgroundColor: bgColor }">
          <img :src="user.picture.medium" :alt="user.name.first" />
        </div>
        <div class="div2">
          <h2 class="name">{{ user.name.first }} {{ user.name.last }}</h2>
          <p class="location">{{ user.location.city }}</p>
          <p class="fill"></p>
        </div>
      </li>
      <div ref="sentinel"></div>
    </ul>
  </div>
</template>
<script>
export default {
  name: "listTemplate",
  props: {
    displayedUsers: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      colors: ["#e8cdad", "#a2b8a9", "#e0c0b2"],
      bgColor: "",
      lastColorIndex: -1,
      observer: null,
      currentPage: 1,
    };
  },

  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.currentPage += 1;
        this.$emit("childMounted", this.currentPage);
      }
    });
    this.observer.observe(this.$refs.sentinel);
  },

  methods: {
    getRandomColor() {
      let index;
      do {
        index = Math.floor(Math.random() * this.colors.length);
      } while (index === this.lastColorIndex);
      this.lastColorIndex = index;
      this.bgColor = this.colors[index];
      return this.bgColor;
    },
  },
};
</script>

<style>
.div1 {
  width: 20%;
  height: 100px;
  position: inherit;
  border-radius: 20px;
}
.div2 {
  width: 100%;
  border-radius: 20px 20px 20px 0px;
  background: white;
}
.user-list ul {
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  padding: inherit;
}

.user-list li {
  width: 90%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

.user-list .user-info {
  display: flex;
  gap: 20px;
  align-items: center;
}

.user-list img {
  position: relative;
  width: 75px;
  border-radius: 50%;
  top: 15%;
  left: 40%;
}
.name {
  margin-left: 15%;
}
.location {
  margin-left: 15%;
  margin-top: -15px;
}
.fill {
  height: 1px;
}
@media (min-width: 600px) {
  .user-list li {
    width: 670px;
  }
  .div1 {
    width: 10%;
    height: 100px;
    position: inherit;
    border-radius: 20px;
  }
  .name {
    margin-left: 8%;
  }
  .location {
    margin-left: 8%;
  }
}
</style>