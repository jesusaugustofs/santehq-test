import { type FC, useState } from "react";
import type { CreateUser } from "~/models/create-user.schema";
import type { User } from "~/models/user.schema";
import HandleUserModal from "~/components/handle-user-modal";
import Navbar from "~/components/navbar";
import UserGrid from "~/components/user-grid";
import { useDebounce } from "~/hooks/useDebounce";
import { api } from "~/utils/api";

const UsersContainer: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isEditingUser, setIsEditingUser] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchValue);

  const { mutate: createUser } = api.user.create.useMutation();
  const { mutate: updateUser } = api.user.update.useMutation();
  const {
    data: usersData,
    isLoading,
    isError,
  } = api.user.getAll.useQuery({
    search: debouncedSearch,
  });

  const onSubmitUser = async (userData: CreateUser) => {
    if (isEditingUser && selectedUser) {
      updateUser({ id: selectedUser.id, ...userData });
    } else {
      createUser(userData);
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <HandleUserModal
        user={selectedUser}
        title={isEditingUser ? "Edit User" : "Create User"}
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setIsEditingUser(false);
          setSelectedUser(undefined);
        }}
        onSubmitUser={onSubmitUser}
      />
      <div className="flex flex-col gap-8">
        <Navbar
          title="Santé Users"
          inputPlaceholder="Search by email or name"
          buttonText="Add User"
          onInputChange={(value) => setSearchValue(value)}
          onButtonClick={() => setIsModalVisible(true)}
        />
        <UserGrid
          isLoading={isLoading}
          isError={isError}
          users={usersData}
          onEditUserClick={(user) => {
            setSelectedUser(user);
            setIsEditingUser(true);
            setIsModalVisible(true);
          }}
        />
      </div>
    </>
  );
};

export default UsersContainer;
