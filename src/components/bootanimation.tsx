import { useEffect, useState } from "react";

const BootAnimation = ({ isBooted, onBooted }: BootAnimationProps) => {
    const [kernelLoaded, setKernelLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const kernelLoad: React.ReactNode[] = [
        <p>Booting ArchLinux</p>,
        <p>Loading linux linux...</p>,
        <p>Loading initial ramdisk...</p>,
    ];
    const [delay, setDelay] = useState(1000);

    const bootSequence: React.ReactNode[] = [
        <p>systemd [1]: System manager daemon version ...</p>,
        <p>systemd [1]: Running in initial boot mode.</p>,
        <p>systemd [1]: Detected architecture ...</p>,
        <p>systemd [1]: Set hostname to archlinux</p>,
        <p>[ ... ] Mounting /boot/efi...</p>,
        <p className="flex flex-row">
            <OKText />" Mounted /boot/efi.
        </p>,
        <p>[ ... ] Mounting Local File Systems...</p>,
        <p className="flex flex-row">
            <OKText /> Reached target Local File Systems.
        </p>,
        <p>[ ... ] Started File System Check on /dev/disk/by-uuid/...</p>,
        <p className="flex flex-row">
            <OKText /> Reached target Swaps.
        </p>,
        <p className="flex flex-row">
            <OKText /> Started Monitoring of LVM2 mirrors, snapshots etc. using
            dmeventd.
        </p>,
        <p className="flex flex-row">
            <OKText /> Reached target Remote File Systems.
        </p>,
        <p className="flex flex-row">
            <OKText /> Started Network Time Synchronization.
        </p>,
        <p className="flex flex-row">
            <OKText /> Started Dispatch Password Requests to Console Directory
            Watch.
        </p>,
        <p className="flex flex-row">
            <OKText /> Reached target System Initialization.
        </p>,
        <p className="flex flex-row">
            <OKText /> Started Daily Cleanup of Temporary Directories.
        </p>,
        <p className="flex flex-row">
            <OKText /> Started Hostname Service.
        </p>,
        <p className="flex flex-row">
            <OKText /> Started Permit User Sessions.
        </p>,
        <p className="flex flex-row">
            <OKText /> Started OpenBSD Secure Shell server.
        </p>,
        <p className="flex flex-row">
            <OKText /> Started Network Manager.
        </p>,
        <p className="flex flex-row">
            <FailedText /> Failed to start vbox.service
        </p>,
        <p className="flex flex-row">
            <OKText /> Reached target Network.
        </p>,
        <p className="flex flex-row">
            <OKText /> Reached target Network Services.
        </p>,
        <p className="flex flex-row">
            <OKText /> Reached target Timer Units.
        </p>,
        <p className="flex flex-row">
            <OKText /> Reached target Multi-User System.
        </p>,
    ];

    const [display, setDisplay] = useState<React.ReactNode[]>([]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (kernelLoaded && currentIndex < bootSequence.length) {
                setDisplay((prev) => [...prev, bootSequence[currentIndex]]);
                setCurrentIndex(currentIndex + 1);
            } else if (currentIndex < kernelLoad.length) {
                setDisplay((prev) => [...prev, kernelLoad[currentIndex]]);
                setCurrentIndex(currentIndex + 1);
            }
            if (currentIndex === kernelLoad.length && !kernelLoaded) {
                setKernelLoaded(true);
                setCurrentIndex(0);
            }
            if (currentIndex === bootSequence.length && !isBooted) {
                onBooted(true);
            }
            setDelay(Math.ceil(Math.random() * 100));
        }, delay);
        return () => clearInterval(interval);
    }, [display]);

    useEffect(() => {
        setDisplay([]);
    }, [kernelLoaded]);

    return (
        <div className="flex h-screen  text-white flex-col">
            {display?.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
        </div>
    );
};

const OKText = () => {
    return (
        <p className="flex flex-row whitespace-pre-wrap">
            [ <p className="text-green-500">OK</p> ]
        </p>
    );
};

const FailedText = () => {
    return (
        <p className="flex flex-row whitespace-pre-wrap">
            [ <p className="text-red-500">FAILED</p> ]
        </p>
    );
};
interface BootAnimationProps {
    onBooted: (booted: boolean) => void;
    isBooted: boolean;
}
export default BootAnimation;
