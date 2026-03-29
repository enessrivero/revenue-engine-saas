export type TedaviDurum = "tamamlandi" | "yarim" | "iptal";

export type TedaviKaydi = {
  tarih: string;
  islem: string;
  doktor: string;
  ucret: number;
  durum: TedaviDurum;
};

export type HastaProfil = {
  id: string;
  ad: string;
  telefon: string;
  /** ISO yyyy-mm-dd */
  dogumTarihi: string;
  toplamHarcama: number;
  toplamSeans: number;
  noShowSayisi: number;
  tedaviler: TedaviKaydi[];
  /** ISO yyyy-mm-dd önerilen recall */
  sonrakiKontrolTarihi: string;
  sonIslemAdi: string;
  /** ISO yyyy-mm-dd */
  sonIslemTarihi: string;
  noShowTarihleri: string[];
  kayipGelirTahmini: number;
};

export const hastaProfilleri: Record<string, HastaProfil> = {
  "1": {
    id: "1",
    ad: "Mehmet Yılmaz",
    telefon: "+90 532 111 2233",
    dogumTarihi: "1988-05-14",
    toplamHarcama: 4200,
    toplamSeans: 3,
    noShowSayisi: 2,
    tedaviler: [
      {
        tarih: "2026-01-10",
        islem: "İlk muayene + panoramik röntgen",
        doktor: "Dr. Elif Kaya",
        ucret: 850,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-02-05",
        islem: "Derin temizlik",
        doktor: "Dr. Elif Kaya",
        ucret: 1200,
        durum: "iptal",
      },
      {
        tarih: "2026-03-01",
        islem: "Kompleks dolgu (16)",
        doktor: "Dr. Burak Öztürk",
        ucret: 2150,
        durum: "tamamlandi",
      },
    ],
    sonrakiKontrolTarihi: "2026-04-28",
    sonIslemAdi: "Kompleks dolgu (16)",
    sonIslemTarihi: "2026-03-01",
    noShowTarihleri: ["2025-11-18", "2026-02-05"],
    kayipGelirTahmini: 2100,
  },
  "2": {
    id: "2",
    ad: "Ayşe Demir",
    telefon: "+90 533 444 5566",
    dogumTarihi: "1992-11-22",
    toplamHarcama: 8900,
    toplamSeans: 8,
    noShowSayisi: 0,
    tedaviler: [
      {
        tarih: "2025-09-03",
        islem: "Muayene",
        doktor: "Dr. Burak Öztürk",
        ucret: 400,
        durum: "tamamlandi",
      },
      {
        tarih: "2025-10-12",
        islem: "Kompozit dolgu — 1. seans",
        doktor: "Dr. Burak Öztürk",
        ucret: 2200,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-01-20",
        islem: "Kompozit dolgu — 2. seans",
        doktor: "Dr. Burak Öztürk",
        ucret: 2200,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-03-15",
        islem: "Kompozit dolgu — 3. seans (devam)",
        doktor: "Dr. Burak Öztürk",
        ucret: 2100,
        durum: "yarim",
      },
    ],
    sonrakiKontrolTarihi: "2026-04-12",
    sonIslemAdi: "Kompozit dolgu — 3. seans (devam)",
    sonIslemTarihi: "2026-03-15",
    noShowTarihleri: [],
    kayipGelirTahmini: 0,
  },
  "3": {
    id: "3",
    ad: "Can Arslan",
    telefon: "+90 534 777 8899",
    dogumTarihi: "1985-03-08",
    toplamHarcama: 15600,
    toplamSeans: 14,
    noShowSayisi: 1,
    tedaviler: [
      {
        tarih: "2025-06-02",
        islem: "İmplant cerrahisi",
        doktor: "Dr. Burak Öztürk",
        ucret: 8500,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-02-28",
        islem: "Diş taşı temizliği",
        doktor: "Dr. Elif Kaya",
        ucret: 1400,
        durum: "tamamlandi",
      },
    ],
    sonrakiKontrolTarihi: "2026-08-28",
    sonIslemAdi: "Diş taşı temizliği",
    sonIslemTarihi: "2026-02-28",
    noShowTarihleri: ["2025-12-10"],
    kayipGelirTahmini: 950,
  },
  "4": {
    id: "4",
    ad: "Zeynep Çelik",
    telefon: "+90 535 000 1122",
    dogumTarihi: "1979-07-30",
    toplamHarcama: 45200,
    toplamSeans: 22,
    noShowSayisi: 0,
    tedaviler: [
      {
        tarih: "2025-04-10",
        islem: "İmplant yerleştirme",
        doktor: "Dr. Burak Öztürk",
        ucret: 18000,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-01-08",
        islem: "Geçici protez ayarı",
        doktor: "Dr. Burak Öztürk",
        ucret: 3200,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-03-22",
        islem: "İmplant kontrol",
        doktor: "Dr. Burak Öztürk",
        ucret: 0,
        durum: "tamamlandi",
      },
    ],
    sonrakiKontrolTarihi: "2026-06-22",
    sonIslemAdi: "İmplant kontrol",
    sonIslemTarihi: "2026-03-22",
    noShowTarihleri: [],
    kayipGelirTahmini: 0,
  },
  "5": {
    id: "5",
    ad: "Emre Şahin",
    telefon: "+90 536 333 4455",
    dogumTarihi: "1996-01-19",
    toplamHarcama: 5400,
    toplamSeans: 4,
    noShowSayisi: 1,
    tedaviler: [
      {
        tarih: "2026-02-14",
        islem: "Kanal tedavisi — başlangıç",
        doktor: "Dr. Elif Kaya",
        ucret: 2800,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-03-10",
        islem: "Kanal tedavisi — devam",
        doktor: "Dr. Elif Kaya",
        ucret: 2600,
        durum: "yarim",
      },
    ],
    sonrakiKontrolTarihi: "2026-04-05",
    sonIslemAdi: "Kanal tedavisi — devam",
    sonIslemTarihi: "2026-03-10",
    noShowTarihleri: ["2026-01-05"],
    kayipGelirTahmini: 1800,
  },
  "6": {
    id: "6",
    ad: "Selin Koç",
    telefon: "+90 537 666 7788",
    dogumTarihi: "2016-09-02",
    toplamHarcama: 2800,
    toplamSeans: 5,
    noShowSayisi: 3,
    tedaviler: [
      {
        tarih: "2025-10-20",
        islem: "Çocuk muayenesi",
        doktor: "Dr. Burak Öztürk",
        ucret: 350,
        durum: "tamamlandi",
      },
      {
        tarih: "2025-12-02",
        islem: "Çocuk dolgusu (74)",
        doktor: "Dr. Burak Öztürk",
        ucret: 1200,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-03-20",
        islem: "Kontrol + florür",
        doktor: "Dr. Burak Öztürk",
        ucret: 450,
        durum: "iptal",
      },
    ],
    sonrakiKontrolTarihi: "2026-04-18",
    sonIslemAdi: "Çocuk dolgusu (74)",
    sonIslemTarihi: "2025-12-02",
    noShowTarihleri: ["2025-08-14", "2026-01-22", "2026-03-20"],
    kayipGelirTahmini: 3350,
  },
  "7": {
    id: "7",
    ad: "Burak Aydın",
    telefon: "+90 538 999 0011",
    dogumTarihi: "1990-12-05",
    toplamHarcama: 6800,
    toplamSeans: 6,
    noShowSayisi: 0,
    tedaviler: [
      {
        tarih: "2026-03-08",
        islem: "Protez ölçü — üst çene",
        doktor: "Dr. Elif Kaya",
        ucret: 3200,
        durum: "yarim",
      },
      {
        tarih: "2026-02-15",
        islem: "Geçici protez uygulama",
        doktor: "Dr. Elif Kaya",
        ucret: 3600,
        durum: "tamamlandi",
      },
    ],
    sonrakiKontrolTarihi: "2026-04-02",
    sonIslemAdi: "Protez ölçü — üst çene",
    sonIslemTarihi: "2026-03-08",
    noShowTarihleri: [],
    kayipGelirTahmini: 0,
  },
  "8": {
    id: "8",
    ad: "Deniz Yurt",
    telefon: "+90 539 222 3344",
    dogumTarihi: "2001-04-17",
    toplamHarcama: 12400,
    toplamSeans: 7,
    noShowSayisi: 4,
    tedaviler: [
      {
        tarih: "2025-11-05",
        islem: "Ofis tipi beyazlatma — 1. seans",
        doktor: "Dr. Burak Öztürk",
        ucret: 4500,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-02-02",
        islem: "Ofis tipi beyazlatma — 2. seans",
        doktor: "Dr. Burak Öztürk",
        ucret: 4200,
        durum: "tamamlandi",
      },
      {
        tarih: "2026-03-12",
        islem: "Ev tipi beyazlatma takibi",
        doktor: "Dr. Burak Öztürk",
        ucret: 3700,
        durum: "yarim",
      },
    ],
    sonrakiKontrolTarihi: "2026-04-15",
    sonIslemAdi: "Ev tipi beyazlatma takibi",
    sonIslemTarihi: "2026-03-12",
    noShowTarihleri: ["2025-09-09", "2025-10-21", "2025-12-03", "2026-01-30"],
    kayipGelirTahmini: 6200,
  },
};

export function hastaProfilAl(id: string | undefined): HastaProfil | null {
  if (!id) return null;
  return hastaProfilleri[id] ?? null;
}
