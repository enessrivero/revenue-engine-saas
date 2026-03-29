import Link from "next/link";
import {
  type HastaProfil,
  type TedaviDurum,
  hastaProfilAl,
} from "@/lib/hasta-profilleri";

const para = (n: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(n);

const tarihUzun = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function yasHesapla(dogumIso: string): number {
  const dogum = new Date(dogumIso + "T12:00:00");
  const bugun = new Date();
  let yas = bugun.getFullYear() - dogum.getFullYear();
  const ay = bugun.getMonth() - dogum.getMonth();
  if (ay < 0 || (ay === 0 && bugun.getDate() < dogum.getDate())) yas--;
  return yas;
}

function gecenSureMetni(bitisIso: string): string {
  const bitis = new Date(bitisIso + "T12:00:00");
  const bugun = new Date();
  const gun = Math.floor((bugun.getTime() - bitis.getTime()) / (1000 * 60 * 60 * 24));
  if (gun <= 0) return "Bugün";
  if (gun === 1) return "1 gün önce";
  if (gun < 30) return `${gun} gün önce`;
  const ay = Math.floor(gun / 30);
  if (ay === 1) return "Yaklaşık 1 ay önce";
  if (ay < 12) return `Yaklaşık ${ay} ay önce`;
  const yil = Math.floor(ay / 12);
  if (yil === 1) return "Yaklaşık 1 yıl önce";
  return `Yaklaşık ${yil} yıl önce`;
}

function durumEtiket(d: TedaviDurum): string {
  switch (d) {
    case "tamamlandi":
      return "Tamamlandı";
    case "yarim":
      return "Yarım Kaldı";
    case "iptal":
      return "İptal";
  }
}

function durumRozet(d: TedaviDurum): string {
  switch (d) {
    case "tamamlandi":
      return "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100";
    case "yarim":
      return "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100";
    case "iptal":
      return "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200";
  }
}

function HastaDetay({ hasta }: { hasta: HastaProfil }) {
  const yas = yasHesapla(hasta.dogumTarihi);
  const tedavilerSirali = [...hasta.tedaviler].sort((a, b) =>
    a.tarih < b.tarih ? 1 : a.tarih > b.tarih ? -1 : 0,
  );

  const gecenSure = gecenSureMetni(hasta.sonIslemTarihi);

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-teal-700 dark:hover:bg-teal-950/50 dark:hover:text-teal-200"
          >
            ← Ana sayfaya dön
          </Link>
        </div>

        <header className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {hasta.ad}
          </h1>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-zinc-500 dark:text-zinc-400">Telefon: </span>
                <a
                  href={`tel:${hasta.telefon.replace(/\s/g, "")}`}
                  className="font-medium text-teal-700 hover:underline dark:text-teal-400"
                >
                  {hasta.telefon}
                </a>
              </p>
              <p>
                <span className="text-zinc-500 dark:text-zinc-400">Doğum tarihi: </span>
                <span className="font-medium">{tarihUzun(hasta.dogumTarihi)}</span>
              </p>
              <p>
                <span className="text-zinc-500 dark:text-zinc-400">Yaş: </span>
                <span className="font-medium tabular-nums">{yas}</span>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/80">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Toplam harcama</div>
                <div className="mt-1 text-lg font-semibold tabular-nums text-teal-800 dark:text-teal-300">
                  {para(hasta.toplamHarcama)}
                </div>
              </div>
              <div className="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/80">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Toplam seans</div>
                <div className="mt-1 text-lg font-semibold tabular-nums">
                  {hasta.toplamSeans}
                </div>
              </div>
              <div className="rounded-xl bg-red-50 px-4 py-3 dark:bg-red-950/30">
                <div className="text-xs text-red-600 dark:text-red-300">No-show</div>
                <div className="mt-1 text-lg font-semibold tabular-nums text-red-800 dark:text-red-200">
                  {hasta.noShowSayisi}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Tedavi geçmişi
          </h2>
          <ul className="mt-4 space-y-4">
            {tedavilerSirali.map((t, i) => (
              <li
                key={`${t.tarih}-${t.islem}-${i}`}
                className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-800/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      {tarihUzun(t.tarih)}
                    </p>
                    <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
                      {t.islem}
                    </p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {t.doktor} ·{" "}
                      <span className="tabular-nums font-medium">{para(t.ucret)}</span>
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${durumRozet(t.durum)}`}
                  >
                    {durumEtiket(t.durum)}
                  </span>
                </div>
                {t.durum === "yarim" && (
                  <div className="mt-3 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/60 dark:bg-red-950/40 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-red-900 dark:text-red-100">
                      Bu tedavi tamamlanmadı — hastanın devam etmesi önerilir.
                    </p>
                    <button
                      type="button"
                      className="shrink-0 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                      Geri Getir
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Hatırlatma ve recall
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-4 dark:border-teal-900/50 dark:bg-teal-950/30">
              <dt className="text-xs font-medium uppercase tracking-wide text-teal-800 dark:text-teal-300">
                Önerilen sonraki kontrol
              </dt>
              <dd className="mt-2 text-lg font-semibold text-teal-950 dark:text-teal-100">
                {tarihUzun(hasta.sonrakiKontrolTarihi)}
              </dd>
            </div>
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/60">
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Son yapılan işlem
              </dt>
              <dd className="mt-2 font-semibold text-zinc-900 dark:text-zinc-50">
                {hasta.sonIslemAdi}
              </dd>
              <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                ({tarihUzun(hasta.sonIslemTarihi)} — {gecenSure})
              </dd>
            </div>
          </dl>
          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 sm:w-auto sm:px-8"
          >
            Hatırlatma Gönder
          </button>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            No-show geçmişi
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Bu hasta <span className="font-semibold text-zinc-900 dark:text-zinc-100">{hasta.noShowSayisi} kez</span>{" "}
            randevuya gelmedi.
          </p>
          {hasta.noShowTarihleri.length > 0 ? (
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              {hasta.noShowTarihleri.map((d) => (
                <li key={d}>{tarihUzun(d)}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-400">
              Kayıtlı no-show tarihi yok.
            </p>
          )}
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-800 dark:text-amber-200">
              Tahmini kaybedilen gelir
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums text-amber-950 dark:text-amber-100">
              {para(hasta.kayipGelirTahmini)}
            </p>
            <p className="mt-1 text-xs text-amber-900/80 dark:text-amber-200/80">
              İptal veya gelinmeyen seanslara göre yaklaşık tutar (KDV dahil değil).
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default async function HastaProfilPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const raw = id?.trim();

  if (raw) {
    const hasta = hastaProfilAl(raw);
    if (!hasta) {
      return (
        <main className="min-h-screen bg-zinc-100 px-4 py-16 text-center dark:bg-zinc-950">
          <p className="text-zinc-600 dark:text-zinc-400">Hasta bulunamadı.</p>
          <Link
            href="/"
            className="mt-4 inline-block font-semibold text-teal-600 hover:underline dark:text-teal-400"
          >
            Ana sayfaya dön
          </Link>
        </main>
      );
    }
    return <HastaDetay hasta={hasta} />;
  }

  const varsayilan = hastaProfilAl("2")!;
  return <HastaDetay hasta={varsayilan} />;
}
