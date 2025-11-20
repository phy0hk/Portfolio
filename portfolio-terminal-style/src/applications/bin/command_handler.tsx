import { BasicDisplayLayout } from "../../components/layouts";
import { elementToHtml } from "../../utils/func/converter";
import {
    push_display,
    push_history,
} from "../../utils/localstorage/create_operations";
import { clearDisplay } from "../../utils/localstorage/delete_operations";
import { getHistory } from "../../utils/localstorage/read_opertaions";

export const CommandHandler = (
    input: string,
    sysInfo: string,
    InvalidCommand: string = "",
) => {
    const command = input.split(" ");
    push_history(input);
    switch (command[0]) {
        case "aboutyou":
            AboutYou(input, sysInfo);
            break;
        case "clear":
            Clear();
            break;
        case "history":
            History(input, sysInfo);
            break;
        case "help":
            HelpCommand(input, sysInfo);
            break;
        case "invalid":
            InvalidParameter(InvalidCommand, sysInfo);
            break;
        default:
            CommandNotFound(input, sysInfo);
            break;
    }
};
const AboutYou = (input: string, sysInfo: string) => {
    push_display(
        "display",
        elementToHtml(
            <BasicDisplayLayout input={input} sysInfo={sysInfo}>
                <p>Hello it's me mario</p>
            </BasicDisplayLayout>,
        ),
    );
};

const Clear = () => {
    clearDisplay();
};
const History = async (input: string, sysInfo: string) => {
    const history = await getHistory();
    console.log("This  command is called", history);
    const HistoryPrint = history?.map((item) => (
        <p key={item.id}>{item.command}</p>
    ));
    push_display(
        "display",
        elementToHtml(
            <BasicDisplayLayout input={input} sysInfo={sysInfo}>
                {HistoryPrint}
            </BasicDisplayLayout>,
        ),
    );
};
const CommandNotFound = (input: string, sysInfo: string) => {
    push_display(
        "display",
        elementToHtml(
            <BasicDisplayLayout sysInfo={sysInfo} input={input}>
                Command Not Found
            </BasicDisplayLayout>,
        ),
    );
};
const InvalidParameter = (input: string, sysInfo: string) => {
    push_display(
        "display",
        elementToHtml(
            <BasicDisplayLayout input={input} sysInfo={sysInfo}>
                <p>Invalid Parameter Contain</p>
            </BasicDisplayLayout>,
        ),
    );
};
const HelpCommand = (input: string, sysInfo: string) => {
    push_display(
        "display",
        elementToHtml(
            <BasicDisplayLayout input={input} sysInfo={sysInfo}>
                <>
                    <p>Available commands:</p>
                    <ul>
                        <li>aboutyou</li>
                        <li>clear</li>
                        <li>history</li>
                        <li>help</li>
                        <li>cancel</li>
                    </ul>
                </>
            </BasicDisplayLayout>,
        ),
    );
};
