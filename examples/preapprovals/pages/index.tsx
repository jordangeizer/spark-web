import type { GetServerSideProps, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/step-1',
      permanent: false,
    },
  };
};

const Page: NextPage = () => null;

export default Page;
