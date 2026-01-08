import { cacheFile } from "@/utils/file_cacher";
import { useEffect, useState } from "react";

const useCV = () => {
    const [cvUrl, setCvUrl] = useState<string>("/cv.pdf");

    useEffect(() => {
        cacheFile("/cv.pdf").then((pdf) => {
            const object_url = URL.createObjectURL(pdf.file_data);
            setCvUrl(object_url);
            return () => URL.revokeObjectURL(object_url);
        });
    }, []);

    return { cvUrl };
};
export default useCV;
