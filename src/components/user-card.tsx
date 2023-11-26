import type { FC } from "react";
import type { User } from "~/models/user.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PenSquare, Trash } from "lucide-react";
import { format } from "date-fns";

type UserCardProps = {
  user: User;
  onEditUserClick: (user: User) => void;
};

const UserCard: FC<UserCardProps> = ({ user, onEditUserClick }) => (
  <Card className="hover:shadow-lg ">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle>{user.name}</CardTitle>
        <div className="flex gap-x-2">
          <PenSquare
            size={16}
            className="cursor-pointer"
            onClick={() => onEditUserClick(user)}
          />
          <Trash size={16} className="cursor-pointer" color="red" />
        </div>
      </div>
      <CardDescription>
        {`ID: ${user.id} | Created on: ${format(
          user.createdAt,
          "LLLL do, yyyy",
        )}`}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>{user.email}</p>
      <p>{user.phoneNumber}</p>
    </CardContent>
  </Card>
);

export default UserCard;
