declare module "helpers/data-manipulation" {
    function convertCards(cards: NodeListOf<Element>): Element[];
    function extractCardInfos(BASE_URL: string): (card: Element) => InfoCard | null;
    type Args = {
        search?: string;
    };
    type InfoCard = {
        url: string;
        title: string;
    };
    export { InfoCard, Args, convertCards, extractCardInfos };
}
declare module "main" { }
