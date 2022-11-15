export default function smoothScroll() {
  const cardHeight = document
    .querySelector('ul')
    .firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2.5,
    behavior: 'smooth',
  });
}
