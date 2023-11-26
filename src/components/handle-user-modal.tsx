import type { FC } from "react";
import Modal from "./modal";
import UserForm from "./user-form";
import type { CreateUser } from "~/models/create-user.schema";

type HandleUserModalProps = {
  visible: boolean;
  onSubmitUser: (userData: CreateUser) => Promise<void>;
  onClose: () => void;
};

const HandleUserModal: FC<HandleUserModalProps> = ({
  visible,
  onSubmitUser,
  onClose,
}) => (
  <Modal
    title="Create User"
    className="w-500"
    visible={visible}
    onClickOutside={onClose}
  >
    <UserForm onSubmitUser={onSubmitUser} onClose={onClose} />
  </Modal>
);

export default HandleUserModal;
