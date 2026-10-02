import { useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import { isCrmOnlyHost } from "@/lib/crm-base";

// Rendered once in App so every public route (current and future) gets the same footer.
const GlobalFooter = () => {
  const { pathname } = useLocation();
  if (isCrmOnlyHost() || pathname.startsWith("/crm")) return null;
  return <Footer />;
};

export default GlobalFooter;
