import { user_info } from "../utils/config/portfolio_info";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/states/store";
import { setInputValue } from "../utils/states/input_slice";
import EventHandler from "../applications/event_handler";

const CommandInput = () => {
  const inputValue = useSelector((state: RootState) => state.input.inputValue);
  const sysInfo = useSelector((state: RootState) => state.input.sysInfo);
  const hostnameAndUsername = `[ ${sysInfo.hostname}@${user_info.username} ${user_info.path} ] $ `;
  const dispatch = useDispatch();
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.currentTarget.value;
    if (
      currentValue.startsWith(hostnameAndUsername) &&
      !currentValue.endsWith("\n")
    ) {
      const newInput = currentValue.replace(hostnameAndUsername, "");
      dispatch(setInputValue(newInput));
    }
  };
  return (
    <div className="relative">
      <>
        <EventHandler
          currentInput={inputValue}
          hostnameAndUsername={hostnameAndUsername}
        />
        <textarea
          value={`${hostnameAndUsername}${inputValue}`}
          className="h-[80vh] w-full outline-none resize-none"
          onChange={handleOnChange}
        />
      </>
    </div>
  );
};

export default CommandInput;
