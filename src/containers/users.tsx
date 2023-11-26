import { type FC, useState } from "react";
import HandleUserModal from "~/components/handle-user-modal";
import Navbar from "~/components/navbar";
import UserGrid from "~/components/user-grid";
import { useDebounce } from "~/hooks/useDebounce";
import type { CreateUser } from "~/models/create-user.schema";
import { api } from "~/utils/api";

const UsersContainer: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const debouncedSearch = useDebounce(searchValue);

  const { mutate: createUser } = api.user.create.useMutation();

  const {
    data: usersData,
    isLoading,
    isError,
  } = api.user.getAll.useQuery({
    search: debouncedSearch,
  });

  const onSubmitUser = async (userData: CreateUser) => {
    createUser(userData);
    setIsModalVisible(false);
  };

  return (
    <>
      <HandleUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmitUser={onSubmitUser}
      />
      <div className="flex flex-col gap-8">
        <Navbar
          title="Santé Users"
          inputPlaceholder="Search by email or name"
          buttonText="Add User"
          onInputChange={(value: string) => setSearchValue(value)}
          onButtonClick={() => setIsModalVisible(true)}
        />
        <UserGrid isLoading={isLoading} isError={isError} users={usersData} />
      </div>
    </>
  );
};

export default UsersContainer;
