import type { FC } from "react";
import Modal from "./modal";
import UserForm from "./user-form";
import type { CreateUser } from "~/models/create-user.schema";
import type { User } from "~/models/user.schema";

type HandleUserModalProps = {
  user?: User;
  visible: boolean;
  isOnEditMode: boolean;
  onSubmitUser: (userData: CreateUser) => Promise<void>;
  onClose: () => void;
};

const HandleUserModal: FC<HandleUserModalProps> = ({
  user,
  visible,
  isOnEditMode,
  onSubmitUser,
  onClose,
}) => (
  <Modal
    title={isOnEditMode ? "Edit User" : "Create User"}
    visible={visible}
    onClickOutside={onClose}
  >
    <UserForm
      user={user}
      isOnEditMode={isOnEditMode}
      onSubmitUser={onSubmitUser}
      onClose={onClose}
    />
  </Modal>
);

export default HandleUserModal;
