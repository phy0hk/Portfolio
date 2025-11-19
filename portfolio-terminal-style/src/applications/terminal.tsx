import { useSelector } from "react-redux";
import type { RootState } from "../utils/states/store";
import { user_info } from "../utils/config/portfolio_info";
import { useState } from "react";

const Terminal = () => {
  const sysInfo = useSelector((state: RootState) => state.input.sysInfo);
  const hostnameAndUsername = `[ ${sysInfo.hostname}@${user_info.username} /] $ `;
  const [inputValue, setInputValue] = useState<string>("");
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.currentTarget.value;
    if (
      currentValue.startsWith(hostnameAndUsername) &&
      !currentValue.endsWith("\n")
    ) {
      const newInput = currentValue.replace(hostnameAndUsername, "");
      setInputValue(newInput);
    }
  };
  return (
    <div className="w-full h-full flex p-2 overflow-auto">
      <textarea
        className="w-full h-full outline-none"
        value={hostnameAndUsername + inputValue}
        onChange={handleOnChange}
      />
    </div>
  );
};
// interface TerminalProps {}
export default Terminal;
