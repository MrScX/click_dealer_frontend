# Frontend codebase of Click Dealer

Example .env file:

```
NEXT_PUBLIC_ENVIRONMENT = development
NEXT_PUBLIC_API_ROOT = http://localhost:6060
NEXT_SHARP_PATH = /node_modules/sharp
```

`NEXT_SHARP_PATH` is important. Sharp needs to be installed. By default, Next.js uses a image processor which is very slow. Sharp speeds things up by a lot.
