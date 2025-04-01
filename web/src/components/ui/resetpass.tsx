import { useState } from 'react';

import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { useChangePassword } from '@/lib/auth-client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ResetPass() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const changePasswordMutation = useChangePassword();

    const handleSubmit = () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage('New Password and Confirm Password do not match.');
            return;
        }

        changePasswordMutation.mutate(
            {
                currentPassword: oldPassword,
                newPassword: newPassword,
            },
            {
                onSuccess: (data) => {
                    if (data.error === null) {
                        setIsOpen(false);
                    } else {
                        setErrorMessage(
                            data.error?.message ||
                                'Failed to change password. Please try again.'
                        );
                    }
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Old Password Field */}
                    <div className="relative grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Old Password</Label>
                        <div className="relative col-span-3">
                            <Input
                                id="oldpassword"
                                className="w-full"
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                                onClick={() =>
                                    setShowOldPassword(!showOldPassword)
                                }
                            >
                                {showOldPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* New Password Field */}
                    <div className="relative grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">New Password</Label>
                        <div className="relative col-span-3">
                            <Input
                                id="newpassword"
                                className="w-full"
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                                onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                }
                            >
                                {showNewPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Confirm Password</Label>
                        <div className="relative col-span-3">
                            <Input
                                id="confirmpassword"
                                className="w-full"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <p className="text-center text-red-500">
                            {errorMessage}
                        </p>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={
                            changePasswordMutation.isPending ||
                            newPassword !== confirmPassword ||
                            newPassword === ''
                        }
                    >
                        {changePasswordMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving changes...
                            </>
                        ) : (
                            'Save changes'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
