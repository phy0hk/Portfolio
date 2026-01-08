import type { TerminalStates } from "@/models/storage/slice/applications/terminal_slices_types";
import {
    AppendDisplay,
    SetIsInSpecialCommand,
} from "@/storage/redux/desktop_states/applicaions/terminal_states";
import { animate, splitText, stagger } from "animejs";
import { useEffect, useState } from "react";

import { renderToString } from "react-dom/server";
import { useDispatch } from "react-redux";

const useCmdAboutMe = (shellPrompt: string, terminalState?: TerminalStates) => {
    const dispatch = useDispatch();
    const [paragraphId, setParagraphId] = useState<number>(-1);
    const [uniqueId, setUniqueId] = useState<string>("");
    const paragraphList = [
        "I am a dedicated IT professional with a strong interest in system administration, DevOps practices, and modern application development.",
        "I have hands-on experience working with Linux-based systems, container technologies like Docker, and Kubernetes environments, where I focus on building stable, efficient, and maintainable infrastructure.",
        "In my daily work, I manage and troubleshoot servers, networking, storage solutions, and DNS configurations, while also supporting application deployments and CI/CD workflows.",
        "I have experience working with enterprise tools such as PowerApps to develop internal systems including ticketing, asset management, and license tracking applications.",
        "I enjoy creating solutions that improve operational efficiency and simplify complex processes.",
        "I am highly curious by nature and enjoy digging deep into technical problems—from debugging low-level system issues to optimizing cloud-native workloads.",
        "I actively explore open-source technologies and prefer practical, hands-on learning through experimentation and real-world projects.",
        "My long-term goal is to grow as a DevOps or platform engineer, contributing to scalable infrastructure, automation, and open-source projects while continuously expanding my technical skill set.",
    ];
    const AboutMeString = (uid: string) => {
        return renderToString(
            <h3 className="text-xl" id={`header-${uid}`}>
                Hi I'm Phyo
            </h3>,
        );
    };
    const removeHidden = (id: string) => {
        const element = document.getElementById(id.replace("#", ""));
        element?.classList.remove("hidden");
    };

    const updateParagraph = (terminalState: TerminalStates) => {
        if (
            paragraphList.length - 1 !== paragraphId &&
            terminalState.inputState.isInSpecialCommand
        ) {
            setParagraphId((prev) => prev + 1);
            dispatch(
                AppendDisplay({
                    processId: terminalState.processId,
                    display: renderToString(
                        <p id={`paragraph-${paragraphId + 1}-${uniqueId}`}>
                            {paragraphList[paragraphId + 1]}
                        </p>,
                    ),
                }),
            );
        } else {
            setParagraphId(-1);
            dispatch(
                SetIsInSpecialCommand({
                    processId: terminalState.processId,
                    isInSpecialCommand: false,
                }),
            );
        }
    };

    useEffect(() => {
        if (paragraphId === -1 && !terminalState?.inputState.isInSpecialCommand)
            return;
        if (!terminalState) return;
        const id = `#paragraph-${paragraphId}-${uniqueId}`;
        const { chars } = splitText(id, { chars: true });
        removeHidden(id);

        animate(chars, {
            delay: stagger(20),
            ease: "inBack",
            opacity: [0, 1],
            duration: 20,
            onComplete: () => {
                updateParagraph(terminalState);
            },
        });
    }, [paragraphId]);

    useEffect(() => {
        if (!uniqueId) return;
        const { chars } = splitText(`#header-${uniqueId}`, {
            words: false,
            chars: true,
        });
        animate(chars, {
            delay: stagger(50),
            easing: "easeInOutQuad",
            opacity: [0, 1],
            duration: 100,
            onComplete: () => setParagraphId(0),
        });
    }, [uniqueId]);

    const Trigger = (): string => {
        const randomUUID = () => {
            return `${Date.now()}`;
        };
        const uid = randomUUID();
        setUniqueId(uid);
        if (!terminalState) return "";
        dispatch(
            AppendDisplay({
                processId: terminalState.processId,
                display:
                    renderToString(
                        <p>
                            {shellPrompt + terminalState?.inputState.inputValue}
                        </p>,
                    ) + AboutMeString(uid),
            }),
        );
        dispatch(
            SetIsInSpecialCommand({
                processId: terminalState.processId,
                isInSpecialCommand: true,
            }),
        );

        return "";
    };
    return { Trigger };
};
export default useCmdAboutMe;
