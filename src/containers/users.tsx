import { type FC, useState } from "react";
import type { CreateUser } from "~/models/create-user.schema";
import type { User } from "~/models/user.schema";
import HandleUserModal from "~/components/handle-user-modal";
import Navbar from "~/components/navbar";
import UserGrid from "~/components/user-grid";
import { useDebounce } from "~/hooks/useDebounce";
import { api } from "~/utils/api";
import { useToast } from "~/components/ui/use-toast";
import DeleteUserModal from "~/components/delete-user-modal";

const UsersContainer: FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditingUser, setIsEditingUser] = useState<boolean>(false);
  const [isDeletingUser, setIsDeletingUser] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchValue);

  const { mutateAsync: createUser } = api.user.create.useMutation();
  const { mutateAsync: updateUser } = api.user.update.useMutation();
  const { mutateAsync: deleteUser } = api.user.delete.useMutation();
  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  } = api.user.getAll.useQuery({
    search: debouncedSearch,
  });

  const { toast } = useToast();

  const onSubmitUser = async (userData: CreateUser) => {
    try {
      if (isEditingUser && selectedUser) {
        await updateUser({ id: selectedUser.id, ...userData });
        toast({
          description: "User successfully updated!",
        });
      } else {
        await createUser(userData);
        toast({
          description: "User successfully created!",
        });
      }

      await refetch();
    } catch (error) {
      toast({
        description: "Could not create user, email is already in use",
        variant: "destructive",
      });
    }

    setIsModalVisible(false);
  };

  const onDeleteUser = async (userId: number) => {
    try {
      await deleteUser({ id: userId });
      toast({
        description: "User successfully deleted!",
        variant: "destructive",
      });
      await refetch();
    } catch (e) {
      toast({
        description: "Could not delete user!",
        variant: "destructive",
      });
    }
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
      <DeleteUserModal
        user={selectedUser}
        title="Delete User"
        message="Are you sure to delete this user? It will be removed for ever!"
        visible={isDeletingUser}
        onClose={() => {
          setIsDeletingUser(false);
          setSelectedUser(undefined);
        }}
        onAcceptUserDelete={(userId) => onDeleteUser(userId)}
      />
      <div className="flex h-screen flex-col gap-8">
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
          onDeleteUserClick={(user) => {
            setSelectedUser(user);
            setIsDeletingUser(true);
          }}
        />
      </div>
    </>
  );
};

export default UsersContainer;
