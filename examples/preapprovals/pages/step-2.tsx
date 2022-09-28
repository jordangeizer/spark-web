import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout';
import { Step2Form } from '../components/step-2-form';

const Page: NextPage = () => {
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
      <Step2Form onSubmit={() => router.push('step-3')} />
    </Layout>
  );
};

export default Page;
