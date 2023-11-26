import { type FC, type ReactElement, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

type ModalProps = {
  children: ReactElement;
  visible: boolean;
  title: string;
  className?: string;
  acceptButtonText?: string;
  closeButtonText?: string;
  onClose?: () => void;
  onAccept?: () => void;
  onClickOutside?: () => void;
};

const Modal: FC<ModalProps> = ({
  children,
  visible,
  title,
  className,
  acceptButtonText = "Accept",
  closeButtonText = "Close",
  onClose,
  onAccept,
  onClickOutside,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => {
    onClickOutside?.();
  });

  useEffect(() => {
    if (!visible) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return createPortal(
    <div className="align-center z-1000 absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-[#00000099]">
      <Card
        ref={ref}
        className={cn("z-1001 flex flex-col rounded bg-white p-4", className)}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-0">{children}</CardContent>
        <CardFooter className="flex justify-end gap-2 p-0">
          {onAccept && (
            <Button
              size="sm"
              onClick={() => {
                onAccept();
                onClose?.();
              }}
            >
              {acceptButtonText}
            </Button>
          )}
          {onClose && (
            <Button size="sm" variant="ghost" onClick={onClose}>
              {closeButtonText}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>,
    document.body,
  );
};

export default Modal;
