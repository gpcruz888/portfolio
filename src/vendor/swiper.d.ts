export default class Swiper {
  constructor(element: HTMLElement, options: {
    allowTouchMove: boolean;
    parallax: boolean;
    slidesPerView: number;
  });
  activeIndex: number;
  setProgress(progress: number, speed: number): void;
  destroy(): void;
}
