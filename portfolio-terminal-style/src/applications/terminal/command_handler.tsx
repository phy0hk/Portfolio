import { BasicDisplayLayout } from "../../components/layouts";
import { elementToHtml } from "../../utils/func/converter";

export const CommandHandler = (command: string, sysInfo: string): string => {
    const commandArr = command.split(" ");
    const mainCommand = commandArr[0];
    switch (mainCommand) {
        default:
            return elementToHtml(
                <BasicDisplayLayout input={mainCommand} sysInfo={sysInfo}>
                    Unknown Command
                </BasicDisplayLayout>,
            );
    }
};
