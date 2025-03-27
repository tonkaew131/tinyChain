import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Jackson Lee
                    </p>
                    <p className="text-sm text-muted-foreground">
                        jackson.lee@example.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Sophia Davis
                    </p>
                    <p className="text-sm text-muted-foreground">
                        sophia.davis@example.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$1,500.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        William Kim
                    </p>
                    <p className="text-sm text-muted-foreground">
                        william.kim@example.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$1,200.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Olivia Martinez
                    </p>
                    <p className="text-sm text-muted-foreground">
                        olivia.martinez@example.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$800.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>RJ</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Robert Johnson
                    </p>
                    <p className="text-sm text-muted-foreground">
                        robert.johnson@example.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$500.00</div>
            </div>
        </div>
    );
}
