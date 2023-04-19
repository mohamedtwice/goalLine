import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu,
  Post,
  FeaturedImage,
  SEO,
} from '../components';
import Link from "next/link";
import Image from "next/image";
import format from "date-fns/format";
import {parseISO} from "date-fns";
import {enUS} from "date-fns/locale";
import React from "react";

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { name, posts } = props.data.nodeByUri;

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <EntryHeader title={`${name}`} />
          <Container>
            {/*{posts.edges.map((post) => (*/}
            {/*  <Post*/}
            {/*    title={post.node.title}*/}
            {/*    content={post.node.content}*/}
            {/*    date={post.node.date}*/}
            {/*    author={post.node.author?.node.name}*/}
            {/*    uri={post.node.uri}*/}
            {/*    featuredImage={post.node.featuredImage?.node}*/}
            {/*  />*/}
            {/*))}*/}

            <div className="max-w-screen-xl mx-auto my-5 sm:my-10 p-5 sm:p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 flex-wrap">
                {posts.edges.map((post) => {
                  console.log(post)
                  const formattedDate = format(parseISO(post.node.date), "MMMM do, YYY", {locale: enUS})
                  const formattedMonth = format(parseISO(post.node.date), "LLL", { locale: enUS })
                  const formattedDay = format(parseISO(post.node.date), "d", { locale: enUS })
                  return (
                      <div className=" h-[450px] relative w-full flex items-end justify-start text-left bg-cover bg-center">
                        <Image src={post.node.featuredImage.node.sourceUrl} layout="fill" objectFit="cover" objectPosition="center" />

                        <div
                            className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                        <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center flex-wrap ">
                          {post.node.categories.nodes.map((cat, index) => {
                            console.log(post)
                            return (
                                <Link href={cat.uri} className="z-50 flex-auto">
                                  <h3 className="flex flex-row items-center gap-4 text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500 mr-4 flex-wrap mb-2">
                                    {cat.name}
                                  </h3>
                                </Link>
                            );
                          })}
                          <div className="text-white font-regular flex flex-col justify-start flex-none">
                            <span className="text-3xl leading-0 font-semibold">{formattedDay}</span>
                            <span className="-mt-3">{formattedMonth}</span>
                          </div>
                        </div>
                        <main className="p-5 z-10">
                          <a href={post.node.uri}
                             className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">
                            {post.node.title}
                          </a>
                          <p className="text-gray-200 text-xs">
                          By <a href="#" className="text-white font-semibold hover:underline">{post.node.author.node.name}</a>&nbsp;&nbsp;|&nbsp;&nbsp;5 mins read
                        </p>
                        </main>

                      </div>
                  )
                })}
              </div>
            </div>

          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetCategoryPage(
    $uri: String!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
        posts {
          edges {
            node {
              id
              title
              content
              date
              uri
          excerpt
              ...FeaturedImageFragment
              categories {
            nodes {
              description
              name
              uri
            }
          }
              author {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
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

Component.variables = ({ uri }) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
