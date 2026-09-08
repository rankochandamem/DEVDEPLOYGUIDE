import ImageBlock from './ImageBlock'

export default function MediaBlock({ type = 'image', ...props }) {
  if (type === 'image') return <ImageBlock {...props} />

  if (type === 'video') {
    return (
      <figure className="media-block">
        <div className="media-frame">
          <video controls className="media-video">
            <source src={props.src} />
          </video>
        </div>
        {props.caption && <figcaption className="media-caption">{props.caption}</figcaption>}
      </figure>
    )
  }

  return <ImageBlock {...props} />
}
