import { placeholderCaption, storyAssets, type StoryAssetKey } from '../data/storyAssets';

export function StoryFigure({ asset }: { asset: StoryAssetKey }) {
  const image = storyAssets[asset];
  return <figure className="story-figure"><img src={image.src} alt={image.alt} width={400} height={300} loading="lazy" /><figcaption><span>{image.caption}</span><small>{placeholderCaption}</small></figcaption></figure>;
}
