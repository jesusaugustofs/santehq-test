import type { FC } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type NavbarProps = {
  title: string;
  buttonText: string;
  inputPlaceholder: string;
  onButtonClick: () => void;
  onInputChange: (value: string) => void;
};

const Navbar: FC<NavbarProps> = ({
  title,
  buttonText,
  inputPlaceholder,
  onButtonClick,
  onInputChange,
}) => (
  <nav className="flex flex-row flex-wrap place-content-between items-center gap-4 gap-x-12 p-2 shadow-lg sm:flex-nowrap">
    <h1 className="order-1 text-2xl font-bold">{title}</h1>
    <Input
      className="order-3 sm:order-2 sm:w-1/2"
      type="search"
      placeholder={inputPlaceholder}
      onChange={(event) => onInputChange(event.target.value)}
    />
    <Button className="order-2 sm:order-3" size="sm" onClick={onButtonClick}>
      {buttonText}
    </Button>
  </nav>
);

export default Navbar;
