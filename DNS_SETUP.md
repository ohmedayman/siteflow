# DNS Setup for Subdomain Hosting (Vercel)

لتفعيل `*.siteflow.vexonet.online` عشان كل موقع ياخد subdomain تلقائي:

## 1. DNS Records (في لوحة تحكم domain)

| Type  | Name  | Value                     |
|-------|-------|---------------------------|
| CNAME | `*`   | `cname.vercel-dns.com`    |
| CNAME | `@`   | `cname.vercel-dns.com`    |

لو `cname.vercel-dns.com` مش شغال مع مزوّد DNS بتاعك، جرب:
| CNAME | `*`   | `siteflow-roan.vercel.app` |
| CNAME | `@`   | `siteflow-roan.vercel.app` |

## 2. Vercel Dashboard

1. افتح مشروعك على [vercel.com](https://vercel.com)
2. **Project Settings → Domains**
3. ضيف `siteflow.vexonet.online` (لو مش مضاف)
4. ضيف `*.siteflow.vexonet.online` — ده الـ wildcard اللي يخلّي كل subdomain يشتغل

> خلي بالك: Vercel بيتعامل مع `*.siteflow.vexonet.online` كـ domain منفصل ويطلع SSL تلقائي ليه.

## 3. SSL

Vercel بيطلع SSL تلقائي لكل الـ domains — مش محتاج تعمل حاجة.

## 4. اختبر

- روح لـ `https://demo.siteflow.vexonet.online`
- لو ظهرت صفحة "My Portfolio" يبقى شغال ✅
- لو ظهر 404، استنى شوية (DNS بياخد وقت لينتشر)

## ملاحظة مهمة

الـ subdomain شغال **client-side** (في المتصفح):
- الـ SPA بتكشف الـ hostname
- بتجيب الـ site من localStorage
- بتظهر الصفحة مباشرة
- مش محتاج Flask عشان يشتغل

لو عاوز deploy الـ Flask عشان API كامل، ده محتاج سيرڤر منفصل (Render / Railway / VPS)

## الخلاصة

| النطاق | بيخدم إيه |
|--------|-----------|
| `siteflow.vexonet.online` | SPA الرئيسي (Dashboard, Builder, إلخ) |
| `demo.siteflow.vexonet.online` | الموقع المنشور (public page) |
| `*.siteflow.vexonet.online` | أي موقع تاني بتنشره |

