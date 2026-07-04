# DNS + Server Setup for Subdomain Hosting

لتفعيل `*.siteflow.vexonet.online` عشان كل موقع ياخد subdomain تلقائي:

## 1. DNS (في لوحة تحكم Vexonet)

أضف **CNAME record**:

| Type  | Name  | Value                     |
|-------|-------|---------------------------|
| CNAME | `*`   | `siteflow.vexonet.online` |

> لو مش متأكد ازاي تعمل كده، افتح تيكت في دعم Vexonet واطلب "Wildcard CNAME for *.siteflow.vexonet.online"

## 2. SSL Certificate

تأكد إن SSL يغطي `*.siteflow.vexonet.online`. لو بتستخدم Cloudflare أو proxy تاني، شغّل "Full" SSL للـ wildcard.

## 3. Nginx Config

الملف `nginx-siteflow.conf` موجود في المشروع — انسخه لمجلد `/etc/nginx/sites-available/` واعمل enable.

```bash
sudo cp nginx-siteflow.conf /etc/nginx/sites-available/siteflow
sudo ln -s /etc/nginx/sites-available/siteflow /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 4. تشغيل Flask

```bash
cd /var/www/siteflow/backend
pip install -r requirements.txt
python app.py
```

أو استخدم `gunicorn` للإنتاج:
```bash
gunicorn -w 4 -b 127.0.0.1:5000 app:app
```

## الخلاصة

| النطاق | بيخدم إيه |
|--------|-----------|
| `siteflow.vexonet.online` | SPA الرئيسي (الموقع نفسه) |
| `my-site.siteflow.vexonet.online` | موقع المستخدم (rendered من Flask) |
| `siteflow.vexonet.online/api/*` | API الباك إند |
