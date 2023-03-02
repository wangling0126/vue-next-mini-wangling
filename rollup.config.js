import typescript from '@rollup/plugin-typescript'
import sourceMaps from 'rollup-plugin-sourcemaps'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

export default {
  input: './packages/vue/src/index.ts',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': JSON.stringify('browser'),
      'process.env.LANGUAGE': JSON.stringify(process.env.LANGUAGE)
    }),
    resolve(),
    commonjs(),
    typescript(),
    sourceMaps()
  ],
  output: [
    {
      // 变量名
      name: 'Vue',
      // 生成的包格式：一个自动执行的功能，适合作为<script>标签
      format: 'iife',
      // 导出的文件地址
      file: './packages/vue/dist/vue.js',
      // 开启 SourceMap
      sourcemap: true
    },
    {
      format: 'cjs',
      file: './packages/vue/dist/mini-vue.cjs.js',
      sourcemap: true
    },
    {
      name: 'vue',
      format: 'es',
      file: './packages/vue/dist/mini-vue.esm-bundler.js',
      sourcemap: true
    }
  ],
  onwarn: (msg, warn) => {
    // 忽略 Circular 的错误
    if (!/Circular/.test(msg)) {
      warn(msg)
    }
  }
}
