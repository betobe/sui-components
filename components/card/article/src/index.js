/* eslint-disable react/prop-types */
import React, { PropTypes } from 'react'
import cx from 'classnames'
import Commentsquare from '@schibstedspain/sui-svgiconset/lib/Commentsquare'
import ImageLazyLoad from '@schibstedspain/sui-image-lazy-load'
import TagChip from '@schibstedspain/sui-tag-chip'

const CardArticleMedia = ({ src, alt = '' }) => (
  <div className='sui-CardArticle-media'>
    <img src={src} alt={alt} />
  </div>
)

const _renderComments = ({ icon, url, count }, Link) => {
  const IconComment = icon || Commentsquare

  return (
    <Link href={url} className='sui-CardArticle-comments'>
      <IconComment svgClass='sui-CardArticle-commentsIcon' />
      {count}
    </Link>
  )
}

/**
 * Article card containing a media object, title, description and some editorial
 * information (tag and comments).
 */
export default function CardArticle ({
  linkFactory: Link,
  link,
  media,
  title,
  description,
  tag,
  comments,
  lazyLoad,
  tagClassName,
  featured
}) {
  const suiTagClassName = cx('sui-CardArticle-tag', tagClassName)
  const cardInfoClassName = cx('sui-CardArticle-info', {
    'is-featured': featured
  })

  return (
    <div className='sui-CardArticle'>
      <Link href={link} className='sui-CardArticle-link'>
        {lazyLoad
          ? <ImageLazyLoad {...lazyLoad} {...media} />
          : <CardArticleMedia {...media} />
        }
      </Link>
      <div className={cardInfoClassName}>
        <div className='sui-CardArticle-infoInner'>
          <TagChip label={tag.text} link={tag.url} className={suiTagClassName} />
          {comments && _renderComments(comments, Link)}
        </div>
      </div>
      <Link href={link} className='sui-CardArticle-link'>
        <div className='sui-CardArticle-content'>
          {title &&
            <header className='sui-CardArticle-title'>{title}</header>
          }
          <div className='sui-CardArticle-description'>{description}</div>
        </div>
      </Link>
    </div>
  )
}

CardArticle.propTypes = {
  /**
   * URL for the link that wraps the whole card.
   */
  link: PropTypes.string.isRequired,
  /**
   * Factory for the component that will hold the card link.
   */
  linkFactory: PropTypes.func,
  /**
   * Media object (now only image).
   */
  media: PropTypes.shape({
    /**
     * Alternative text for the image.
     */
    alt: PropTypes.string,
    /**
     * Image source.
     */
    src: PropTypes.string.isRequired
  }),
  /**
   * Optional card title.
   */
  title: PropTypes.string,
  /**
   * Text description.
   */
  description: PropTypes.string.isRequired,
  /**
   * Editorial tag object.
   */
  tag: PropTypes.shape({
    /**
     * Tag URL.
     */
    url: PropTypes.string.isRequired,
    /**
     * Tag translated text.
     */
    text: PropTypes.string.isRequired,
    /**
     * Tag type used to style it as desired.
     */
    type: PropTypes.string
  }),
  /**
   * Comments object.
   */
  comments: PropTypes.shape({
    /**
     * Comments URL.
     */
    url: PropTypes.string.isRequired,
    /**
     * Comments count.
     */
    count: PropTypes.number.isRequired,
    /**
     * Comments custom icon (React component).
     */
    icon: PropTypes.func
  }),
  /**
   * Featured flag
   */
  featured: PropTypes.bool,
  /**
   *  Custom tag class name
   */
  tagClassName: PropTypes.string,
  /**
   * Lazy load flag / config.
   */
  lazyLoad: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
}

CardArticle.defaultProps = {
  featured: false,
  linkFactory: ({ href, className, children }) =>
    <a href={href} className={className}>{children}</a>
}

CardArticle.displayName = 'CardArticle'
