import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout, { siteTitle } from '@/components/Layout'

import Link from "next/link"
import utilStyle from "../styles/utils.module.css"
import { getPostsData } from '@/lib/post'

const inter = Inter({ subsets: ['latin'] })

// SSG の場合
// getStaticProps は Next.js で用意されている(override?)
export async function getStaticProps() {
  const allPostsData =  getPostsData() // id, title, date, thumbnail

  return {
    props: {
      allPostsData: Array.isArray(allPostsData) ? allPostsData : [],
    }
  }
}

export default function Home({ allPostsData }) {
  return <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyle.headingMd}>
      <p>
        Flutter エンジニアの田中です。自作のブログを作成中です。好きな言語は英語です。
      </p>
    </section>

    <section>
      <h2>📝エンジニアのブログ</h2>
    <div className={styles.grid}>
      {allPostsData.map(({id, title, date, thumbnail}) => (
       <article key={id}>
       <Link href={`/posts/${id}`}>
         <img src={thumbnail} className={styles.thumbnailImage}/>
       </Link>
       <Link legacyBehavior href={`/posts/${id}`}>
         <a className={utilStyle.boldText}>{title}</a>
       </Link>
       <br/>
       <small className={utilStyle.lightText}>{date}</small> 
     </article>  
      ))}
    </div>
    </section>


  </Layout>
}
