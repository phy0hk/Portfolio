import { BasicDisplayLayout } from "../components/layouts";
import { elementToHtml } from "../utils/func/converter";
import {
    push_display,
    push_history,
} from "../utils/localstorage/create_operations";
import { clearDisplay } from "../utils/localstorage/delete_operations";
import { getHistory } from "../utils/localstorage/read_opertaions";

export const CommandHandler = (input: string, InvalidCommand: string = "") => {
    const command = input.split(" ");
    push_history(input);
    switch (command[0]) {
        case "aboutyou":
            AboutYou(input);
            break;
        case "clear":
            Clear();
            break;
        case "history":
            History(input);
            break;
        case "help":
            HelpCommand(input);
            break;
        case "invalid":
            InvalidParameter(InvalidCommand);
            break;
        default:
            CommandNotFound(input);
            break;
    }
};
const AboutYou = (input: string) => {
    push_display(
        "display",
        elementToHtml(
            <BasicDisplayLayout input={input}>
                <p>Hello it's me mario</p>
            </BasicDisplayLayout>,
        ),
    );
};

const Clear = () => {
    clearDisplay();
};
const History = async (input: string) => {
    const history = await getHistory();
    console.log("This  command is called", history);
    const HistoryPrint = history?.map((item) => (
        <p key={item.id}>{item.command}</p>
    ));
    push_display(
        "display",
        elementToHtml(
            <BasicDisplayLayout input={input}>
                {HistoryPrint}
            </BasicDisplayLayout>,
        ),
    );
};
const CommandNotFound = (input: string) => {
    push_display(
        "display",
        elementToHtml(<BasicDisplayLayout input={input} />),
    );
};
const InvalidParameter = (input: string) => {
    push_display(
        "display",
        elementToHtml(
            <BasicDisplayLayout input={input}>
                <p>Invalid Parameter Contain</p>
            </BasicDisplayLayout>,
        ),
    );
};
const HelpCommand = (input: string) => {
    push_display(
        "display",
        elementToHtml(
            <BasicDisplayLayout input={input}>
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
