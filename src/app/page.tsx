import DailyCow from "@/components/daily-cow";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DailyCow></DailyCow>
    </div>
  );
}