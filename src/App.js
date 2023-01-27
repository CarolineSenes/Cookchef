import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import { useState } from "react";
import Homepage from './pages/Homepage/Homepage'
import Admin from './pages/Admin/Admin'
// import { seedRecipes } from "./data/seed";

// seedRecipes();

function App() {
  // système très simple de routing en ajoutant un état local contenant la page courante affichée
  const [page, setPage] = useState('homepage')

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header setPage={setPage}/>
      {page === 'homepage' && <Homepage />}
      {page === 'admin' && <Admin />}
      <Footer />
    </div>
  );
}

export default App;
