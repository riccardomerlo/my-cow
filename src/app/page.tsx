import DailyCow from "@/components/daily-cow";

// export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DailyCow></DailyCow>
    </div>
  );
}

export const metadata = {
  metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mucca',
    description: 'Mucca of the día',
    url: process.env.URL ?? 'http://localhost:3000',
    siteName: 'Mucca'
  },
}