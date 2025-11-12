const DisplayOutput = ({
    username,
    os_name,
    value,
    output_type,
}: DisplayOutputProps) => {
    return (
        <p className="whitespace-pre-wrap">
            {output_type === "history"
                ? `[${username}@${os_name} ~] ${value}`
                : `${value}`}
        </p>
    );
};
interface DisplayOutputProps {
    username: string;
    os_name: string;
    value: string;
    output_type: "history" | "output";
}
export default DisplayOutput;
