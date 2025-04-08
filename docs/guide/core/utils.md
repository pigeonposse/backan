
# `backan/utils` - Utility Exports

These are helpful utilities and middleware functions provided by `backan` for building web applications faster with Hono.

## 📄 List of Utilities

### 🌐 Swagger UI

- `swaggerUI`
  → Serve interactive API docs.

```ts
import { swaggerUI } from 'backan/utils'
app.route('/docs', swaggerUI({ url: '/openapi.json' }))
```

### 🔐 JWT & JWK

- `jwt`, `jwk`
  → Handle JWT auth and keys.

```ts
import { jwt } from 'backan/utils'
app.use('/secure/*', jwt({ secret: 'my-secret' }))
```

### 🧁 Cookies

- `getCookie`, `setCookie`, `deleteCookie`, `getSignedCookie`, `setSignedCookie`
  → Work with cookies.

```ts
import { getCookie, setCookie } from 'backan/utils'

app.get('/', (c) => {
  const user = getCookie(c, 'user')
  if (!user) setCookie(c, 'user', 'guest')
  return c.text(`Hello ${user || 'new user'}`)
})
```

### 📦 Cache & Compression

- `cache`
- `compress`
  → Control caching and compression.

```ts
app.use('*', compress())
app.use('/static/*', cache({ cacheName: 'static' }))
```

### 🧠 Context Storage

- `contextStorage`, `getContext`
  → Store and retrieve context across async calls.

### 🔄 Trailing Slash

- `appendTrailingSlash`, `trimTrailingSlash`
  → Normalize URLs.

### 🌍 CORS

- `cors`
  → Enable Cross-Origin Resource Sharing.

```ts
app.use(cors())
```

### 🕵️ Secure Headers

- `secureHeaders`
  → Add common security headers.

### ⛔ IP Restriction

- `ipRestriction`
  → Restrict access by IP.

### 🕑 Timeout & Body Limit

- `timeout`, `bodyLimit`
  → Request timeouts and body size limits.

### 🧹 Pretty JSON

- `prettyJSON`
  → Pretty-print JSON in dev.

### 🔄 Method Override

- `methodOverride`
  → Allow `_method` to override HTTP methods.

### 🧠 Combine

- `some`, `every`, `except`
  → Combine route conditions or logic.

### 🧾 Accepts

- `accepts`
  → Handle content negotiation.

### 🧼 Powered By

- `poweredBy`
  → Add `X-Powered-By` header.

### 🧼 Logger

- `logger`
  → Request logging.

### 🌐 Language Detection

- `languageDetector`
  → Detect preferred language from headers.

### ⚠️ HTTP Exception

- `HTTPException`
  → Throw structured errors.

### 🔁 Proxy

- `proxy`
  → Forward requests to another origin.

### 🌐 Runtime-specific Connection Info

- `getConnInfo(type)`
  → Dynamically load connection info for `bun`, `deno`, `cloudflare`, `vercel`.
