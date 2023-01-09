import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { postService } from '@/services/post';
import Link from 'next/link';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface PostPageProps {
  contents: MDXRemoteSerializeResult;
}

const PostPage: NextPage<PostPageProps> = ({ contents }: PostPageProps) => {
  return (
    <div className="container">
      <div>
        <Link href={'/'}>
          <a>Back</a>
        </Link>
        <p>-------</p>
      </div>
      <div style={{ marginTop: 12 }}>
        <MDXRemote {...contents} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const files = postService.getFilesPaths();
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps, Params> = async (
  context
) => {
  const params = context.params as Params;
  const contents = postService.getPost(params.slug);
  const source = await serialize(contents);
  return {
    props: {
      contents: source,
    },
  };
};

export default PostPage;
