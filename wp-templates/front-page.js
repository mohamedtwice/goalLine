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
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
              {allStories.slice(1, 4).map((post) => {
                const dated = formatDistanceToNow(parseISO(post.node.date), )
                return (
                    <div className="flex flex-col">
                      <p className="flex items-center font-sans font-bold text-sm text-gray-600 text-opacity-40 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mr-2.5"></span>
                        {post.node.categories && (
                            <div>
                              {post.node.categories.nodes.map((cat, index) => {
                                // console.log(post)
                                return (
                                    <Link href={cat.uri}>
                                    <span className="text-xs after:content-['_➕_'] last-of-type:after:content-['']">{cat.name}</span>
                                    </Link>
                                );
                              })}
                            </div>
                        )}
                        {/*Headlines*/}
                      </p>

                      <span className="text-xl font-bold hover:underline">
                        <Link href={post.node.uri}>{post.node.title}
                      </Link>
                      </span>
                      <p className="text-gray-600 text-opacity-40 text-xs mt-1.5 font-sans">{dated} by
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
                <a href="/category/headlines/" className="font-sans text-xs font-bold pt-5 flex w-full">SEE MORE HEADLINES

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
                const dated = formatDistanceToNow(parseISO(post.node.date), )
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


                <span className="text-white font-bold text-3xl hover:underline leading-10">
                  <Link href={post.node.uri}>
                  {post.node.title}
                </Link>
                  </span>
                <p className="text-white text-opacity-50 text-xs mt-4 font-sans">{dated} by
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
          {/*<div className="max-w-xl mb-6">*/}
          {/*  <h2*/}
          {/*      // className="text-4xl font-bold tracking-tight sm:text-5xl border-b-4 border-afroRed pb-6 text-afroRed">*/}
          {/*      className="text-4xl font-bold tracking-tight sm:text-5xl border-b-4 border-white pb-6 text-gray-800">*/}
          {/*    Latest News*/}
          {/*  </h2>*/}
          {/*  <span className="inline-block mt-5 italic text-base text-gray-700 bg-white px-4 py-1 rounded-2xl">Scroll to the right for more &#8594;</span>*/}
          {/*</div>*/}

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
                      <Link href={`{story.node.uri}`}>
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
                              <Link href={`${story.node.uri}`}>
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
          </div>
        </section>


        <section className="bg-black py-12 md:py-16">
          <div className="container mx-auto px-8 max-w-[1200px] w-full">
            <div className="max-w-screen mx-auto sm:p-10 relative">
              <div className="lg:flex">

                <div className="lg:w-6/12">
                  {allStories.slice(0, 1).map((post) => {
                    const formattedMonth = format(parseISO(post.node.date), "LLL", { locale: enUS })
                    const formattedDay = format(parseISO(post.node.date), "d", { locale: enUS })
                    return (
                  <div className="relative h-full w-full flex items-end justify-start text-left bg-cover bg-center min-h-[400px] lg:min-h-[300px]">
                       {/*style={{minHeight: "300px", backgroundImage: "url(https://media.gettyimages.com/photos/at-the-the-network-tolo-televised-debate-dr-abdullah-abdullah-with-picture-id1179614034?k=6&m=1179614034&s=612x612&w=0&h=WwIX3RMsOQEn5DovD9J3e859CZTdxbHHD3HRyrgU3A8=)",}}>*/}
                    <Image src={post.node.featuredImage.node.sourceUrl} layout="fill" objectFit="cover" objectPosition="center" />
                    <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                    <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-start flex-wrap ">
                      <div className="flex-auto flex flex-row flex-wrap w-[85%]">
                        {post.node.categories.nodes.map((cat, index) => {
                        console.log(post)
                        return (
                            <Link href={cat.uri} className="z-50">
                              <h3 className="flex flex-row items-center gap-4 text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500 mr-4 flex-wrap mb-2">
                                {cat.name}
                              </h3>
                            </Link>
                        );
                      })}
                      </div>
                      <div className="text-white font-regular flex flex-col justify-start flex-none w-[15%]">
                        <span className="text-3xl leading-0 font-semibold">{formattedDay}</span>
                        <span className="-mt-3">{formattedMonth}</span>
                      </div>
                    </div>
                    <main className="p-8 z-10 text-xl tracking-tight font-semibold leading-7 mb-3 inline-block text-white hover:underline">
                      <Link href={post.node.uri}>
                         <span className="text-2xl tracking-tight font-semibold leading-7 mb-3 inline-block text-white hover:underline">
                        {post.node.title}
                         </span>
                      </Link>
                      <p className="text-gray-200 text-xs">
                        By <a href="#" className="text-white font-semibold hover:underline">{post.node.author.node.name}</a>&nbsp;&nbsp;|&nbsp;&nbsp;5 mins read
                      </p>
                    </main>

                  </div>
                        )})}
                </div>


                <div className="lg:w-6/12 md:grid grid-cols-2 grid-rows-2 flex-wrap">
                  {allStories.slice(1, 5).map((post) => {
                    const formattedMonth = format(parseISO(post.node.date), "LLL", { locale: enUS })
                    const formattedDay = format(parseISO(post.node.date), "d", { locale: enUS })
                    return (
                        <div className="relative w-full flex items-end justify-start text-left bg-cover bg-center min-h-[300px]">
                             {/*style={{minHeight: "300px", backgroundImage:"url(https://media.gettyimages.com/photos/afghan-president-ashraf-ghani-arrives-to-the-welcoming-ceremony-the-picture-id694155252?k=6&m=694155252&s=612x612&w=0&h=IIJPetzJL-hAgPkE4hm2wUKvO4YOav8jJp484CgLEUs=)",}}>*/}
                          <Image src={post.node.featuredImage.node.sourceUrl} layout="fill" objectFit="cover" objectPosition="center" />
                          <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                          <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-start flex-wrap ">
                            <div className="flex-auto flex flex-row flex-wrap w-[85%]">
                              {post.node.categories.nodes.map((cat, index) => {
                              console.log(post)
                              return (
                                  <Link href={cat.uri} className="z-50">
                                    <h3 className="flex flex-row items-center gap-4 text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500 mr-4 flex-wrap mb-2">
                                      {cat.name}
                                    </h3>
                                  </Link>
                              );
                            })}
                            </div>
                            <div className="text-white font-regular flex flex-col justify-start flex-none w-[15%]">
                              <span className="text-3xl leading-0 font-semibold">{formattedDay}</span>
                              <span className="-mt-3">{formattedMonth}</span>
                            </div>
                          </div>
                          <main className="p-5 z-10 text-white text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">
                            <Link href={post.node.uri}>
                              <span className="text-xl tracking-tight font-medium leading-7 font-regular text-white hover:underline">
                              {post.node.title}
                              </span>
                            </Link>
                            <p className="text-gray-200 text-xs">
                              By <a href="#" className="text-white font-semibold hover:underline">{post.node.author.node.name}</a>&nbsp;&nbsp;|&nbsp;&nbsp;5 mins read
                            </p>
                          </main>

                        </div>
                    )
                  })}

                </div>

              </div>
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
