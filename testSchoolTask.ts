import { Assignment } from "./task/school/Assignment";
import { CardBoardWrapper } from "./task/wrapper/CardBoardWrapper";

const main = async () => {
    const schoolTask = new Assignment("Test", "Test", "submitted", new Date(), new Date(), new Date(), "Test", 100);
    const card = new CardBoardWrapper(schoolTask);
    console.log(card.toString());
}

main();