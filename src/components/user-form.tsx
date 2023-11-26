import type { FC } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import type { CreateUser } from "~/models/create-user.schema";
import type { User } from "~/models/user.schema";

type UserFormProps = {
  user?: User;
  isOnEditMode: boolean;
  onSubmitUser: (userData: CreateUser) => Promise<void>;
  onClose: () => void;
};

const UserForm: FC<UserFormProps> = ({
  user,
  isOnEditMode,
  onSubmitUser,
  onClose,
}) => {
  const { register, handleSubmit } = useForm<CreateUser>();

  const onSubmit: SubmitHandler<CreateUser> = (data) => onSubmitUser(data);

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          type="text"
          defaultValue={isOnEditMode ? user?.name : ""}
          {...register("name")}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="johndoe@santehq.com"
          type="email"
          defaultValue={isOnEditMode ? user?.email : ""}
          {...register("email")}
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone number</Label>
        <Input
          id="phoneNumber"
          placeholder="1111111"
          type="tel"
          defaultValue={isOnEditMode ? user?.phoneNumber : ""}
          {...register("phoneNumber")}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button size="sm" type="submit">
          Accept
        </Button>
        <Button size="sm" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
