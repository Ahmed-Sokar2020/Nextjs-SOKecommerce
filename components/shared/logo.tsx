import { Link } from "@/i18n/navigation";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image
          className="w-10 h-auto"
          src="/icons/logo2.svg"
          width={100}
          height={100}
          alt={`${APP_NAME} logo`}
          priority
        />
      </Link>
    </div>
  );
};

export default Logo;
