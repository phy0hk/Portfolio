import { useState } from "react";

export interface ApplicationMenuHooksT {
    searchValue: string;
    OnSearchChange: React.ChangeEventHandler<HTMLInputElement>;
}
const useApplicationMenu = (): ApplicationMenuHooksT => {
    //For Search Section
    const [searchValue, setSearchValue] = useState("");
    const OnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return { searchValue, OnSearchChange };
};

export default useApplicationMenu;
