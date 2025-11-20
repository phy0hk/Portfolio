export const BasicDisplayLayout = ({
    children,
    input,
    sysInfo,
}: {
    children?: React.ReactNode;
    input: string;
    sysInfo: string;
}) => {
    return (
        <div className="flex flex-col">
            <p>{`${sysInfo} ${input}`}</p>
            {children}
        </div>
    );
};
