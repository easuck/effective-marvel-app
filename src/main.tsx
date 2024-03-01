import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from "./components/header/header.tsx";
import Footer from "./components/footer/footer.tsx"
import Characters from "./components/characters/characters.tsx";
import CharacterInfo from "./components/characterInfo/characterInfo.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Header/>
      <Characters/>
      <CharacterInfo image="../../../public/spider_man.jpeg" name="spider-man"
      description="this is spider-man" comics={["comics 1", "comics 2", "comics 3"]}/>
      <Footer/>
  </React.StrictMode>,
)
