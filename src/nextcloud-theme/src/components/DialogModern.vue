
<template>
  <div class="dialog-modern" :class="{ 'show': show, 'dark': isDarkMode }">
    <div class="dialog-backdrop" @click="closeOnBackdrop && $emit('close')"></div>
    <div class="dialog-container" :class="size">
      <div class="dialog-header">
        <h3 class="dialog-title" v-if="title">{{ title }}</h3>
        <button class="dialog-close" @click="$emit('close')" v-if="showCloseButton">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div class="dialog-content">
        <slot></slot>
      </div>
      
      <div class="dialog-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
      
      <div class="dialog-actions" v-else-if="showActions">
        <button class="dialog-button secondary" v-if="cancelText" @click="$emit('cancel')">{{ cancelText }}</button>
        <button class="dialog-button primary" v-if="confirmText" @click="$emit('confirm')">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogModern',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: 'OK'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showActions: {
      type: Boolean,
      default: true
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  data() {
    return {
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  },
  mounted() {
    // Dark Mode Änderungen überwachen
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', e => {
      this.isDarkMode = e.matches;
    });
    
    // Event-Listener für ESC-Taste
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(e) {
      if (this.show && e.key === 'Escape') {
        this.$emit('close');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-modern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s, opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.show {
    visibility: visible;
    opacity: 1;
    
    .dialog-container {
      transform: scale(1);
    }
  }
  
  .dialog-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.2);
    
    .dark & {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  
  .dialog-container {
    position: relative;
    background-color: rgba(250, 250, 250, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transform: scale(0.95);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    .dark & {
      background-color: rgba(40, 40, 45, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }
    
    &.small {
      width: 400px;
    }
    
    &.medium {
      width: 600px;
    }
    
    &.large {
      width: 800px;
    }
    
    @media (max-width: 768px) {
      width: 90% !important;
    }
  }
  
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    
    .dark & {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .dialog-title {
      font-size: 16px;
      font-weight: 500;
      margin: 0;
    }
    
    .dialog-close {
      background: transparent;
      border: none;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
      transition: all 0.2s;
      
      &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.05);
      }
      
      .dark &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
  
  .dialog-content {
    padding: 20px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    flex: 1;
  }
  
  .dialog-footer {
    padding: 16px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    
    .dark & {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
  }
  
  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 16px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    
    .dark & {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
  }
  
  .dialog-button {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    
    &.primary {
      background-color: var(--color-primary-element);
      color: white;
      
      &:hover {
        opacity: 0.9;
      }
      
      &:active {
        transform: scale(0.98);
      }
    }
    
    &.secondary {
      background-color: rgba(0, 0, 0, 0.05);
      color: inherit;
      
      .dark & {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        
        .dark & {
          background-color: rgba(255, 255, 255, 0.15);
        }
      }
      
      &:active {
        transform: scale(0.98);
      }
    }
  }
}
</style>
