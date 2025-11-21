import { ArrowRight } from "lucide-react";

const SearchBar = ({ onSearch, inputValue, onInputChange }: SearchBarProps) => {
    return (
        <div className="w-full h-auto p-2 gap-2 flex items-center justify-center">
            <input
                type="text"
                value={inputValue}
                onChange={onInputChange}
                className="w-full bg-zinc-700 outline outline-zinc-800 py-1 px-3 rounded-md"
            />
            <button
                className="p-1 rounded-md hover:bg-zinc-700"
                onClick={onSearch}
            >
                <ArrowRight />
            </button>
        </div>
    );
};
interface SearchBarProps {
    inputValue: string;
    onSearch: React.MouseEventHandler<HTMLButtonElement>;
    onInputChange: React.ChangeEventHandler<HTMLInputElement>;
}
export default SearchBar;
