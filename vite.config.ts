import { defineConfig, loadEnv, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'


export default ({ mode }: UserConfig) => {
  process.env = {...process.env, ...loadEnv(mode ?? 'development', process.cwd())};
  // https://vitejs.dev/config/
  return defineConfig({
    base: process.env.VITE_APP_BASE_PATH,
    plugins: [
      vue(),
      tsconfigPaths(),
    ]
  })
}
