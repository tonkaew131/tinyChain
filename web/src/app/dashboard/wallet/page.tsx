'use client';

import Image from 'next/image';

import type React from 'react';
import { useState } from 'react';

import { CreditCard, QrCode, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WalletPage() {
    const [depositType, setDepositType] = useState<string>('qr');
    const [depositAmount, setDepositAmount] = useState<string>('');
    const [withdrawAmount, setWithdrawAmount] = useState<string>('');
    const [acceptRules, setAcceptRules] = useState<boolean>(false);
    const [showQRCode, setShowQRCode] = useState<boolean>(false);
    const [showTransferDetails, setShowTransferDetails] =
        useState<boolean>(false);
    const [withdrawConfirmation, setWithdrawConfirmation] =
        useState<boolean>(false);
    const [selectedBank, setSelectedBank] = useState<string>('');

    const availableBalance = 10000;
    const dailyLimit = 50000;

    const handleDepositSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (depositType === 'qr') {
            setShowQRCode(true);
        } else {
            setShowTransferDetails(true);
        }
    };

    const handleWithdrawSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setWithdrawConfirmation(true);
    };

    const handleWithdrawConfirm = () => {
        // Handle withdrawal confirmation
        toast.success('Withdrawal confirmed!');
        setWithdrawConfirmation(false);
        setWithdrawAmount('');
    };

    const resetDeposit = () => {
        setShowQRCode(false);
        setShowTransferDetails(false);
        setDepositAmount('');
        setAcceptRules(false);
    };

    return (
        <div className="container mx-auto max-w-md px-4 py-6">
            <h1 className="mb-6 text-2xl font-bold">My Wallet</h1>

            <Card className="mb-6">
                <CardHeader className="pb-3">
                    <CardTitle>Available Balance</CardTitle>
                    <CardDescription>
                        <span className="text-2xl font-bold">
                            ฿ {availableBalance.toLocaleString()}
                        </span>
                    </CardDescription>
                </CardHeader>
            </Card>

            <Tabs defaultValue="deposit" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-2">
                    <TabsTrigger value="deposit">Deposit</TabsTrigger>
                    <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                </TabsList>

                <TabsContent value="deposit">
                    {!showQRCode && !showTransferDetails ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Deposit Funds</CardTitle>
                                <CardDescription>
                                    Add money to your wallet
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleDepositSubmit}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="deposit-type">
                                            Select Deposit Type
                                        </Label>
                                        <RadioGroup
                                            id="deposit-type"
                                            value={depositType}
                                            onValueChange={setDepositType}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center space-x-2 rounded-md border p-3">
                                                <RadioGroupItem
                                                    value="qr"
                                                    id="qr"
                                                />
                                                <Label
                                                    htmlFor="qr"
                                                    className="flex cursor-pointer items-center"
                                                >
                                                    <QrCode className="mr-2 h-4 w-4" />
                                                    Mobile Banking (QR Code)
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-md border p-3">
                                                <RadioGroupItem
                                                    value="transfer"
                                                    id="transfer"
                                                />
                                                <Label
                                                    htmlFor="transfer"
                                                    className="flex cursor-pointer items-center"
                                                >
                                                    <CreditCard className="mr-2 h-4 w-4" />
                                                    THB Transfer
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {depositType === 'qr' && (
                                        <div className="space-y-2">
                                            <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                                                Your deposit amount will be
                                                credited to your account within
                                                1 minute - 24 hours.
                                            </div>
                                        </div>
                                    )}

                                    {depositType === 'transfer' && (
                                        <div className="space-y-4">
                                            <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                                                Your deposit amount will be
                                                credited to your account within
                                                30 minutes - 3 days after you
                                                upload the proof of payment.
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="bank-account">
                                                    Select Bank Account
                                                </Label>
                                                <Select
                                                    onValueChange={
                                                        setSelectedBank
                                                    }
                                                >
                                                    <SelectTrigger id="bank-account">
                                                        <SelectValue placeholder="Select bank account" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="kasikorn">
                                                            Kasikorn Bank
                                                        </SelectItem>
                                                        <SelectItem value="bangkok">
                                                            Bangkok Bank
                                                        </SelectItem>
                                                        <SelectItem value="scb">
                                                            Siam Commercial Bank
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="deposit-amount">
                                            Deposit Amount (THB)
                                        </Label>
                                        <Input
                                            id="deposit-amount"
                                            type="number"
                                            placeholder="Enter amount"
                                            value={depositAmount}
                                            onChange={(e) =>
                                                setDepositAmount(e.target.value)
                                            }
                                            required
                                            min={1}
                                        />
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            id="terms"
                                            checked={acceptRules}
                                            onCheckedChange={(checked) =>
                                                setAcceptRules(
                                                    checked as boolean
                                                )
                                            }
                                            className="mt-1"
                                        />
                                        <Label
                                            htmlFor="terms"
                                            className="text-sm"
                                        >
                                            I have read and accept the deposit
                                            rules and terms
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={
                                            !depositAmount ||
                                            !acceptRules ||
                                            (depositType === 'transfer' &&
                                                !selectedBank)
                                        }
                                    >
                                        DEPOSIT NOW
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    ) : showQRCode ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Scan QR Code</CardTitle>
                                <CardDescription>
                                    Scan this QR code to deposit ฿
                                    {Number.parseFloat(
                                        depositAmount
                                    ).toLocaleString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <div className="mb-4 rounded-md border-4 border-primary p-2">
                                    <div className="rounded bg-white p-4">
                                        <Image
                                            src={`https://promptpay.io/0981234567/${depositAmount}`}
                                            alt="QR Code"
                                            width={200}
                                            height={200}
                                            className="mx-auto"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 text-center text-sm text-muted-foreground">
                                    Please make the exact payment of ฿
                                    {Number.parseFloat(
                                        depositAmount
                                    ).toLocaleString()}{' '}
                                    including decimals
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={resetDeposit}
                                >
                                    Back to Deposit
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Transfer Details</CardTitle>
                                <CardDescription>
                                    Please transfer exactly ฿
                                    {Number.parseFloat(
                                        depositAmount
                                    ).toLocaleString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 rounded-md border p-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Bank:
                                        </span>
                                        <span className="font-medium">
                                            Kasikorn Bank
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Account Name:
                                        </span>
                                        <span className="font-medium">
                                            Company Ltd.
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Account Number:
                                        </span>
                                        <span className="font-medium">
                                            123-4-56789-0
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Amount:
                                        </span>
                                        <span className="font-medium">
                                            ฿
                                            {Number.parseFloat(
                                                depositAmount
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                                    Please make the exact payment including
                                    decimals. After transferring, upload your
                                    payment slip.
                                </div>

                                <Button className="w-full">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Payment Slip
                                </Button>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={resetDeposit}
                                >
                                    Back to Deposit
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {(showQRCode || showTransferDetails) && (
                        <div className="mt-6">
                            <h3 className="mb-2 font-medium">TRANSACTIONS</h3>
                            <div className="rounded-md border p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">
                                            Deposit
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {new Date().toLocaleDateString()} •
                                            ฿
                                            {Number.parseFloat(
                                                depositAmount
                                            ).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                        WAITING
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="withdraw">
                    {!withdrawConfirmation ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Withdraw Funds</CardTitle>
                                <CardDescription>
                                    Transfer money to your bank account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleWithdrawSubmit}
                                    className="space-y-4"
                                >
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span>Available Balance:</span>
                                        <span className="font-medium">
                                            ฿{availableBalance.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="mb-4 flex justify-between text-sm">
                                        <span>Daily Limit:</span>
                                        <span className="font-medium">
                                            ฿{dailyLimit.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bank-account">
                                            Select Bank Account
                                        </Label>
                                        <Select
                                            onValueChange={setSelectedBank}
                                            required
                                        >
                                            <SelectTrigger id="bank-account">
                                                <SelectValue placeholder="Select bank account" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="kasikorn">
                                                    Kasikorn Bank - xxx-x-x1234
                                                </SelectItem>
                                                <SelectItem value="bangkok">
                                                    Bangkok Bank - xxx-x-x5678
                                                </SelectItem>
                                                <SelectItem value="scb">
                                                    Siam Commercial Bank -
                                                    xxx-x-x9012
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="withdraw-amount">
                                            Withdraw Amount (THB)
                                        </Label>
                                        <Input
                                            id="withdraw-amount"
                                            type="number"
                                            placeholder="Enter amount"
                                            value={withdrawAmount}
                                            onChange={(e) =>
                                                setWithdrawAmount(
                                                    e.target.value
                                                )
                                            }
                                            max={availableBalance}
                                            required
                                            min={1}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={
                                            !withdrawAmount ||
                                            !selectedBank ||
                                            Number.parseFloat(withdrawAmount) >
                                                availableBalance
                                        }
                                    >
                                        Check Details
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Confirm Withdrawal</CardTitle>
                                <CardDescription>
                                    Please review the details below
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 rounded-md border p-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Bank Account:
                                        </span>
                                        <span className="font-medium">
                                            {selectedBank === 'kasikorn'
                                                ? 'Kasikorn Bank - xxx-x-x1234'
                                                : selectedBank === 'bangkok'
                                                  ? 'Bangkok Bank - xxx-x-x5678'
                                                  : 'Siam Commercial Bank - xxx-x-x9012'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Amount:
                                        </span>
                                        <span className="font-medium">
                                            ฿
                                            {Number.parseFloat(
                                                withdrawAmount
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Fee:
                                        </span>
                                        <span className="font-medium">
                                            ฿0.00
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        <span>Total:</span>
                                        <span>
                                            ฿
                                            {Number.parseFloat(
                                                withdrawAmount
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                                    Withdrawal will be processed within 1-3
                                    business days.
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-2">
                                <Button
                                    className="w-full"
                                    onClick={handleWithdrawConfirm}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() =>
                                        setWithdrawConfirmation(false)
                                    }
                                >
                                    Back
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
