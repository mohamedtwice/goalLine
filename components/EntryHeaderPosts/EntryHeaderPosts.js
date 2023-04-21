import className from 'classnames/bind';
import { Heading, PostInfo, Container, FeaturedImage } from '../../components';
import styles from './EntryHeaderPosts.module.scss';

let cx = className.bind(styles);

export default function EntryHeaderPosts({ title, image, date, author, className }) {
  const hasText = title || date || author;

  return (
      <>
    <div className={cx(['component', className])}>
      {hasText && (
          <Container>
            {!!title && <Heading className={cx('title')}>{title}</Heading>}
            <PostInfo
              className={cx('byline')}
              author={author}
              date={date}
            />
          </Container>
      )}
    </div>


  {/*      <div>*/}
  {/*        {image && (*/}
  {/*    <FeaturedImage*/}
  {/*        image={image}*/}
  {/*        className={cx('image')}*/}
  {/*        priority*/}
  {/*    />*/}
  {/*)}*/}
  {/*      </div>*/}
  </>
);
}
