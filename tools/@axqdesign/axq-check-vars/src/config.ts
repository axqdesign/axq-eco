/**
 * axq-check-vars · config.ts
 * @axqdesign/axq-check-vars v0.0.0
 *
 * Cấu hình CSS custom-property prefix và danh sách bỏ qua.
 * Dùng chung với axq-build-css (cùng giá trị prefix).
 *
 * AXQ Design · https://axqdesign.axq
 */

import type { Root } from 'postcss'

// ─── Prefix ───────────────────────────────────────────────────────────────────

/**
 * Tất cả custom properties trong SCSS được viết bare (--card-bg)
 * và được gắn prefix công khai tại đây, trong PostCSS pipeline.
 * Giữ đồng bộ với axq-build-css/src/css-var-prefix.ts.
 */
export const AXQ_CSS_VAR_PREFIX = 'axq-'

// ─── Ignore list ──────────────────────────────────────────────────────────────

/**
 * Những prefix của third-party mà KHÔNG cần gắn --axq-.
 * Mỗi thư viện đọc biến của chính nó theo tên riêng;
 * nếu ta đổi tên → theming bị mất hoàn toàn, không có lỗi nào được báo.
 * Thêm vào đây khi tích hợp vendor stylesheet mới.
 */
export const AXQ_CSS_VAR_IGNORE: string[] = [
  '--axq-',    // đã có prefix rồi — tránh double-prefix
  '--bs-',     // Bootstrap
  '--vt-',     // Vite / Vue Transition (nếu dùng)
  '--fc-',     // FullCalendar
  '--plyr-',   // Plyr media player
  '--ts-',     // Tom Select
  '--gl-',     // star-rating.js
]

// ─── PostCSS plugin: inline value comments ────────────────────────────────────

/**
 * PostCSS đặt trailing comment của declaration value vào `raws.value.raw`
 * và trả ra `value` đã được clean. Plugin nào write `decl.value` sẽ mất comment.
 * Điều đó âm thầm xoá mọi `/*rtl:ignore*\/` — marker mà rtlcss dùng.
 * Fold raw vào value trước khi pipeline chạy → comment còn nguyên.
 */
export const inlineValueComments = {
  postcssPlugin: 'axq-inline-value-comments',
  Once(root: Root) {
    root.walkDecls((decl) => {
      if (decl.raws.value) decl.value = decl.raws.value.raw
    })
  },
}
