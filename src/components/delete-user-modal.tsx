import type { FC, ComponentProps, ReactNode } from "react";
import type { User } from "~/models/user.schema";
import Modal from "./modal";

type ModalProps = ComponentProps<typeof Modal>;

type DeleteUserModalProps = Omit<ModalProps, "onClickOutside" | "children"> & {
  user?: User;
  message: ReactNode;
  onAcceptUserDelete: (id: User["id"]) => Promise<void>;
};

const DeleteUserModal: FC<DeleteUserModalProps> = ({
  user,
  visible,
  message,
  title,
  onClose,
  onAcceptUserDelete,
}) => {
  if (!user) {
    return null;
  }

  return (
    <Modal
      title={title}
      visible={visible}
      acceptButtonText="Delete"
      onClose={onClose}
      onClickOutside={onClose}
      onAccept={() => onAcceptUserDelete(user.id)}
    >
      <div className="pb-4">{message}</div>
    </Modal>
  );
};

export default DeleteUserModal;
