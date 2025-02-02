import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {

  return (
    <div>
      <div className="flex justify-between p-2 px-10">
        <div className="flex gap-2"></div>
        <div className="flex flex-row gap-2 items-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
