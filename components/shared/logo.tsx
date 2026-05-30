// import { Link } from "@/i18n/navigation";
// import { APP_NAME } from "@/lib/constants";
// import Image from "next/image";

// const Logo = () => {
//   return (
//     <div>
//       <Link href="/">
//         <Image
//           className="w-10 h-auto"
//           src="/icons/logo2.svg"
//           width={100}
//           height={100}
//           alt={`${APP_NAME} logo`}
//           priority
//         />
//       </Link>
//     </div>
//   );
// };

// export default Logo;

// interface LogoProps {
//   className?: string;
//   height?: number;
// }

// export default function Logo({ className, height = 28 }: LogoProps) {
//   // Proportions map perfectly to a standard 140x35 layout bounding box
//   const width = (140 / 35) * height;

//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox="0 0 175 40"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       {/* 1. S-Letter Vector: Sleek, geometric, and wrapping on the left */}
//       <path
//         d="M24 8H12.5C9.5 8 7 10.5 7 13.5C7 16.5 9.5 19 12.5 19H18.5C21.5 19 24 21.5 24 24.5C24 27.5 21.5 30 18.5 30H7"
//         stroke="currentColor"
//         strokeWidth="4.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="text-white"
//       />

//       {/* 2. O-Letter Vector: The focal glowing Gold/Orange sphere core */}
//       <circle cx="41" cy="19" r="11" fill="#F08804" />

//       {/* 3. K-Letter Vector: Sharp, structural tech lines locking on the right */}
//       <path
//         d="M59 7V31M59 19L74 7M59 19L74 31"
//         stroke="currentColor"
//         strokeWidth="4.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="text-white"
//       />

//       {/* 4. "ecommerce" Sub-branding Typography in clean Montserrat/Inter style */}
//       <text
//         x="79"
//         y="25"
//         fill="currentColor"
//         fontSize="16"
//         fontWeight="800"
//         letterSpacing="0.5"
//         className="text-white font-sans tracking-wide select-none"
//       >
//         ecommerce
//       </text>
//     </svg>
//   );
// }

interface LogoProps {
  className?: string;
  height?: number;
  inverted?: boolean; // 🎯 New prop to force light text on permanent dark backgrounds
}

export default function Logo({
  className,
  height = 35,
  inverted = false,
}: LogoProps) {
  const width = (175 / 40) * height;

  // 🎯 Determine color class dynamically based on where the logo is mounted
  const textClass = inverted
    ? "text-white"
    : "text-black dark:text-white transition-colors duration-200";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 175 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 1. S-Letter Vector */}
      <path
        d="M24 8H12.5C9.5 8 7 10.5 7 13.5C7 16.5 9.5 19 12.5 19H18.5C21.5 19 24 21.5 24 24.5C24 27.5 21.5 30 18.5 30H7"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={textClass}
      />

      {/* 2. O-Letter Vector: Always glowing gold-orange */}
      <circle
        cx="41"
        cy="19"
        r="11"
        fill="currentColor"
        className="text-primary transition-colors duration-200"
      />

      {/* 3. K-Letter Vector */}
      <path
        d="M59 7V31M59 19L74 7M59 19L74 31"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={textClass}
      />

      {/* 4. "ecommerce" Sub-branding Typography */}
      <text
        x="79"
        y="25"
        fill="currentColor"
        fontSize="16"
        fontWeight="800"
        letterSpacing="0.5"
        className={`${textClass} font-sans tracking-wide select-none`}
      >
        ecommerce
      </text>
    </svg>
  );
}
