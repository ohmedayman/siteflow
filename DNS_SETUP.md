# DNS Setup for Subdomain Hosting

To enable `*.siteflow.vexonet.online` subdomain hosting:

## Wildcard DNS Record

Add a **CNAME record** at your Vexonet DNS settings:

| Type  | Name  | Value                     |
|-------|-------|---------------------------|
| CNAME | `*`   | `siteflow.vexonet.online` |

Or if using an A record (static IP):

| Type | Name  | Value        |
|------|-------|--------------|
| A    | `*`   | `<server-ip>`|

## SSL / HTTPS

Make sure SSL covers `*.siteflow.vexonet.online` (wildcard cert or auto-SSL via proxy).

## Server (Nginx Reverse Proxy)

```
server {
    listen 80;
    server_name *.siteflow.vexonet.online;
    
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## How It Works

1. User creates a site with slug `my-portfolio`
2. Site accessible at `https://my-portfolio.siteflow.vexonet.online/`
3. Flask checks `Host` header, extracts subdomain = slug
4. Looks up site in DB, renders full HTML server-side
5. Each visit increments view counter
6. **No expiry** — sites stay online forever
