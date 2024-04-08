import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css";

console.log(styles)

function Layout() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
