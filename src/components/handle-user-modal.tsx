import type { FC } from "react";
import Modal from "./modal";
import UserForm from "./user-form";
import type { CreateUser } from "~/models/create-user.schema";
import type { User } from "~/models/user.schema";

type HandleUserModalProps = {
  user?: User;
  title: string;
  visible: boolean;
  onSubmitUser: (userData: CreateUser) => Promise<void>;
  onClose: () => void;
};

const HandleUserModal: FC<HandleUserModalProps> = ({
  user,
  visible,
  title,
  onSubmitUser,
  onClose,
}) => (
  <Modal
    className="h-200"
    title={title}
    visible={visible}
    onClickOutside={onClose}
  >
    <UserForm user={user} onSubmitUser={onSubmitUser} onClose={onClose} />
  </Modal>
);

export default HandleUserModal;
