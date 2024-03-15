# Vedanta Backend

## Setup
1. Buat database
```
CREATE DATABASE db_vedanta;
```
2. Install package
```bash
pnpm install
```
3. Run migration
```bash
pnpm run prisma:deploy
```
4. Lakukan seeding.
	- copy semua teks di `/prisma/seeder.txt`
	- jalankan command SQL
5. Copy .env
```
cp .env.example .env
```
6. Sesuaikan isi .env
```.env
# Contoh JWT Secret
JWT_SECRET="oiadsuHJ874*&2$&(*)(*)#7#^$*&*&poipuIUOIUJKJ)(968757856)"
# Gemini API Key
GEMINI_API_KEY=YOUR_API_KEY_HERE
DATABASE_URL="mysql://root:@localhost:3306/db_vedanta" # Sesuaikan dengan nama database dan username MySQL anda
PUBLIC_APP_URL="https://localhost:3000"
``` 

## Gemini API Key
Dapatkan Gemini API Key di https://aistudio.google.com/app/apikey

## Development Server
```bash
pnpm run dev
```

Buka http://localhost:3000/docs untuk dokumentasi API.