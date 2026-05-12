// Default config for tests/web-test. CLI URL still overrides defaultContext URL.
// Two contexts pointing at the same webtest publication — represent two independent
// 1C sessions (different cookies), used by multi-context tests to simulate two users.
//
// AppName `webtest-runner` отличается от интерактивной публикации `webtest` на :8081 —
// автономный стенд (см. tests/web-test/_hooks.mjs) использует свой URL, чтобы не
// конфликтовать с ручной разведкой и работать поверх отдельного Apache на :9191.
export default {
  contexts: {
    a: { url: 'http://localhost:9191/webtest-runner/ru_RU' },
    b: { url: 'http://localhost:9191/webtest-runner/ru_RU' },
  },
  defaultContext: 'a',
  // isolation: 'tab' (default) — persistent context, tabs in one window, 1С extension loads.
  //   Cookies are shared between tabs but scope by URL path, so different vrd-publications
  //   give independent auth without extra isolation.
  // isolation: 'window' — separate BrowserContext per slot, full cookie isolation,
  //   extension may not load (Playwright limitation). Use only when really needed.
  timeout: 60000,
};
