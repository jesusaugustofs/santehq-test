import type { FC } from "react";
import Navbar from "~/components/navbar";
import UserCard from "~/components/user-card";
import { api } from "~/utils/api";

const UsersContainer: FC = () => {
  const { data, isLoading, isError } = api.user.getAll.useQuery();

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>An error has ocurred!</h3>;
  }

  return (
    <div className="flex flex-col gap-8">
      <Navbar />
      <div className="grid-cols-user-container grid gap-2 p-2">
        {data.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            phoneNumber={user.phoneNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersContainer;
