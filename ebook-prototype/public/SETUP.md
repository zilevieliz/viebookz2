# eBook Site — Setup Guide
Complete step-by-step instructions to go live for free.

---

## What you will set up
- **Neon** — free cloud database (stores your chapters)
- **GitHub** — stores your code
- **Vercel** — hosts your website and connects to Neon

Total time: ~20 minutes. All free. No credit card needed.

---

## Step 1 — Create a Neon database

1. Go to https://neon.tech
2. Click **Sign Up** → sign in with Google
3. Click **Create Project**
4. Name it anything (e.g. `my-book`)
5. Choose region closest to you → click **Create**
6. On the dashboard, find **Connection string** — it looks like:
   ```
   postgresql://username:password@host/dbname?sslmode=require
   ```
7. **Copy this string** — you will need it in Step 3

That is it. Neon automatically creates your database table the first time the site runs.

---

## Step 2 — Upload code to GitHub

1. Go to https://github.com → sign up if you don't have an account
2. Click **New repository** (the green button)
3. Name it `my-ebook-site`
4. Set to **Public** → click **Create repository**
5. On the next screen, click **uploading an existing file**
6. Upload ALL the files from this folder:
   - `vercel.json`
   - `package.json`
   - `public/index.html`
   - `public/admin.html`
   - `api/chapters.js`
   - `api/admin.js`
7. Click **Commit changes**

Your code is now on GitHub.

---

## Step 3 — Deploy on Vercel

1. Go to https://vercel.com → sign up with your GitHub account
2. Click **Add New Project**
3. Find your `my-ebook-site` repository → click **Import**
4. Before clicking Deploy, click **Environment Variables**
5. Add these two variables:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | (paste your Neon connection string from Step 1) |
   | `ADMIN_PASSWORD` | `admin123` (or your own password) |

6. Click **Deploy**
7. Wait ~1 minute for Vercel to build

---

## Step 4 — Your site is live

Vercel gives you a URL like:
```
https://my-ebook-site.vercel.app
```

- **Public page:** `https://your-site.vercel.app`
- **Admin panel:** `https://your-site.vercel.app/admin.html`

Log in with `admin123` (or whatever you set).

---

## How to write and publish

1. Go to `/admin.html` on your site
2. Enter your password
3. Click **＋ New chapter**
4. Write your title and chapter body
5. Click **Save draft** (saves privately, not visible to public)
6. Click **Publish** (makes it live on the public page instantly)

You can also:
- **Unpublish** — take a chapter back to draft
- **Move up / Move down** — reorder chapters
- **Delete** — permanently remove a chapter

---

## How to change your password

1. Go to Vercel dashboard → your project
2. Click **Settings → Environment Variables**
3. Edit `ADMIN_PASSWORD` → set your new password
4. Redeploy (Vercel → Deployments → Redeploy)

---

## Custom domain (optional, free)

If you buy a domain (e.g. from Namecheap for ~$10/year):
1. Vercel → your project → **Settings → Domains**
2. Add your domain and follow the DNS instructions
3. Done — your site runs on your own domain

---

## Backup your writing

Your chapters are safely stored in Neon's cloud database. 
To export a backup: go to https://console.neon.tech → your project → **SQL Editor** and run:
```sql
SELECT * FROM chapters;
```

---

## Need help?

If anything goes wrong during setup, come back and tell Claude exactly which step failed and what error you see.
