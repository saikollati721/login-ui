import { SessionContext } from "../../contexts/session-context.ts";
import { Card } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import FooterComponent from "../common/footer.tsx";
import HeaderNav from "../common/header.tsx";

const Home = () => {
  const auth = useContext(SessionContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = () => {
    setLoading(true);
    
  };
  return (
    <>
      <HeaderNav />
      <div className="mt-[64px] grid grid-cols-2 md:grid-cols-5 gap-1">
    
      </div>
      <FooterComponent />
    </>
  );
};

export default Home;
