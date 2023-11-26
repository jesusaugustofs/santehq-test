import type { FC } from "react";
import { Input } from "./ui/input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import type { CreateUser } from "~/models/create-user.schema";
import type { User } from "~/models/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UserFormValidation,
  ZUserFormValidation,
} from "~/models/user-form-validation.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

type UserFormProps = {
  user?: User;
  onSubmitUser: (userData: CreateUser) => Promise<void>;
  onClose: () => void;
};

const UserForm: FC<UserFormProps> = ({ user, onSubmitUser, onClose }) => {
  const form = useForm<CreateUser>({
    resolver: zodResolver(ZUserFormValidation),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    },
  });

  const onSubmit: SubmitHandler<UserFormValidation> = (data) =>
    onSubmitUser(data);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+589999999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button size="sm" type="submit">
            Accept
          </Button>
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
