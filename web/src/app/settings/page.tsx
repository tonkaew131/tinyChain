'use client';

// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

import { ResetPass } from '@/components/ui/resetpass';

export default function SettingPage() {
    const { useSession } = authClient;
    const { data } = useSession();

    return (
        <div className="m-4 mx-auto max-w-2xl rounded-lg bg-gray-900 p-6 text-white shadow-lg">
            <h2 className="text-xl font-semibold">Profile</h2>
            {/* <div className="flex items-center space-x-4 rounded-lg bg-gray-900 p-4">
                
                <Image
                    src={
                        'https://stardewvalleywiki.com/mediawiki/images/4/4a/Banner_Right.png'
                    }
                    width={100}
                    height={100}
                    alt="Picture of the author"
                    className="rounded-full"
                    unoptimized
                />
                
                <div className="flex flex-col">
                    <label
                        htmlFor="avatar-upload"
                        className="cursor-pointer rounded-lg bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600"
                    >
                        Change avatar
                    </label>
                    <input
                        type="file"
                        id="avatar-upload"
                        accept="image/jpeg, image/png, image/gif"
                        className="hidden"
                        
                    />
                    <p className="mt-1 text-sm text-gray-400">
                        JPG, GIF or PNG. 1MB max.
                    </p>
                </div>
            </div> */}

            <div className="mt-4 border-t border-gray-700">
                {/* Full Name */}
                <div className="flex items-center justify-between border-b border-gray-700 py-4">
                    <div>
                        <p className="text-sm text-gray-400">Full name</p>
                        <p className="text-base font-medium">
                            {data?.user?.name ?? '-'}
                        </p>
                    </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center justify-between border-b border-gray-700 py-4">
                    <div>
                        <p className="text-sm text-gray-400">Email address</p>
                        <p className="text-base font-medium">
                            {data?.user?.email ?? '-'}
                        </p>
                    </div>
                </div>

                {/* Title */}
                <div className="flex items-center justify-between border-b border-gray-700 py-4">
                    <div>
                        <p className="text-sm text-gray-400">Email Verified</p>
                        <p className="text-base font-medium">
                            {data?.user?.emailVerified
                                ? 'Verified'
                                : 'Not Verified'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div>
                        <p className="text-sm text-gray-400">Password</p>
                        <p className="text-base font-medium">********</p>
                    </div>
                    <ResetPass />
                </div>
            </div>
        </div>
    );
}
