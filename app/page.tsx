"use client";

import { useMemo, useState } from "react";

type AppointmentStatus = "bekliyor" | "koltukta" | "tamamlandi" | "gelmedi";

type Appointment = {
  id: string;
  start: string;
  durationMinutes: number;
  patientName: string;
  phone: string;
  procedure: string;
  doctor: string;
  status: AppointmentStatus;
  /** Hiç randevuya gelmemiş hasta uyarısı */
  hicGelmedi: boolean;
  /** Yarım kalan tedavi: kaçıncı / toplam seans */
  tedaviSeans: { mevcut: number; toplam: number } | null;
};

const KLINIK_ADI = "Smile Diş Polikliniği";

const SLOT_MINUTES = 30;
const GUN_BASI_SAAT = 9;
const GUN_SONU_SAAT = 18;
const SLOT_HEIGHT_PX = 52;

function parseTimeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function minutesFromDayStart(time: string): number {
  const mins = parseTimeToMinutes(time);
  return mins - GUN_BASI_SAAT * 60;
}

function formatSaat(dakika: number): string {
  const h = Math.floor(dakika / 60);
  const m = dakika % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function bitisSaati(start: string, durationMinutes: number): string {
  const startM = parseTimeToMinutes(start);
  return formatSaat(startM + durationMinutes);
}

const baslangicVerisi: Appointment[] = [
  {
    id: "1",
    start: "09:00",
    durationMinutes: 30,
    patientName: "Mehmet Yılmaz",
    phone: "+90 532 111 2233",
    procedure: "İlk muayene",
    doctor: "Dr. Elif Kaya",
    status: "bekliyor",
    hicGelmedi: true,
    tedaviSeans: null,
  },
  {
    id: "2",
    start: "09:30",
    durationMinutes: 60,
    patientName: "Ayşe Demir",
    phone: "+90 533 444 5566",
    procedure: "Kompozit dolgu",
    doctor: "Dr. Burak Öztürk",
    status: "koltukta",
    hicGelmedi: false,
    tedaviSeans: { mevcut: 2, toplam: 4 },
  },
  {
    id: "3",
    start: "10:45",
    durationMinutes: 45,
    patientName: "Can Arslan",
    phone: "+90 534 777 8899",
    procedure: "Diş taşı temizliği",
    doctor: "Dr. Elif Kaya",
    status: "bekliyor",
    hicGelmedi: false,
    tedaviSeans: null,
  },
  {
    id: "4",
    start: "11:45",
    durationMinutes: 30,
    patientName: "Zeynep Çelik",
    phone: "+90 535 000 1122",
    procedure: "Kontrol (implant)",
    doctor: "Dr. Burak Öztürk",
    status: "tamamlandi",
    hicGelmedi: false,
    tedaviSeans: { mevcut: 3, toplam: 3 },
  },
  {
    id: "5",
    start: "12:30",
    durationMinutes: 90,
    patientName: "Emre Şahin",
    phone: "+90 536 333 4455",
    procedure: "Kanal tedavisi",
    doctor: "Dr. Elif Kaya",
    status: "bekliyor",
    hicGelmedi: false,
    tedaviSeans: { mevcut: 1, toplam: 3 },
  },
  {
    id: "6",
    start: "14:30",
    durationMinutes: 30,
    patientName: "Selin Koç",
    phone: "+90 537 666 7788",
    procedure: "Çocuk dolgusu",
    doctor: "Dr. Burak Öztürk",
    status: "gelmedi",
    hicGelmedi: false,
    tedaviSeans: null,
  },
  {
    id: "7",
    start: "15:15",
    durationMinutes: 45,
    patientName: "Burak Aydın",
    phone: "+90 538 999 0011",
    procedure: "Protez ölçü",
    doctor: "Dr. Elif Kaya",
    status: "bekliyor",
    hicGelmedi: false,
    tedaviSeans: null,
  },
  {
    id: "8",
    start: "16:30",
    durationMinutes: 60,
    patientName: "Deniz Yurt",
    phone: "+90 539 222 3344",
    procedure: "Estetik beyazlatma",
    doctor: "Dr. Burak Öztürk",
    status: "bekliyor",
    hicGelmedi: true,
    tedaviSeans: { mevcut: 2, toplam: 5 },
  },
];

function durumEtiket(status: AppointmentStatus): string {
  switch (status) {
    case "bekliyor":
      return "Bekliyor";
    case "koltukta":
      return "Koltuğa Alındı";
    case "tamamlandi":
      return "Tamamlandı";
    case "gelmedi":
      return "Gelmedi";
  }
}

function durumRenkleri(status: AppointmentStatus): {
  kart: string;
  kenar: string;
  rozet: string;
} {
  switch (status) {
    case "bekliyor":
      return {
        kart: "bg-blue-500/90 text-white",
        kenar: "ring-blue-400/50",
        rozet: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
      };
    case "koltukta":
      return {
        kart: "bg-emerald-500/90 text-white",
        kenar: "ring-emerald-400/50",
        rozet: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
      };
    case "tamamlandi":
      return {
        kart: "bg-amber-400/95 text-amber-950",
        kenar: "ring-amber-300/60",
        rozet: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
      };
    case "gelmedi":
      return {
        kart: "bg-red-500/90 text-white",
        kenar: "ring-red-400/50",
        rozet: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
      };
  }
}

export default function Home() {
  const [randevular, setRandevular] = useState<Appointment[]>(baslangicVerisi);
  const [seciliId, setSeciliId] = useState<string | null>("2");
  const [arama, setArama] = useState("");

  const bugunMetni = useMemo(
    () =>
      new Date().toLocaleDateString("tr-TR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [],
  );

  const filtreli = useMemo(() => {
    const q = arama.trim().toLowerCase();
    if (!q) return randevular;
    return randevular.filter(
      (r) =>
        r.patientName.toLowerCase().includes(q) ||
        r.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")),
    );
  }, [randevular, arama]);

  const siraliListe = useMemo(
    //
    () => [...filtreli].sort((a, b) => a.start.localeCompare(b.start)),
    [filtreli],
  );

  const istatistik = useMemo(() => {
    const toplam = randevular.length;
    const bekliyor = randevular.filter((r) => r.status === "bekliyor").length;
    const gelmedi = randevular.filter((r) => r.status === "gelmedi").length;
    return { toplam, bekliyor, gelmedi };
  }, [randevular]);

  const secili = seciliId
    ? randevular.find((r) => r.id === seciliId) ?? null
    : null;

  const slotSayisi =
    ((GUN_SONU_SAAT - GUN_BASI_SAAT) * 60) / SLOT_MINUTES;
  const takvimYukseklik = slotSayisi * SLOT_HEIGHT_PX;

  const saatEtiketleri = useMemo(() => {
    const arr: string[] = [];
    for (let i = 0; i < slotSayisi; i++) {
      const m = GUN_BASI_SAAT * 60 + i * SLOT_MINUTES;
      arr.push(formatSaat(m));
    }
    return arr;
  }, [slotSayisi]);

  function durumGuncelle(id: string, status: AppointmentStatus) {
    setRandevular((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex h-screen min-h-[640px] flex-col lg:flex-row">
        {/* Sol: randevu listesi */}
        <aside className="flex w-full shrink-0 flex-col border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:h-full lg:w-[340px] lg:border-b-0 lg:border-r">
          <div className="border-b border-zinc-100 p-4 dark:border-zinc-800">
            <h1 className="text-lg font-semibold tracking-tight text-teal-700 dark:text-teal-400">
              {KLINIK_ADI}
            </h1>
            <p className="mt-1 capitalize text-sm text-zinc-500 dark:text-zinc-400">
              {bugunMetni}
            </p>
            <label className="sr-only" htmlFor="hasta-ara">
              Hasta ara
            </label>
            <input
              id="hasta-ara"
              type="search"
              value={arama}
              onChange={(e) => setArama(e.target.value)}
              placeholder="Hasta ara (isim veya telefon)…"
              className="mt-3 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none ring-teal-500/30 placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
            <div className="rounded-lg bg-zinc-50 px-2 py-2 text-center dark:bg-zinc-800/80">
              <div className="text-xs text-zinc-500">Toplam</div>
              <div className="text-lg font-semibold tabular-nums">
                {istatistik.toplam}
              </div>
            </div>
            <div className="rounded-lg bg-blue-50 px-2 py-2 text-center dark:bg-blue-950/40">
              <div className="text-xs text-blue-600 dark:text-blue-300">
                Bekliyor
              </div>
              <div className="text-lg font-semibold tabular-nums text-blue-700 dark:text-blue-200">
                {istatistik.bekliyor}
              </div>
            </div>
            <div className="rounded-lg bg-red-50 px-2 py-2 text-center dark:bg-red-950/40">
              <div className="text-xs text-red-600 dark:text-red-300">
                Gelmedi
              </div>
              <div className="text-lg font-semibold tabular-nums text-red-700 dark:text-red-300">
                {istatistik.gelmedi}
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
            <ul className="space-y-2">
              {siraliListe.map((r) => {
                const { rozet } = durumRenkleri(r.status);
                const sec = r.id === seciliId;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setSeciliId(r.id)}
                      className={`flex w-full flex-col gap-1 rounded-xl border px-3 py-2.5 text-left transition ${
                        sec
                          ? "border-teal-500 bg-teal-50 shadow-sm ring-1 ring-teal-500/30 dark:border-teal-500 dark:bg-teal-950/30"
                          : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                          {r.start} — {bitisSaati(r.start, r.durationMinutes)}
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${rozet}`}
                        >
                          {durumEtiket(r.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                          {r.patientName}
                        </span>
                        {r.hicGelmedi && (
                          <span
                            className="inline-flex items-center rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold text-white"
                            title="Daha önce randevuya gelmemiş hasta"
                          >
                            Uyarı
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {r.procedure}
                      </p>
                      {r.tedaviSeans && r.tedaviSeans.mevcut < r.tedaviSeans.toplam && (
                        <div className="mt-1">
                          <div className="mb-0.5 flex justify-between gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                            <span>Tedavi</span>
                            <span>
                              {r.tedaviSeans.mevcut}/{r.tedaviSeans.toplam} seans
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                            <div
                              className="h-full rounded-full bg-teal-500 transition-all"
                              style={{
                                width: `${Math.min(100, (r.tedaviSeans.mevcut / r.tedaviSeans.toplam) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-zinc-100 p-3 dark:border-zinc-800">
            <button
              type="button"
              className="w-full rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 active:bg-teal-700"
            >
              Yeni Randevu
            </button>
          </div>
        </aside>

        {/* Orta: günlük takvim */}
        <section className="min-h-[280px] flex-1 overflow-hidden p-3 lg:min-h-0 lg:p-4">
          <div className="flex h-full min-h-0 flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
              <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Günlük takvim
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                09:00 – 18:00 · 30 dk aralıklar
              </p>
            </div>
            <div className="min-h-0 flex-1 overflow-auto">
              <div className="flex">
                <div
                  className="shrink-0 border-r border-zinc-100 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950/50"
                  style={{ width: 56 }}
                >
                  {saatEtiketleri.map((t) => (
                    <div
                      key={t}
                      className="flex items-start justify-end pr-2 text-[11px] font-medium tabular-nums text-zinc-400"
                      style={{ height: SLOT_HEIGHT_PX, paddingTop: 4 }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <div
                  className="relative min-w-[280px] flex-1"
                  style={{ minHeight: takvimYukseklik }}
                >
                  {saatEtiketleri.map((t) => (
                    <div
                      key={`g-${t}`}
                      className="border-b border-dashed border-zinc-100 dark:border-zinc-800/80"
                      style={{ height: SLOT_HEIGHT_PX }}
                    />
                  ))}
                  {randevular.map((r) => {
                    const fromStart = minutesFromDayStart(r.start);
                    if (fromStart < 0) return null;
                    const top = (fromStart / SLOT_MINUTES) * SLOT_HEIGHT_PX;
                    const height =
                      (r.durationMinutes / SLOT_MINUTES) * SLOT_HEIGHT_PX;
                    const { kart, kenar } = durumRenkleri(r.status);
                    const sec = r.id === seciliId;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSeciliId(r.id)}
                        style={{ top, height: Math.max(height - 4, 28), left: 8, right: 8 }}
                        className={`absolute flex flex-col gap-0.5 overflow-hidden rounded-lg px-2 py-1.5 text-left text-xs shadow-md ring-1 transition hover:brightness-105 ${kart} ${kenar} ${sec ? "ring-2 ring-teal-400 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900" : ""}`}
                      >
                        <span className="truncate font-semibold">
                          {r.patientName}
                          {r.hicGelmedi && (
                            <span className="ml-1 inline-block h-2 w-2 shrink-0 rounded-full bg-red-200 ring-1 ring-red-800/30" />
                          )}
                        </span>
                        <span className="truncate opacity-90">{r.procedure}</span>
                        <span className="tabular-nums opacity-80">
                          {r.start} – {bitisSaati(r.start, r.durationMinutes)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sağ: detay */}
        <aside className="w-full shrink-0 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:h-full lg:w-[320px] lg:border-l lg:border-t-0">
          <div className="flex h-full flex-col">
            <div className="border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
              <h2 className="text-sm font-semibold">Randevu detayı</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {!secili ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Detay görmek için listeden veya takvimden bir randevu seçin.
                </p>
              ) : (
                <div className="space-y-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                        {secili.patientName}
                      </h3>
                      {secili.hicGelmedi && (
                        <span className="rounded-md bg-red-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                          Hiç gelmemiş
                        </span>
                      )}
                    </div>
                    <a
                      href={`tel:${secili.phone.replace(/\s/g, "")}`}
                      className="mt-1 inline-flex text-sm font-medium text-teal-600 hover:underline dark:text-teal-400"
                    >
                      {secili.phone}
                    </a>
                  </div>

                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        İşlem
                      </dt>
                      <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">
                        {secili.procedure}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        Doktor
                      </dt>
                      <dd className="mt-0.5 text-zinc-800 dark:text-zinc-200">
                        {secili.doctor}
                      </dd>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                          Saat
                        </dt>
                        <dd className="mt-0.5 tabular-nums font-medium text-zinc-900 dark:text-zinc-100">
                          {secili.start} –{" "}
                          {bitisSaati(secili.start, secili.durationMinutes)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                          Süre
                        </dt>
                        <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">
                          {secili.durationMinutes} dk
                        </dd>
                      </div>
                    </div>
                  </dl>

                  {secili.tedaviSeans && (
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                        <span>Tedavi süreci</span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {secili.tedaviSeans.mevcut}/{secili.tedaviSeans.toplam}{" "}
                          seans
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                        <div
                          className="h-full rounded-full bg-teal-500 transition-all"
                          style={{
                            width: `${Math.min(100, (secili.tedaviSeans.mevcut / secili.tedaviSeans.toplam) * 100)}%`,
                          }}
                        />
                      </div>
                      {secili.tedaviSeans.mevcut >= secili.tedaviSeans.toplam ? (
                        <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                          Tedavi planı tamamlandı.
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-zinc-500">
                          Kalan:{" "}
                          {secili.tedaviSeans.toplam - secili.tedaviSeans.mevcut}{" "}
                          seans
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="button"
                      disabled={secili.status === "koltukta"}
                      onClick={() => durumGuncelle(secili.id, "koltukta")}
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Koltuğa Al
                    </button>
                    <button
                      type="button"
                      disabled={secili.status === "tamamlandi"}
                      onClick={() => durumGuncelle(secili.id, "tamamlandi")}
                      className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-amber-950 shadow-sm hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Tamamlandı
                    </button>
                    <button
                      type="button"
                      disabled={secili.status === "gelmedi"}
                      onClick={() => durumGuncelle(secili.id, "gelmedi")}
                      className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200 dark:hover:bg-red-950 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Gelmedi
                    </button>
                    {secili.status === "gelmedi" && (
                      <button
                        type="button"
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                      >
                        Tekrar Davet Et
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
