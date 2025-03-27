
<template>
  <div class="modern-navigation-menu">
    <!-- This is a sample Vue component that could override a Nextcloud component -->
    <div class="modern-navigation-header">
      <div class="modern-app-icon" v-if="appIcon">
        <img :src="appIcon" :alt="appName">
      </div>
      <h2 class="modern-app-name">{{ appName }}</h2>
    </div>
    
    <ul class="modern-navigation-list">
      <li v-for="(item, index) in navigationItems" 
          :key="index" 
          class="modern-navigation-item"
          :class="{ 'active': item.active }">
        <a :href="item.href" @click.prevent="onNavigationClick(item)">
          <span class="modern-navigation-icon" v-if="item.icon">
            <img :src="item.icon" :alt="item.name">
          </span>
          <span class="modern-navigation-label">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavigationMenuModern',
  
  props: {
    appName: {
      type: String,
      required: true
    },
    appIcon: {
      type: String,
      default: null
    },
    navigationItems: {
      type: Array,
      default: () => []
    }
  },
  
  methods: {
    onNavigationClick(item) {
      this.$emit('navigation-click', item);
      
      // If using router
      if (item.route) {
        this.$router.push(item.route);
      } else if (item.href) {
        window.location.href = item.href;
      }
    }
  }
}
</script>

<style scoped>
.modern-navigation-menu {
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1rem;
}

.modern-navigation-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.modern-app-icon {
  width: 32px;
  height: 32px;
  margin-right: 0.75rem;
}

.modern-app-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modern-app-name {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
}

.modern-navigation-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modern-navigation-item {
  margin-bottom: 0.5rem;
}

.modern-navigation-item a {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--color-main-text);
  transition: all var(--animation-quick) ease;
}

.modern-navigation-item a:hover {
  background-color: var(--color-background-hover);
}

.modern-navigation-item.active a {
  background-color: var(--color-primary-element);
  color: var(--color-primary-element-text);
}

.modern-navigation-icon {
  width: 18px;
  height: 18px;
  margin-right: 0.75rem;
}

.modern-navigation-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modern-navigation-label {
  font-size: 0.9rem;
}
</style>
