import { user_info } from "../utils/config/portfolio_info";
import { sysInfo } from "../utils/config/sys_info";

export const BasicDisplayLayout = ({
  children,
  input,
}: {
  children?: React.ReactNode;
  input: string;
}) => {
  return (
    <div className="flex flex-col">
      <p>{`[ ${sysInfo.hostname}@${user_info.username} ${user_info.path} ]$ ${input}`}</p>
      {children}
    </div>
  );
};
