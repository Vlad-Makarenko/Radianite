import shirt from "../assets/cards/Shirt.png";
import Astra from "../assets/cards/Astra.png";
import Breach from "../assets/cards/Breach.png";
import Brimstone from "../assets/cards/Brimstone.png";
import Chamber from "../assets/cards/Chamber.png";
import Cypher from "../assets/cards/Cypher.png";
import Fade from "../assets/cards/Fade.png";
import Jett from "../assets/cards/Jett.png";
import Kayo from "../assets/cards/Kayo.png";
import Killjoy from "../assets/cards/Killjoy.png";
import Neon from "../assets/cards/Neon.png";
import Omen from "../assets/cards/Omen.png";
import Phoenix from "../assets/cards/Phoenix.png";
import Raze from "../assets/cards/Raze.png";
import Reyna from "../assets/cards/Reyna.png";
import Sage from "../assets/cards/Sage.png";
import Sova from "../assets/cards/Sova.png";
import Viper from "../assets/cards/Viper.png";
import Yoru from "../assets/cards/Yoru.png";

export const chooseCard = (card, setDisplayName) => {
  switch (card?.name) {
    case "Astra.png":
      setDisplayName(Astra);
      break;
    case "Breach.png":
      setDisplayName(Breach);
      break;
    case "Brimstone.png":
      setDisplayName(Brimstone);
      break;
    case "Chamber.png":
      setDisplayName(Chamber);
      break;
    case "Cypher.png":
      setDisplayName(Cypher);
      break;
    case "Fade.png":
      setDisplayName(Fade);
      break;
    case "Jett.png":
      setDisplayName(Jett);
      break;
    case "Kayo.png":
      setDisplayName(Kayo);
      break;
    case "Killjoy.png":
      setDisplayName(Killjoy);
      break;
    case "Neon.png":
      setDisplayName(Neon);
      break;
    case "Omen.png":
      setDisplayName(Omen);
      break;
    case "Phoenix.png":
      setDisplayName(Phoenix);
      break;
    case "Raze.png":
      setDisplayName(Raze);
      break;
    case "Reyna.png":
      setDisplayName(Reyna);
      break;
    case "Sage.png":
      setDisplayName(Sage);
      break;
    case "Sova.png":
      setDisplayName(Sova);
      break;
    case "Viper.png":
      setDisplayName(Viper);
      break;
    case "Yoru.png":
      setDisplayName(Yoru);
      break;
    default:
      setDisplayName(shirt);
      break;
  }
};
