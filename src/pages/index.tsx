import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { postService } from '@/services/post';
import styles from '@/styles/Home.module.css';
import clsx from 'clsx';

interface HomeProps {
  postsSlugs: string[];
}

const Home: NextPage<HomeProps> = ({ postsSlugs }: HomeProps) => {
  return (
    <div className={clsx('container', styles.container)}>
      <div className={styles.postLinksList}>
        {postsSlugs.map((slug) => (
          <div className={styles.postLinkContainer} key={slug}>
            <Link href={`/post/${slug}`}>
              <a className={styles.postLink}>{slug}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const files = postService.getFilesPaths();
  return {
    props: {
      postsSlugs: files.map((slug) => slug.replace('.md', '')),
    },
  };
};

export default Home;
