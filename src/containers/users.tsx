import { type FC, useState } from "react";
import Navbar from "~/components/navbar";
import UserGrid from "~/components/user-grid";
import { useDebounce } from "~/hooks/useDebounce";
import { api } from "~/utils/api";

const UsersContainer: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearch = useDebounce(searchValue);

  const {
    data: usersData,
    isLoading,
    isError,
  } = api.user.getAll.useQuery({
    search: debouncedSearch,
  });

  return (
    <div className="flex flex-col gap-8">
      <Navbar
        title="Santé Users"
        inputPlaceholder="Search by email or name"
        buttonText="Add User"
        onInputChange={(value: string) => setSearchValue(value)}
        onButtonClick={() => console.log("Add user")}
      />
      <UserGrid isLoading={isLoading} isError={isError} users={usersData} />
    </div>
  );
};

export default UsersContainer;
