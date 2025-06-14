# 🌱 Organikin

<div align="center">
  <img src="https://via.placeholder.com/150x150/22c55e/ffffff?text=🌱" alt="Organikin Logo" width="150" height="150">
  
  <h3>Solusi Cerdas untuk Daur Ulang Sampah Organik</h3>
  
  <p>Aplikasi berbasis web yang membantu masyarakat mendaur ulang sampah organik dengan mudah melalui sistem penjemputan terjadwal dan konfirmasi admin</p>

  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-13+-black)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6+-green)](https://mongodb.com/)
</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [API Documentation](#-api-documentation)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Proyek

**Organikin** adalah aplikasi web inovatif yang dirancang untuk meningkatkan kesadaran lingkungan dan mempermudah proses pengelolaan limbah organik secara berkelanjutan. Dengan interface yang intuitif dan terinspirasi dari aplikasi Too Good To Go, Organikin menyediakan platform yang memungkinkan masyarakat untuk dengan mudah mengatur penjemputan sampah organik mereka.

### 🌟 Visi & Misi

**Visi:** Menjadi platform terdepan dalam mendukung gaya hidup berkelanjutan melalui pengelolaan sampah organik yang efektif.

**Misi:** Memfasilitasi masyarakat untuk berpartisipasi aktif dalam program daur ulang sampah organik melalui teknologi yang mudah diakses dan user-friendly.

---

## 🚀 Fitur Utama

### 👤 Untuk Pengguna Umum
- **🔐 Autentikasi Aman** - Sistem registrasi dan login yang aman
- **📝 Formulir Permintaan** - Interface mudah untuk mengajukan penjemputan sampah
- **📊 Dashboard Personal** - Melihat riwayat dan status permintaan
- **📱 Responsive Design** - Akses optimal di semua perangkat

### 👨‍💼 Untuk Admin
- **🛠️ Panel Administrasi** - Dashboard khusus untuk mengelola permintaan
- **✅ Sistem Konfirmasi** - Proses persetujuan dan penolakan permintaan
- **📈 Laporan & Statistik** - Monitoring kinerja sistem
- **👥 Manajemen Pengguna** - Kelola data pengguna terdaftar

### 🎨 Desain & UX
- **🌍 Eco-Friendly Design** - Desain yang mencerminkan nilai lingkungan
- **🧭 Navigasi Intuitif** - Struktur menu yang mudah dipahami
- **⚡ Performance Optimized** - Loading cepat dan smooth

---

## 🛠️ Teknologi

### Frontend
- **[Next.js 13+](https://nextjs.org/)** - React framework dengan App Router
- **[React 18+](https://reactjs.org/)** - Library untuk membangun UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend
- **[MongoDB](https://mongodb.com/)** - NoSQL database
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication library
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling

### Tools & Deployment
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

---

## 📦 Instalasi

### Prasyarat
Pastikan Anda memiliki software berikut terinstall:
- **Node.js** (versi 18.0.0 atau lebih baru)
- **npm** atau **yarn**
- **MongoDB** (lokal atau cloud)

### Langkah Instalasi

1. **Clone repositori**
   ```bash
   git clone https://github.com/username/organikin.git
   cd organikin
   ```

2. **Install dependensi**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Konfigurasi Environment Variables**
   
   Buat file `.env.local` di root project:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/organikin
   
   # Authentication
   NEXTAUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Optional: Email Service (untuk notifikasi)
   EMAIL_SERVER=smtp://username:password@smtp.example.com:587
   EMAIL_FROM=noreply@organikin.com
   ```

4. **Setup Database**
   ```bash
   # Pastikan MongoDB berjalan, lalu:
   npm run db:setup
   ```

5. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

6. **Akses aplikasi**
   
   Buka browser dan akses: `http://localhost:3000`

---

## 🎮 Penggunaan

### Untuk Pengguna Baru

1. **Registrasi Account**
   - Klik "Daftar" di halaman utama
   - Isi form dengan data yang valid
   - Verifikasi email (jika diaktifkan)

2. **Ajukan Permintaan Penjemputan**
   - Login ke akun Anda
   - Pilih "Ajukan Penjemputan"
   - Isi detail sampah organik dan alamat
   - Submit permintaan

3. **Pantau Status**
   - Cek dashboard untuk melihat status permintaan
   - Terima notifikasi ketika permintaan diproses

### Untuk Admin

1. **Akses Panel Admin**
   - Login dengan akun admin
   - Akses `/admin` untuk masuk ke dashboard

2. **Kelola Permintaan**
   - Review permintaan yang masuk
   - Approve atau reject berdasarkan kriteria
   - Update status permintaan

---

## 📁 Struktur Proyek

```
organikin/
├── 📁 public/                    # Static assets
│   ├── 🖼️ images/               # Gambar dan logo
│   └── 📄 favicon.ico           # Favicon
├── 📁 src/
│   ├── 📁 app/                  # App Router (Next.js 13+)
│   │   ├── 📁 (auth)/           # Route group untuk autentikasi
│   │   ├── 📁 admin/            # Dashboard admin
│   │   ├── 📁 api/              # API routes
│   │   ├── 📁 dashboard/        # User dashboard
│   │   ├── 📄 layout.tsx        # Root layout
│   │   └── 📄 page.tsx          # Homepage
│   ├── 📁 components/           # Reusable components
│   │   ├── 📁 ui/               # Basic UI components
│   │   ├── 📁 forms/            # Form components
│   │   └── 📁 layout/           # Layout components
│   ├── 📁 lib/                  # Utilities dan konfigurasi
│   │   ├── 📄 mongodb.ts        # Database connection
│   │   ├── 📄 auth.ts           # Auth configuration
│   │   └── 📄 utils.ts          # Helper functions
│   ├── 📁 models/               # Database models
│   └── 📁 types/                # TypeScript definitions
├── 📄 .env.local                # Environment variables
├── 📄 .eslintrc.json           # ESLint configuration
├── 📄 .gitignore               # Git ignore rules
├── 📄 next.config.mjs          # Next.js configuration
├── 📄 package.json             # Dependencies dan scripts
├── 📄 tailwind.config.js       # Tailwind configuration
└── 📄 tsconfig.json            # TypeScript configuration
```

---

## 📚 API Documentation

### Authentication Endpoints

```typescript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/session
```

### User Endpoints

```typescript
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/requests
POST   /api/user/requests
DELETE /api/user/requests/[id]
```

### Admin Endpoints

```typescript
GET  /api/admin/requests
PUT  /api/admin/requests/[id]
GET  /api/admin/users
GET  /api/admin/statistics
```

### Contoh Request

```javascript
// Membuat permintaan penjemputan
const response = await fetch('/api/user/requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    wasteType: 'organic',
    quantity: '5kg',
    address: 'Jl. Contoh No. 123',
    pickupDate: '2024-01-15',
    notes: 'Sampah sayuran dan buah'
  })
});
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Import repository GitHub
   - Set environment variables
   - Deploy

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build dan run
docker build -t organikin .
docker run -p 3000:3000 organikin
```

---

## 🤝 Kontribusi

Kami sangat menghargai kontribusi dari komunitas! Berikut cara untuk berkontribusi:

### 📝 Langkah Kontribusi

1. **Fork** repositori ini
2. **Buat branch** untuk fitur baru (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Buat Pull Request**

### 🐛 Melaporkan Bug

Gunakan [GitHub Issues](https://github.com/username/organikin/issues) untuk melaporkan bug dengan template:

```markdown
**Deskripsi Bug:**
[Jelaskan bug secara singkat]

**Langkah Reproduksi:**
1. Buka halaman...
2. Klik pada...
3. Scroll ke...

**Hasil yang Diharapkan:**
[Apa yang seharusnya terjadi]

**Hasil Aktual:**
[Apa yang benar-benar terjadi]

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]
```

---

## 📄 Lisensi

Proyek ini dilisensikan under **MIT License** - lihat file [LICENSE](LICENSE) untuk detail.

---

## 👥 Tim Pengembang

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/username">
        <img src="https://via.placeholder.com/100x100" width="100px;" alt=""/>
        <br /><sub><b>Nama Developer</b></sub>
      </a>
      <br />
      <a href="#" title="Code">💻</a>
      <a href="#" title="Design">🎨</a>
    </td>
    <!-- Tambahkan anggota tim lainnya -->
  </tr>
</table>

---

## 🙏 Acknowledgments

- Inspirasi desain dari [Too Good To Go](https://toogoodtogo.com/)
- Icons dari [Lucide](https://lucide.dev/)
- Komunitas open source yang mendukung

---

## 📞 Kontak & Support

- **Email:** support@organikin.com
- **GitHub Issues:** [Report Bug](https://github.com/username/organikin/issues)
- **Documentation:** [Wiki](https://github.com/username/organikin/wiki)

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk bumi yang lebih hijau</p>
  <p>© 2024 Organikin. All rights reserved.</p>
</div>
