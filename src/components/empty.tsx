import type { FC } from "react";
import { Scroll } from "lucide-react";

type EmptyProps = {
  iconSize?: number;
  message?: string;
};

const Empty: FC<EmptyProps> = ({ iconSize = 100, message = "No data" }) => (
  <div className="align-center flex w-screen flex-col items-center justify-center">
    <Scroll size={iconSize} />
    <h2>{message}</h2>
  </div>
);

export default Empty;
