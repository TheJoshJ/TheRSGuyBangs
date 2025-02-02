import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NavButtons = {
  Home: { text: "Home", link: "/" },
  Records: { text: "Records", link: "/records" },
};

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between p-2 px-10">
        <div className="flex gap-2">
          {Object.entries(NavButtons).map(([key, { text, link }]) => (
            <Button
              variant="ghost"
              key={key}
              onClick={() => {
                navigate(link);
              }}
            >
              {text}
            </Button>
          ))}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
