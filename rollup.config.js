import riot from 'rollup-plugin-riot'
import replace from '@rollup/plugin-replace'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  plugins: [
    replace({
      delimiters: ['<@', '@>'],
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      DATABASE_URL: process.env.DATABASE_URL,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    }),
    riot(),
    nodeResolve({ jsnext: true }),
    commonjs(),
  ],
  input: 'src/main.js',
  output: [
    {
      name: 'nisiu',
      sourcemap: true,
      file: 'dist/main.js',
      format: 'umd',
    },
  ],
}
