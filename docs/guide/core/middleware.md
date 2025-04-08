# Middleware

Middleware functions are used to run custom logic before or after the main request handler. They can modify the request, add headers to the response, handle errors, perform authentication, logging, validation, and more. Middleware in `backan` is registered using app.use() and can be applied globally or scoped to specific routes.

## Usage

```js twoslash

import { App } from 'backan'
const app = new App( )

app.use('*', async ( c, next ) => {

  const start = Date.now()
  await next()
  const end = Date.now()
  c.res.headers.set('X-Response-Time', `${end - start}`)

} )

```

## Examples

### 🔍 Simple Logger

```ts
import { App } from 'backan'
const app = new App()

app.use('*', async (c, next) => {
  console.log(`[${new Date().toISOString()}] ${c.req.method} ${c.req.url}`)
  await next()
})
```

### 🔐 Basic Authentication

```ts
app.use('/admin/*', async (c, next) => {
  const token = c.req.header('authorization')
  if (token !== 'Bearer supersecrettoken') {
    return c.text('Unauthorized', 401)
  }
  await next()
})
```

### 📦 Enforce JSON Content-Type

```ts
app.use('/api/*', async (c, next) => {
  if (c.req.header('content-type') !== 'application/json') {
    return c.json({ error: 'Only JSON requests are allowed' }, 415)
  }
  await next()
})
```

### 🧠 Add Data to Context

```ts
app.use('/profile', async (c, next) => {
  c.set('userId', '1234') // example: add user ID
  await next()
})

app.get('/profile', (c) => {
  const userId = c.get('userId')
  return c.json({ userId })
})
```

### 🛑 Global Error Handler

```ts
app.use('*', async (c, next) => {
  try {
    await next()
  } catch (err) {
    console.error('Unhandled error:', err)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})
```

---

### 📊 Response Time Header

```ts
app.use('*', async (c, next) => {
  const start = performance.now()
  await next()
  const end = performance.now()
  c.res.headers.set('X-Response-Time', `${end - start}ms`)
})
```
