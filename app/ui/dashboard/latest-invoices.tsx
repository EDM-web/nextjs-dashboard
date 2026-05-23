import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { LatestInvoice } from "@/app/lib/definitions";
export default async function LatestInvoices({
  latestInvoices,
}: {
  latestInvoices: LatestInvoice[];
}) {
  return (
    <div className="flex flex-col md:col-span-4 w-full">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex flex-col justify-between bg-gray-50 p-4 rounded-xl grow">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  "flex flex-row justify-between items-center py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm md:text-base truncate">
                      {invoice.name}
                    </p>
                    <p className="hidden sm:block text-gray-500 text-sm">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pt-6 pb-2">
          <ArrowPathIcon className="w-5 h-5 text-gray-500" />
          <h3 className="ml-2 text-gray-500 text-sm">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
