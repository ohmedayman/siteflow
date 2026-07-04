# DNS Setup for Subdomain Hosting

To enable `*.siteflow.vexonet.online` subdomain hosting:

## 1. Wildcard DNS Record

Add a **CNAME record** (or A record if you have a static IP):

| Type  | Name  | Value                     |
|-------|-------|---------------------------|
| CNAME | `*`   | `siteflow.vexonet.online` |

Or if using an A record:

| Type | Name  | Value        |
|------|-------|--------------|
| A    | `*`   | `<server-ip>`|

This must be added at your Vexonet DNS settings.

## 2. Server (Nginx / Reverse Proxy)

If you use Nginx as a reverse proxy, add:

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

## 3. Flask Config

Already set in `app.py` and `config.py`. The `MAIN_DOMAIN = 'siteflow.vexonet.online'` variable is used to detect subdomain requests.

## 4. Trial Duration

Default: 14 days. Override with env var:

```
TRIAL_DAYS=14
```

## How It Works

1. User creates a site with slug `my-portfolio`
2. Site accessible at `https://my-portfolio.siteflow.vexonet.online/`
3. Flask checks `Host` header, extracts subdomain as slug
4. Looks up site in DB, checks `expires_at` (created_at + 14 days)
5. If expired, shows "Site Expired" page
6. If active, renders full site HTML server-side
7. Each visit increments view counter
