import CartButton from "./cart-button";
import { ThemeColorSwitcher } from "./theme-switcher";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-end">
      <nav className="flex justify-center items-center gap-3 w-full">
        <ThemeColorSwitcher />
        <UserButton />
        <CartButton />
      </nav>
    </div>
  );
};

export default Menu;
