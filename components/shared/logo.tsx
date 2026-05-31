import { Link } from "@/i18n/navigation";
interface LogoProps {
  className?: string;
  height?: number;
  inverted?: boolean;
}

export default function Logo({
  className,
  height = 35,
  inverted = false,
}: LogoProps) {
  const width = (175 / 40) * height;

  const textClass = inverted
    ? "text-white"
    : "text-black dark:text-white transition-colors duration-200";

  return (
    <>
      {/* 🎯 Enforcing dir="ltr" here on the Link element is perfectly valid in TypeScript */}
      <Link href="/" className="inline-block" dir="ltr">
        <svg
          width={width}
          height={height}
          viewBox="0 0 175 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          /* 🎯 FIX: Removed dir="ltr" property and added [direction:ltr] to the class utilities instead */
          className={`${className || ""} select-none [direction:ltr]`}
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

          {/* 2. O-Letter Vector */}
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
            className={`${textClass} font-sans tracking-wide`}
          >
            ecommerce
          </text>
        </svg>
      </Link>
    </>
  );
}
