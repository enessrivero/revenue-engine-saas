import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import {
  AppointmentStatus,
  MessageChannel,
  MessageQueueStatus,
  PatientEventType,
  TreatmentRecommendationStatus,
  TreatmentType,
  UserRole,
} from "../lib/generated/prisma/enums";

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
  const demoClinicName = "Revenic Demo Klinik";

  await prisma.clinic.deleteMany({ where: { name: demoClinicName } });

  const clinic = await prisma.clinic.create({
    data: {
      name: demoClinicName,
      planType: "PRO",
    },
  });

  await prisma.user.create({
    data: {
      email: "admin@revenic.ai",
      role: UserRole.ADMIN,
      clinicId: clinic.id,
    },
  });

  const now = new Date();

  const patientSeeds = [
    {
      firstName: "Ayşe",
      lastName: "Yılmaz",
      phone: "+905551112233",
      ltv: 42_500,
      noShowScore: 0.12,
      totalSessions: 14,
      totalTreatments: 18,
    },
    {
      firstName: "Mehmet",
      lastName: "Kaya",
      phone: "+905552223344",
      ltv: 18_200,
      noShowScore: 0.45,
      totalSessions: 8,
      totalTreatments: 11,
    },
    {
      firstName: "Zeynep",
      lastName: "Demir",
      phone: "+905553334455",
      ltv: 67_800,
      noShowScore: 0.08,
      totalSessions: 22,
      totalTreatments: 31,
    },
    {
      firstName: "Can",
      lastName: "Öztürk",
      phone: "+905554445566",
      ltv: 9_400,
      noShowScore: 0.72,
      totalSessions: 5,
      totalTreatments: 6,
    },
    {
      firstName: "Elif",
      lastName: "Arslan",
      phone: "+905555556677",
      ltv: 31_000,
      noShowScore: 0.28,
      totalSessions: 12,
      totalTreatments: 15,
    },
  ];

  const patients = await Promise.all(
    patientSeeds.map((p) =>
      prisma.patient.create({
        data: {
          ...p,
          clinicId: clinic.id,
        },
      }),
    ),
  );

  const [p0, p1, p2, p3, p4] = patients;

  type ApptSpec = {
    patientId: string;
    daysOffset: number;
    status: (typeof AppointmentStatus)[keyof typeof AppointmentStatus];
    treatments: { name: string; type: (typeof TreatmentType)[keyof typeof TreatmentType]; price: number }[];
  };

  const apptSpecs: ApptSpec[] = [
    {
      patientId: p0.id,
      daysOffset: -52,
      status: AppointmentStatus.COMPLETED,
      treatments: [
        { name: "Kompozit Dolgu", type: TreatmentType.BASIC, price: 3200 },
        { name: "Diş Taşı Temizliği", type: TreatmentType.BASIC, price: 1800 },
      ],
    },
    {
      patientId: p0.id,
      daysOffset: -11,
      status: AppointmentStatus.NO_SHOW,
      treatments: [],
    },
    {
      patientId: p1.id,
      daysOffset: -38,
      status: AppointmentStatus.COMPLETED,
      treatments: [
        { name: "Kanal Tedavisi (1. Seans)", type: TreatmentType.UPSELL, price: 8500 },
      ],
    },
    {
      patientId: p1.id,
      daysOffset: 4,
      status: AppointmentStatus.PENDING,
      treatments: [
        { name: "Kanal Tedavisi (2. Seans)", type: TreatmentType.UPSELL, price: 7500 },
      ],
    },
    {
      patientId: p2.id,
      daysOffset: -25,
      status: AppointmentStatus.COMPLETED,
      treatments: [
        { name: "Kompozit Dolgu", type: TreatmentType.BASIC, price: 3400 },
        { name: "Flor Uygulaması", type: TreatmentType.CROSS_SELL, price: 600 },
      ],
    },
    {
      patientId: p2.id,
      daysOffset: -6,
      status: AppointmentStatus.NO_SHOW,
      treatments: [],
    },
    {
      patientId: p3.id,
      daysOffset: 9,
      status: AppointmentStatus.PENDING,
      treatments: [{ name: "İlk Muayene Paketi", type: TreatmentType.BUNDLE, price: 1200 }],
    },
    {
      patientId: p3.id,
      daysOffset: -60,
      status: AppointmentStatus.COMPLETED,
      treatments: [{ name: "Çekim", type: TreatmentType.BASIC, price: 2500 }],
    },
    {
      patientId: p4.id,
      daysOffset: 14,
      status: AppointmentStatus.PENDING,
      treatments: [
        { name: "Kompozit Dolgu", type: TreatmentType.BASIC, price: 3100 },
      ],
    },
    {
      patientId: p4.id,
      daysOffset: -19,
      status: AppointmentStatus.COMPLETED,
      treatments: [
        { name: "Kanal Tedavisi (1. Seans)", type: TreatmentType.UPSELL, price: 9000 },
        { name: "Geçici Dolgu", type: TreatmentType.BASIC, price: 450 },
      ],
    },
  ];

  const appointments = await Promise.all(
    apptSpecs.map((spec) =>
      prisma.appointment.create({
        data: {
          date: addDays(now, spec.daysOffset),
          status: spec.status,
          patientId: spec.patientId,
          clinicId: clinic.id,
          treatments:
            spec.treatments.length > 0
              ? { create: spec.treatments }
              : undefined,
        },
      }),
    ),
  );

  const futureForWhatsApp = appointments.find(
    (a) => a.status === AppointmentStatus.PENDING && a.patientId === p1.id,
  );

  await prisma.patientEvent.create({
    data: {
      patientId: p0.id,
      eventType: PatientEventType.SMS_OPENED,
      metadata: {
        campaign: "randevu_hatirlatma",
        messageId: "msg_seed_demo_001",
      },
    },
  });

  const waScheduled = addDays(now, -1);
  const waSent = addDays(now, -1);
  waSent.setHours(waSent.getHours() + 1);

  await prisma.messageQueue.create({
    data: {
      patientId: p1.id,
      appointmentId: futureForWhatsApp?.id,
      channel: MessageChannel.WHATSAPP,
      templateId: "tr_appointment_reminder_v2",
      scheduledAt: waScheduled,
      status: MessageQueueStatus.DELIVERED,
      sentAt: waSent,
      responseText: "Tamam, görüşürüz.",
    },
  });

  await prisma.treatmentRecommendation.create({
    data: {
      patientId: p1.id,
      recommendedTreatment: "Kanal tedavisinin tamamlanması (2. seans)",
      triggerTreatment: "Kanal Tedavisi (1. Seans)",
      ruleId: "rule_incomplete_root_canal_14d",
      priorityScore: 88,
      status: TreatmentRecommendationStatus.PENDING,
    },
  });

  console.log("Seed tamamlandı:", {
    clinic: clinic.name,
    patients: patients.length,
    appointments: appointments.length,
  });
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
