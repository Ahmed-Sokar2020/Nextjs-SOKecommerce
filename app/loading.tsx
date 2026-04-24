import Image from "next/image";
// import { getTranslations } from 'next-intl/server'

export default function LoadingPage() {
  // const t = await getTranslations()
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-200">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md">
        {/* Logo */}
        <Image
          src="/icons/logo2.svg"
          alt="Logo"
          width={50}
          height={50}
          className="animate-bounce"
        />

        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

        {/* Text */}
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
