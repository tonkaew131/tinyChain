import { Suspense } from 'react';

import CustomerDashboard from './_components/customer-dashboard';

export default function Page() {
    return (
        <Suspense>
            <CustomerDashboard />
        </Suspense>
    );
}
