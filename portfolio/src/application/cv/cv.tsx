import useCV from "@/hooks/applications/cv/cv_hooks";

const Cv = () => {
    const { cvUrl } = useCV();
    return <iframe src={cvUrl} className="w-full h-full"></iframe>;
};

export default Cv;
