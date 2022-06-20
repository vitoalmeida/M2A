import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto max-w-[290px] md:max-w-[738px] xl:max-w-[1220px] mb-9 duration-300">
        <Header />
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
