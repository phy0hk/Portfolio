import { animate } from "animejs";

const SideNavigator = () => {
    const styles = "size-4 bg-zinc-300 rounded-full ";
    const currentPage = "";
    const onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        animate(e.currentTarget, {
            scale: 2,
            delay: 0,
            duration: 100,
        });
    };
    const onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        animate(e.currentTarget, {
            scale: 1,
            delay: 0,
            duration: 100,
        });
    };
    return (
        <div className="fixed flex flex-col gap-3 right-5 top-2/5 bg-zinc-800 p-2 rounded-full items-center justify-center">
            <button
                className={styles}
                id="nav1"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            ></button>
            <button
                className={styles}
                id="nav2"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            ></button>
            <button
                className={styles}
                id="nav3"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            ></button>
        </div>
    );
};
export default SideNavigator;
