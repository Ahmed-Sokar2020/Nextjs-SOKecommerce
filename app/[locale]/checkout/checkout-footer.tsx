// import useSettingStore from '@/store/use-setting-store'
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export default function CheckoutFooter() {
  // const {
  //   setting: { site },
  // } = useSettingStore()
  return (
    <div className="border-t-2 space-y-2 my-4 py-4">
      <p>
        Need help? Check our <Link href="/help">Help Center</Link> or{" "}
        <Link href="/contact-us">Contact Us</Link>{" "}
      </p>
      <p>
        For an item ordered from {APP_NAME}: When you click the &apos;Place Your
        Order&apos; button, we will send you an e-mail acknowledging receipt of
        your order. Your contract to purchase an item will not be complete until
        we send you an e-mail notifying you that the item has been shipped to
        you. By placing your order, you agree to {APP_NAME}
        &apos;s <Link href="/privacy-notice">privacy notice</Link> and
        <Link href="/conditions-of-use"> conditions of use</Link>.
      </p>
      <p>
        Within 30 days of delivery, you may return new, unopened merchandise in
        its original condition. Exceptions and restrictions apply.{" "}
        <Link href="/returns-policy">
          See {APP_NAME}&apos;s Returns Policy.
        </Link>
      </p>
    </div>
  );
}
