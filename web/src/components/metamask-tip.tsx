'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';

// import { Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import metamask from '@/../public/MetaMask-icon-fox.svg';

type WindowWithEthereum = {
    ethereum?: { request: (args: { method: string }) => Promise<string[]> };
};

export function MetamaskTip() {
    const [account, setAccount] = useState<string | null>(null);
    const [isInstalled, setIsInstalled] = useState(true);

    useEffect(() => {
        checkIfWalletIsInstalled();
    }, []);

    const checkIfWalletIsInstalled = () => {
        const { ethereum } = window as WindowWithEthereum;
        if (!ethereum) {
            setIsInstalled(false);
        }
    };

    const connectWallet = async () => {
        try {
            const { ethereum } = window as WindowWithEthereum;
            if (!ethereum) {
                alert('Please install MetaMask!');
                return;
            }

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            setAccount(accounts[0]);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className="tooltip tooltip-bottom"
                    data-tip={`${account ? `Address:\n${account.slice(0, 6)}...${account.slice(-4)}` : 'MetaMask not installed'}`}
                >
                    <Button variant="ghost" size="icon">
                        <Image
                            src={metamask}
                            alt="MetaMask"
                            className="h-4 w-4"
                        />
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {!isInstalled ? (
                    <DropdownMenuItem
                        onClick={() =>
                            window.open(
                                'https://metamask.io/download/',
                                '_blank'
                            )
                        }
                    >
                        Install MetaMask
                    </DropdownMenuItem>
                ) : account ? (
                    <>
                        <DropdownMenuItem disabled>
                            {account.slice(0, 6)}...{account.slice(-4)}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={disconnectWallet}>
                            Disconnect
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem onClick={connectWallet}>
                        Connect MetaMask
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
