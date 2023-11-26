import type { FC } from "react";
import type { User } from "~/models/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type UserCardProps = Omit<User, "createdAt" | "updatedAt">;

const UserCard: FC<UserCardProps> = ({ id, name, email, phoneNumber }) => (
  <Card>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>ID: {id}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{email}</p>
      <p>{phoneNumber}</p>
    </CardContent>
  </Card>
);

export default UserCard;
