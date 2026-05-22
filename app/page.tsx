import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Styles from "./ui/home.module.css";
import { lusitana } from "./ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex flex-col p-6 min-h-screen">
      <div className="flex items-end bg-blue-500 p-4 rounded-lg h-20 md:h-52 shrink-0">
        <AcmeLogo />
      </div>
      <div className="flex md:flex-row flex-col gap-4 mt-4 grow">
        <div className="flex flex-col justify-center gap-6 bg-gray-50 px-6 md:px-20 py-10 rounded-lg md:w-2/5">
          <div className={Styles.shape} />
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal `}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center self-start gap-5 bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-lg font-medium text-white text-sm md:text-base transition-colors"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex justify-center items-center p-6 md:px-28 md:py-12 md:w-3/5">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={10000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            alt="Screenshots of the dashboard project showing moblie version"
            className="md:hidden block"
          />
        </div>
      </div>
    </main>
  );
}
