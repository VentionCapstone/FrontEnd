import { renderedImageType } from '@src/types/accommodationImages.types';

export function cutImgUrl(url: string) {
  const imageUrl = new URL(url);
  imageUrl.search = '';
  return imageUrl.toString();
}
export function getImageSources({ url, rows = 1, cols = 1 }: renderedImageType) {
  const cuttedUrl = cutImgUrl(url);

  return {
    src: `${cuttedUrl}?w=${cols}&h=${rows}&fit=crop&auto=format`,
    srcSet: `${cuttedUrl}?w=${cols}&h=${rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}
