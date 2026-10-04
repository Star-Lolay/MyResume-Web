import { createRoot } from 'react-dom/client'
// 使用 HashRouter：GitHub Pages / Cloudflare Pages 纯静态托管下刷新子路由不会 404
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
