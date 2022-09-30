import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout';
import type { Step3FormSchema } from '../components/step-3-form';
import { Step3Form } from '../components/step-3-form';
import { fakeSubmit } from '../utils';

const exampleData: Step3FormSchema = {
  amount: 0,
  confirmation: false,
};

export const getServerSideProps: GetServerSideProps<{
  initialValues?: Step3FormSchema;
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
      heading="Congratulations, Firstname!"
      description={
        <>
          You’re eligible to apply for a pre-approval amount of <b>$15,0000*</b>
        </>
      }
      footer={[
        '* Approved applicants only. Fees, terms and conditions apply.',
        'The repayment amount includes $2.15 Weekly account keeping fee. This is calculated daily and taken at the same time as your repayment date.',
        'The fortnightly repayment amount is based on a 12 month term. Longer terms may reduce your fortnightly repayment amount. Please check with your vendor on what payments terms they offer.',
        'Australian Credit License Number 508217. All applications are subject to Brighte’s credit approval criteria. Fees, Terms and Conditions apply.',
        '© 2022 Brighte Capital Pty Ltd (ABN 74 609 165 906)',
      ]}
    >
      <Step3Form
        initialValues={initialValues}
        onSubmit={async data => {
          await fakeSubmit(data);
          router.push('/');
        }}
      />
    </Layout>
  );
};

export default Page;
