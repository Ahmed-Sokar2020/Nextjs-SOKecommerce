// "use client";

// import { Button } from "@/components/ui/button";

// export default function NotFound() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen ">
//       <div className="p-6 rounded-lg shadow-md w-1/3 text-center">
//         <h1 className="text-3xl font-bold mb-4">Not Found</h1>
//         <p className="text-destructive">Could not find requested resource</p>
//         <Button
//           variant="outline"
//           className="mt-4 ml-2"
//           onClick={() => (window.location.href = "/")}
//         >
//           Back to home
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-200 px-4">
      <div className="flex flex-col items-center text-center gap-6 p-10 rounded-2xl shadow-xl bg-white/70 backdrop-blur-md max-w-md w-full">
        {/* Icon */}
        <div className="p-4 rounded-full bg-red-100">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
