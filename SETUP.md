# Meme Generator Setup

## Dependencies yang sudah terinstall

- `@gorhom/bottom-sheet@^4` - untuk bottom sheet tools (versi 4 untuk kompatibilitas)
- `react-native-image-picker` - untuk memilih gambar dari gallery
- `react-native-gesture-handler` - untuk gesture zoom dan pan
- `react-native-reanimated` - untuk smooth animations

## Cara Menjalankan

### Android

```bash
npm run android
# atau
yarn android
```

### iOS

```bash
cd ios && pod install && cd ..
npm run ios
# atau
yarn ios
```

## Fitur yang Tersedia

### 🎨 Canvas Interaktif

- **Background abu-abu** dengan canvas putih di tengah
- **Pinch to zoom**: Cubit dengan 2 jari untuk zoom in/out (1x sampai 3x)
- **Pan gesture**: Geser dengan 1 jari ketika canvas ter-zoom
- **Smooth animations**: Semua gerakan menggunakan spring animation
- **Boundary constraints**: Canvas tidak bisa digeser keluar batas

### 🛠️ Tools

- **Button Tools** di pojok kanan atas
- **Bottom Sheet** dengan pilihan tools
- **Upload Image** - membuka gallery untuk memilih gambar
- **Canvas overlay** - gambar yang dipilih akan ditampilkan di canvas

### 📱 Cara Penggunaan

1. Tap tombol **"🛠️ Tools"** di pojok kanan atas
2. Pilih **"📷 Upload Image"** dari bottom sheet
3. Pilih gambar dari gallery
4. Gambar akan ditampilkan di canvas
5. Gunakan **pinch to zoom** dan **pan gesture** untuk navigasi
6. Canvas akan reset zoom ketika gambar baru dipilih

## Konfigurasi Permissions

### Android

- `READ_EXTERNAL_STORAGE` permission sudah ditambahkan di AndroidManifest.xml

### iOS

- `NSPhotoLibraryUsageDescription` permission sudah ditambahkan di Info.plist

## Troubleshooting

### Jika gesture tidak berfungsi:

1. Pastikan `react-native-gesture-handler` sudah diimport di index.js
2. Restart aplikasi setelah install dependencies

### Jika image picker tidak berfungsi:

1. Pastikan permissions sudah ditambahkan
2. Test di device fisik (bukan emulator untuk iOS)
3. Restart aplikasi setelah mengubah permissions

### Jika bottom sheet tidak muncul:

1. Pastikan `BottomSheetModalProvider` sudah ditambahkan di App.tsx
2. Pastikan gesture handler sudah dikonfigurasi dengan benar
