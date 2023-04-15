import { Assignment } from "./src/model/school/Assignment";
import { CardBoardWrapper } from "./src/wrapper/CardBoardWrapper";

const main = async () => {
    const schoolTask = new Assignment("Test", "Test", "submitted", new Date(), new Date(), new Date(), "Test", 100);
    const card = new CardBoardWrapper(schoolTask);
    console.log(card.toString());
}

main();