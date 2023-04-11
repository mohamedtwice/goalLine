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
  SEO,
} from '../components';
import Link from 'next/link';

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
          <div className="">

            <Link href="/sample-page/" className="group relative block bg-black">
              <div>
              <img
                  alt="Developer"
                  src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
              />

              <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                  Developer
                </p>

                <p className="text-xl font-bold text-white sm:text-2xl">Tony Wayne</p>

                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div
                      className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <p className="text-sm text-white">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                      perferendis hic asperiores quibusdam quidem voluptates doloremque
                      reiciendis nostrum harum. Repudiandae?
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </Link>

          </div>
          {/*<Hero title={'Front Page'} />*/}
          <div className="text-center">
            <p>This page is utilizing the "front-page" WordPress template.</p>
            <code>wp-templates/front-page.js</code>
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
