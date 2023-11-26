import type { FC } from "react";
import UserCard from "./user-card";
import type { User } from "~/models/user.schema";

type UserGridProps = {
  users?: User[];
  isLoading: boolean;
  isError: boolean;
  onEditUserClick: (user: User) => void;
};

const UserGrid: FC<UserGridProps> = ({
  users,
  isLoading,
  isError,
  onEditUserClick,
}) => {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>An error has ocurred</h2>;
  }

  return (
    <div className="grid-cols-user-container grid gap-2 p-2">
      {users?.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEditUserClick={(user) => onEditUserClick(user)}
        />
      ))}
    </div>
  );
};

export default UserGrid;
