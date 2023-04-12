import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  Post,
  SEO,
} from '../components';
import styles from "../components/Post/Post.module.scss";
import Link from "next/link";

export default function Component() {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
  const allStories = data?.allPosts?.edges ?? [];
  console.log(allStories)

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <div className={styles.card__container}>
            {allStories.map((post) => {
              console.log(post)
              return (
                <Link index={post.id} href={post.node.uri}>
                  <div className={styles.card}>
                    <div
                      className={styles.card__cover}
                      style={{
                        backgroundImage: `url(${post.node.featuredImage.node.sourceUrl})`,
                      }}
                    >
                      {post.node.categories && (
                        <div className={styles.cat__container}>
                          {post.node.categories.nodes.map((cat, index) => {
                            return (
                              <div className={styles.card__tag}>{cat.name}</div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className={styles.card__body}>
                      <div className={styles.card__title}>
                        {post.node.title}
                      </div>
                      <div
                        className={styles.card__desc}
                        dangerouslySetInnerHTML={{
                          __html: post.node.excerpt.substring(0, 100),
                        }}
                      />
                    </div>
                  </div>
                </Link>

                //   title={post.node.title}
                //   content={post.node.content}
                //   date={post.node.date}
                //   author={post.node.author?.node.name}
                //   uri={post.node.uri}
                //   featuredImage={post.node.featuredImage?.node}
                //   categories={post.node.categories}
                // />
              );
            })}
          </div>
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    allPosts: posts(where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          date
          title
          content
          uri
          excerpt
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              description
              name
              uri
            }
          }
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    allPosts:posts(where: {orderby: {field: DATE, order: DESC}}) {
    edges {
      node {
        id
        title
        date
        content
        excerpt
        featuredImage {
          node {
            altText
            id
            sourceUrl
            srcSet
          }
        }
        categories {
          nodes {
            categoryId
            id
            name
            uri
          }
        }
        terms {
          nodes {
            description
            name
            uri
            id
          }
        }
      }
    }
  }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
