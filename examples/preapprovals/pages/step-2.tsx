import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout';
import type { Step2FormSchema } from '../components/step-2-form';
import { Step2Form } from '../components/step-2-form';
import { fakeSubmit } from '../utils';

const exampleData: Step2FormSchema = {
  maritalStatus: 'single',
  dependants: '0',
  baseNetIncome: 0,
  baseNetIncomeFrequency: 'weekly',
  otherHouseholdIncome: 0,
  otherHouseholdIncomeFrequency: 'weekly',
  homeMortgageRepayment: 0,
  homeMortgageRepaymentFrequency: 'weekly',
  otherLoanCommitments: 0,
  otherLoanCommitmentsFrequency: 'weekly',
  householdCreditCardLimits: 0,
  householdCreditCardLimitsFrequency: 'weekly',
  householdLivingCosts: 0,
  householdLivingCostsFrequency: 'weekly',
};

export const getServerSideProps: GetServerSideProps<{
  initialValues?: Step2FormSchema;
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
      heading="Great, Firstname!"
      description="Now add a few details about your household."
      footer={[
        'Australian Credit License Number 508217. All applications are subject to Brighte’s credit approval criteria. Fees, Terms and Conditions apply.',
        '© 2022 Brighte Capital Pty Ltd (ABN 74 609 165 906)',
      ]}
    >
      <Step2Form
        initialValues={initialValues}
        onSubmit={async data => {
          await fakeSubmit(data);
          router.push('step-3');
        }}
      />
    </Layout>
  );
};

export default Page;
