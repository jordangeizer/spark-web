import { Box } from '@spark-web/box';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout';
import { Slant } from '../components/slant';
import type { Step1FormSchema } from '../components/step-1-form';
import { Step1Form } from '../components/step-1-form';
import { fakeSubmit } from '../utils';

const exampleData: Step1FormSchema = {
  name: 'Fred',
  mobile: '0412356789',
  email: 'fred@bob.com',
};

export const getServerSideProps: GetServerSideProps<{
  initialValues?: Step1FormSchema;
}> = async context => {
  if (context.query.prefill === 'true') {
    return {
      props: {
        initialValues: exampleData,
      },
    };
  }

  return {
    props: {},
  };
};

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialValues }) => {
  const router = useRouter();

  return (
    <Layout
      heading="Get pre-approved in minutes"
      description="First, add your details so you can track your application later."
      footer={[
        'Australian Credit License Number 508217. All applications are subject to Brighte’s credit approval criteria. Fees, Terms and Conditions apply.',
        '© 2022 Brighte Capital Pty Ltd (ABN 74 609 165 906)',
      ]}
    >
      <Slant>
        <Box
          as="img"
          src="/images/man-laying-in-womans-arm-on-green-couch-looking-at-images-on-laptop-with-sunlight-through-windows-reflecting-on-wooden-floor.png"
          alt="Man laying in womans arm on green couch looking at images on laptop with sunlight through windows reflecting on wooden floor."
          width="full"
          paddingX="large"
        />
      </Slant>
      <Step1Form
        initialValues={initialValues}
        onSubmit={async data => {
          await fakeSubmit(data);
          router.push('step-2');
        }}
      />
    </Layout>
  );
};

export default Page;
