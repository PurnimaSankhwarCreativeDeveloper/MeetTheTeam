<template>
  <div id="app"><link rel="stylesheet" 
        href="node_modules/@fortawesome/fontawesome-free/css/all.css">
        <!-- <p>Have a cup of coffee: <i class="fas fa-coffee"></i> </p> -->
    <Layout>
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
import Layout from './components/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>



