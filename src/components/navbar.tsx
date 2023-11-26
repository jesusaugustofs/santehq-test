import type { FC } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Navbar: FC = () => (
  <div className="flex flex-row place-content-between items-center gap-x-12 p-2 shadow-lg">
    <h1 className="text-2xl font-bold">Sante Users</h1>
    <Input
      type="search"
      placeholder="Search by name or email"
      className="w-2/4"
    />
    <Button>Add User</Button>
  </div>
);

export default Navbar;
