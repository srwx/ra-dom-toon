import Card from "components/Card";
import style from "./Body.module.css";

const cards = ["card1", "card2", "card3"];

export default function Body() {
  return (
    <div className={style.container}>
      <h2 className={style.header}>Trending in RA-DOM-TOON</h2>
      <div className={style.cards_container}>
        {cards.map((card, index) => (
          <Card key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
