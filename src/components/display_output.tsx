import type { displayProps } from "../config/global_types";

const DisplayOutput = ({
    username,
    os_name,
    value,
    currentPath,
    type,
    element,
}: DisplayOutputProps) => {
    console.log(element);
    return (
        <p className="whitespace-pre-wrap">
            {type === "history"
                ? `[${username}@${os_name} ${currentPath} ] ${value}`
                : value
                  ? value
                  : element}
        </p>
    );
};
interface DisplayOutputProps extends displayProps {
    username: string;
    os_name: string;
    currentPath: string;
}
export default DisplayOutput;
