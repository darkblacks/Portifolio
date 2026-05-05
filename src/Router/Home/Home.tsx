import "./Style/home.css";
import Initial from "./Pages/Initial";
import Skills from "./Pages/Skills";
import Code from "./Pages/Code";
import Portfolio from "./Pages/Portfolio";
import Contato from "./Pages/Contato";

export default function Home() {
  return (
    <main className="home-page">
      <Initial />
      <Skills />
      <Code />
      <Portfolio />
      <Contato />
    </main>
  );
}