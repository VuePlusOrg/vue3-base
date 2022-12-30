<route lang="yaml">
name: Login
meta:
  requiresAuth: false
</route>

<template>
  <div class="login">
    <div class="login__logo">
      <img
        class="login__logo__image"
        src="src/assets/logo.svg"
        alt="logo"
      />
      <div class="login__logo__text">Vue3 Base</div>
    </div>
    <div class="login__subtitle">
      A Vue3-based project infrastructure that can help you quickly and engineer
      Vue3-based project development.
    </div>
    <a-form
      class="login__form"
      :model="formState"
      name="normal_login"
      @finish="() => userStore.login(formState.username, formState.password)"
      @finish-failed="() => message.error('Login Failed')"
    >
      <a-form-item
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input
          v-model:value="formState.username"
          placeholder="Username: admin"
          size="large"
        >
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password
          v-model:value="formState.password"
          placeholder="Password: admin123"
          size="large"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          size="large"
          block
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
    <div class="login__footer">Copyright © 2022 VuePlusOrg</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const formState = reactive({
  username: '',
  password: ''
})
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px 0 144px;
  background: #2d3a4b;
  height: 100%;

  &__logo {
    display: flex;
    justify-content: center;
    &__image {
      width: 44px;
    }

    &__text {
      font-weight: bold;
      font-size: 33px;
      margin-left: 16px;
      color: white;
    }
  }

  &__subtitle {
    margin-top: 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    color: white;
    width: 368px;
    text-align: center;
  }

  &__form {
    width: 368px;
    margin-top: 40px;
  }

  &__footer {
    position: fixed;
    color: white;
    bottom: 24px;
  }
}
</style>
