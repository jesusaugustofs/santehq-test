import type { FC } from "react";
import { ServerCrash } from "lucide-react";

type ErrorProps = {
  iconSize?: number;
  message?: string;
};

const Error: FC<ErrorProps> = ({ iconSize = 100, message = "Error" }) => (
  <div className="align-center flex w-screen flex-col items-center justify-center">
    <ServerCrash size={iconSize} />
    <h2>{message}</h2>
  </div>
);

export default Error;
