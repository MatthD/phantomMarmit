function convertCards(cards: NodeListOf<Element>) {
  return Array.from(cards);
}

function extractCardInfos(BASE_URL: string) {
  return (card: Element): InfoCard | null => {
    let url = card.getAttribute('href');
    url &&= `${BASE_URL}${url}`;
    const title = card.querySelector('.recipe-card__title')?.textContent;

    return !url || !title ? null : {url, title};
  };
}

type Args = {
  search?: string;
};

type InfoCard = {
  url: string;
  title: string;
};

export {InfoCard, Args, convertCards, extractCardInfos};
