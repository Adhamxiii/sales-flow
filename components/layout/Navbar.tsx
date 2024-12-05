import { LucideShoppingBag } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import DealDialog from "../dealDialog/DealDialog";
import { Input } from "../ui/input";
import { ModeToggle } from "./ModeToggle";

const Navbar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative w-full h-20 overflow-hidden flex justify-between items-center px-6 border-b">
      <header className="flex items-center gap-2 left-10 top-8">
        <div className="size-10 bg-primary rounded-md flex justify-center items-center">
          <LucideShoppingBag
            className="text-white text-lg"
            aria-hidden="true"
          />
        </div>
        <h1 className="font-semibold text-2xl max-md:hidden">
          Sales <span className="text-primary font-normal">Flow</span>{" "}
        </h1>
      </header>

      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-3 maz-sm:w-[250px] relative">
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="h-10 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-[4px] h-[31px]">
            <DealDialog />
          </div>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
