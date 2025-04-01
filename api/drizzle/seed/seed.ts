import { auth } from '@api/utils/auth';

async function seed() {
    console.log('Seeding admin...');
    const user = await auth.api.signUpEmail({
        body: {
            email: 'admin@akaracarbon.co.th',
            name: 'Admin',
            password: 'aA112233',
            balance: 0,
        },
    });
    console.log('Admin seeded:', user);
}

seed();
