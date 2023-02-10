import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
// import { seedRecipes } from "./data/seed";

// seedRecipes();

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      {/* cette div évite que lors du chargement de l'outlet, le footer remonte sous le header une fraction de seconde */}
      <div className="flex-fill d-flex flex-column">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
