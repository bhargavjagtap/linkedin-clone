import Head from 'next/head'
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from "../atoms/modalAtom";
import Widgets from "../components/Widgets";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import { getSession } from 'next-auth/react';
import {connectToDatabase} from '../util/mongodb';

export default function Home({posts, articles}) {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/icons8-linkedin-48.png" />
      </Head>
      <Header/>
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar/>
          <Feed posts={posts}/> 
        </div>
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
      </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
    },
  };
}

// Get posts on SSR
const {db} = await connectToDatabase();
const posts = await db
  .collection('posts')
  .find()
  .sort({timestamp: -1})
  .toArray();

  const news = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json());
  console.log("news==>",news);
  // console.log("posts==>",posts)

  return {
    props: {
      session,
      articles: news.articles,
      posts:posts.map((post) => (
        {
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt
      }))
    },
  };
}
