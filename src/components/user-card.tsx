import { useState, type FC } from "react";
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
  onDeleteUserClick: (user: User) => void;
};

const UserCard: FC<UserCardProps> = ({
  user,
  onEditUserClick,
  onDeleteUserClick,
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <Card
      className="hover:shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{user.name}</CardTitle>
          {isHovering && (
            <div className="flex gap-x-2">
              <PenSquare
                size={16}
                className="cursor-pointer"
                onClick={() => onEditUserClick(user)}
              />
              <Trash
                size={16}
                className="cursor-pointer"
                color="red"
                onClick={() => onDeleteUserClick(user)}
              />
            </div>
          )}
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
};

export default UserCard;
