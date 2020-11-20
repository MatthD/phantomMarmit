'phantombuster package: 5';
'phantombuster command: nodejs';
'phantombuster flags: save-folder';

import Buster from 'phantombuster';
import {launch} from 'puppeteer';
import {
  InfoCard,
  extractCardInfos,
  convertCards,
} from './helpers/data-manipulation';

const buster = new Buster<Args>();
const {search} = buster.argument;

const BASE_URL = 'https://www.marmiton.org';

main();

async function main() {
  if (!search || typeof search !== 'string') {
    throw new Error('A search string must be sent to Marmiton');
  }

  const browser = await launch({
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(BASE_URL);
  await page.waitForSelector('#JS-recipe-home-search__form');

  /** Simple Search with arg send by user config */
  await page.type('#JS-recipe-home-search__form input', search);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  /** Transform data for export */
  const curryExtractCardInfos = extractCardInfos(BASE_URL);
  const marmitonRes = (await page.evaluate((): InfoCard[] => {
    const cards = document.querySelectorAll('.recipe-card-link');
    return convertCards(cards)
      .map(curryExtractCardInfos)
      .filter((card): card is InfoCard => Boolean(card));
  })) as InfoCard[];

  await buster.setResultObject(marmitonRes);

  await page.close();
  await browser.close();
  // eslint-disable-next-line no-process-exit
  process.exit();
}

type Args = {
  search?: string;
};
