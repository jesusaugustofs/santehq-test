import type { FC } from "react";
import UserCard from "./user-card";
import type { User } from "~/models/user.schema";
import Empty from "./empty";
import Error from "./error";
import Spinner from "./spinner";

type UserGridProps = {
  users?: User[];
  isLoading: boolean;
  isError: boolean;
  onEditUserClick: (user: User) => void;
  onDeleteUserClick: (user: User) => void;
};

const UserGrid: FC<UserGridProps> = ({
  users,
  isLoading,
  isError,
  onEditUserClick,
  onDeleteUserClick,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <Spinner />
        <h2>Loading users...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 justify-center">
        <Error message="An error has ocurred." />
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="flex flex-1 justify-center">
        <Empty message="There are no users registered." />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-user-container gap-2 scroll-auto p-2">
      {users?.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEditUserClick={(user) => onEditUserClick(user)}
          onDeleteUserClick={(user) => onDeleteUserClick(user)}
        />
      ))}
    </div>
  );
};

export default UserGrid;
