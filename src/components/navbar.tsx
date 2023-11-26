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
  <div className="flex flex-row place-content-between items-center gap-x-12 p-2 shadow-lg">
    <h1 className="text-2xl font-bold">{title}</h1>
    <Input
      className="w-2/4"
      type="search"
      placeholder={inputPlaceholder}
      onChange={(event) => onInputChange(event.target.value)}
    />
    <Button onClick={onButtonClick}>{buttonText}</Button>
  </div>
);

export default Navbar;
