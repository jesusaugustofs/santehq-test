import type { ComponentProps, FC } from "react";
import UserCard from "./user-card";

type UserCardProps = ComponentProps<typeof UserCard>;

type UserGridProps = {
  users?: UserCardProps[];
  isLoading: boolean;
  isError: boolean;
};

const UserGrid: FC<UserGridProps> = ({ users, isLoading, isError }) => {
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
          id={user.id}
          name={user.name}
          email={user.email}
          phoneNumber={user.phoneNumber}
        />
      ))}
    </div>
  );
};

export default UserGrid;
