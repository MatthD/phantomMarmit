import {convertCards, extractCardInfos} from '../helpers/data-manipulation';

describe('Data manipulation', () => {
  it('Should be able to convert document elements to array', () => {
    const a = document.createElement('a');
    const b = document.createElement('a');
    const c = document.createElement('a');
    const p = document.createElement('p');
    p.appendChild(a);
    p.appendChild(b);
    p.appendChild(c);
    const converted = convertCards(p.querySelectorAll('a'));
    expect(converted).toEqual([a, b, c]);
  });
  it('Should be able to extract Marmiton cards informations', () => {
    const dummyUrl = 'http://google.com';
    const a = document.createElement('a');
    const h4 = document.createElement('h4');
    a.setAttribute('href', '/123456/42');
    h4.textContent = 'test';
    h4.setAttribute('class', 'recipe-card__title');
    a.appendChild(h4);

    const extracted = extractCardInfos(dummyUrl)(a);
    expect(extracted).toEqual({
      title: 'test',
      url: 'http://google.com/123456/42',
    });
  });
});
