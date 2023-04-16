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
import Image from "next/image";
import React from "react";
import { parseISO } from 'date-fns';
import format from 'date-fns/format';
import { enUS } from 'date-fns/locale';

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

        <div className="bg-[#b1b1bd] bg-opacity-10 py-10">
          <div className="container mx-auto grid grid-cols-12 md:gap-10 font-serif max-w-[1200px] w-full px-8">
            <div className="md:col-span-4 col-span-12 space-y-12 py-6 flex flex-col">
              {allStories.slice(0, 3).map((post) => {
                return (
                    <div className="flex flex-col">
                      <h3 className="flex items-center font-sans font-bold text-xs text-gray-600 text-opacity-40 mb-3.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mr-2.5"></span>
                        {post.node.categories && (
                            <div>
                              {post.node.categories.nodes.map((cat, index) => {
                                // console.log(post)
                                return (
                                    <Link href={cat.uri}>
                                    <span className="after:content-['_➕_'] last-of-type:after:content-['']">{cat.name}</span>
                                    </Link>
                                );
                              })}
                            </div>
                        )}
                        {/*Headlines*/}
                      </h3>
                      <a href="#" className="font-medium hover:underline">{post.node.title}</a>
                      <p className="text-gray-600 text-opacity-40 text-xs mt-3.5 font-sans">36 minutes ago by
                        <a href="#" className="text-blue-400 hover:underline">&nbsp;{post.node.author.node.name}</a>
                      </p>
                    </div>
                )
              })}
              <div className="flex flex-col w-full">
                <div className="w-full flex h-0.5 bg-yellow-700 bg-opacity-10">
                  <div className="w-1/2 bg-red-500 h-full">
                  </div>
                </div>
                <a href="#" className="font-sans text-xs font-bold pt-5 flex w-full">SEE MORE HEADLINES

                  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                       strokeLinejoin="round" className="w-3.5 ml-auto text-red-500">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg></a>
              </div>
            </div>

            <div
                className="xl:col-span-8 lg:col-span-8 md:col-span-8 col-span-12 relative bg-cover bg-no-repeat bg-center flex order-first">
                {/*style={{backgroundImage:"url('https://images.unsplash.com/photo-1602196885350-c986e02d0b79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=929&q=80')"}}>*/}

              {allStories.slice(0, 1).map((post) => {
                return (
                    <>
              <Image src={post.node.featuredImage.node.sourceUrl} layout="fill" objectFit="cover" objectPosition="center" />
              <div className="z-50 w-full">
                      <span
                  className="text-xs font-sans font-bold text-white absolute left-6 top-6 pb-2.5 border-b-2 border-red-500">ISTANBUL, TURKEY</span>
              <div
                  className="flex flex-col items-center justify-end text-center pt-48 flex-grow-1 px-12 pb-10 bg-gradient-to-t from-black h-full">

                {post.node.categories && (
                    <div className="flex flex-row gap-4 flex-wrap">
                      {post.node.categories.nodes.map((cat, index) => {
                        console.log(post)
                        return (
                            <Link href={cat.uri} className="z-50">
                            <h3 className="flex flex-row items-center font-sans font-bold text-xs text-red-500 mb-4">
                              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mr-2.5"></span>
                              {cat.name}
                            </h3>
                            </Link>
                        );
                      })}
                    </div>
                )}

                <a href="#" className="text-white text-3xl hover:underline leading-10">
                  {post.node.title}
                </a>
                <p className="text-white text-opacity-50 text-xs mt-4 font-sans">36 minutes ago by
                  <a href="#" className="text-blue-400 hover:underline">
                    &nbsp;{post.node.author.node.name}
                  </a>
                </p>
              </div>
              </div>
                    </>
              )
              })}
            </div>


          </div>
        </div>


        <div className="px-5 py-10 md:py-20">
          <div className="container mx-auto max-w-[1200px] w-full px-8">
          <div className={styles.card__container}>
            {allStories.map((post) => {
              console.log(post)
              const formattedDate = format(parseISO(post.node.date), "MMMM do, YYY", { locale: enUS })
              return (
                <Link index={post.id} href={post.node.uri}>
                  <div className={styles.card}>
                    {/*<div*/}
                    {/*  className={styles.card__cover}*/}
                    {/*  style={{*/}
                    {/*    backgroundImage: `url(${post.node.featuredImage.node.sourceUrl})`,*/}
                    {/*  }}*/}
                    {/*>*/}
                    <div className="relative min-h-[250px]">
                     <Image src={post.node.featuredImage.node.sourceUrl} layout="fill" objectFit="cover" objectPosition="center" />
                      {post.node.categories && (
                        <div className={styles.cat__container}>
                          {post.node.categories.nodes.map((cat, index) => {
                            return (
                                <Link href={cat.uri}>
                              <div className={styles.card__tag}>{cat.name}</div>
                                </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className={styles.card__body}>
                      <div className={styles.card__title}>
                        {post.node.title}
                      </div>
                      <p className="-mt-2 mb-1">{formattedDate}</p>
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
        </div>
        </div>

        <section className=" py-12 md:py-16">
          <div className="container mx-auto px-8 max-w-[1200px] w-full">
          <div className="max-w-xl mb-6">
            <h2
                // className="text-4xl font-bold tracking-tight sm:text-5xl border-b-4 border-afroRed pb-6 text-afroRed">
                className="text-4xl font-bold tracking-tight sm:text-5xl border-b-4 border-white pb-6 text-gray-800">
              Latest News
            </h2>
            <span className="inline-block mt-5 italic text-base text-gray-700 bg-white px-4 py-1 rounded-2xl">Scroll to the right for more &#8594;</span>
          </div>

          <div className={styles.big_cards_js}>
            {/*<div className={styles.big_cards_js_gradient_left} />*/}
            {/*<div className={styles.big_cards_js_gradient_right} />*/}
            <div className={styles.tailwind_cards_here}>
                {allStories.map((story, index) => {

                const title = story.node.title;
                const slug = story.node.slug;
                const formattedDate = format(parseISO(story.node.date), "MMMM do, YYY", { locale: enUS })
                const categories = story.node.categories;
                const img = story.node.featuredImage?.node?.sourceUrl;

                return (
                    <div key={index} className={styles.card1}>
                      <Link href={`/news/${slug}`}>
                        <a>
                          {img &&
                              <div className="bg-white">
                                <Image
                                    className="object-cover w-full h-56 lg:h-72"
                                    src={img}
                                    alt="Picture of the author"
                                    width={500}
                                    height={300}
                                    loading="lazy"
                                />
                              </div>
                          }

                          <div className="p-6 bg-white">
                            <h5 className="text-xl font-bold whitespace-pre-wrap">
                              {title}
                            </h5>

                            <p className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">
                              {formattedDate}
                            </p>

                            <div
                                className="inline-block pb-1 mt-4 font-medium text-blue-600 border-b border-blue-500 "
                            >
                              <Link href={`/news/${slug}`}>
                                <a>
                                  Read story
                                  <span aria-hidden="true">&rarr;</span>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                )
              })}
            </div>
          </div>
          <div className="max-w-xl mb-10">
            <Link href={'/news/'}>
              <a>
                <p className="mt-10 text-2xl font-bold tracking-tight  text-white">
                  View all news &#8594;
                </p>
              </a>
            </Link>
          </div>
          </div>
        </section>

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
        author {
                node {
                  name
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
