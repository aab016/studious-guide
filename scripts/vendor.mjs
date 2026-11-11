import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const vendorDir = join(root, 'docs', 'vendor')
const threeSrc = join(root, 'node_modules', 'three')
const jquerySrc = join(root, 'node_modules', 'jquery', 'dist', 'jquery.min.js')

const requirePath = (path, label) => {
  if (existsSync(path)) return
  throw new Error(`Missing ${label}: ${path}. Run npm install first.`)
}

requirePath(join(threeSrc, 'build', 'three.module.js'), 'three.module.js')
requirePath(jquerySrc, 'jquery.min.js')

rmSync(vendorDir, { recursive: true, force: true })
mkdirSync(join(vendorDir, 'three', 'build'), { recursive: true })
mkdirSync(join(vendorDir, 'three', 'examples', 'jsm'), { recursive: true })
mkdirSync(join(vendorDir, 'jquery'), { recursive: true })
writeFileSync(join(vendorDir, '.gitkeep'), '')

cpSync(join(threeSrc, 'build', 'three.module.js'), join(vendorDir, 'three', 'build', 'three.module.js'))
cpSync(join(threeSrc, 'examples', 'jsm'), join(vendorDir, 'three', 'examples', 'jsm'), { recursive: true })
cpSync(jquerySrc, join(vendorDir, 'jquery', 'jquery.min.js'))

console.log('vendor: copied three + jquery into docs/vendor')
