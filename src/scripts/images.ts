/**
 * Images on a page switch: before the new page swaps in, its first images
 * are loaded (briefly capped), so the crossfade shows real photos instead
 * of blanks that Safari then paints in strip by strip on a cold cache.
 * Those same images are then decoded before the swap, so Safari's
 * snapshot of the new page has their pixels instead of empty boxes.
 */

/** How many of the new page's images to wait for, and for how long at most */
const FIRST_IMAGES = 8;
const MAX_WAIT_MS = 450;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Load an image the same way the page will (srcset + sizes pick the same file) */
function preload(source: HTMLImageElement): Promise<void> {
  const img = new Image();
  const sizes = source.getAttribute('sizes');
  const srcset = source.getAttribute('srcset');
  if (sizes) img.sizes = sizes;
  if (srcset) img.srcset = srcset;
  img.src = source.getAttribute('src')!;
  return img.decode().catch(() => {});
}

/** The new page's first images, the ones the crossfade shows */
const firstImages = (doc: Document) =>
  [...doc.querySelectorAll<HTMLImageElement>('main img[src]')].filter((img) => img.getAttribute('src')).slice(0, FIRST_IMAGES);

export function preloadNextPageImages(event: Event): void {
  const navigation = event as Event & { loader: () => Promise<void>; newDocument: Document };
  const load = navigation.loader;
  navigation.loader = async () => {
    await load();
    await Promise.race([Promise.all(firstImages(navigation.newDocument).map(preload)), wait(MAX_WAIT_MS)]);
  };
}

/**
 * Astro images decode asynchronously, which in Safari leaves them blank in
 * the page-switch snapshot and makes them blink in. The first ones (already
 * loaded above) decode in step with the swap instead.
 */
export function decodeFirstImages(event: Event): void {
  const { newDocument } = event as Event & { newDocument: Document };
  firstImages(newDocument).forEach((img) => img.setAttribute('decoding', 'sync'));
}
