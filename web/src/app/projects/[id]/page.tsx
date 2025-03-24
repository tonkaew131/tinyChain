"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectGallery } from "@/components/project-gallery";
import { ActivityItem } from "@/components/activity-item";
import { ArrowLeft, Calendar, Globe, Leaf, MapPin, Shield } from "lucide-react";
import { toast } from 'sonner';
import { projects, tokens, activities, tokenPriceHistory } from '@/lib/mock-data';
import { Input } from "@/components/ui/input";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend, Line, LineChart } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface TokenData {
  id: number;
  projectId: number;
  year: string;
  amount: number;
  price: number;
  priceWei: string;
  available: boolean;
}

interface ActivityEvent {
  id: string;
  eventType: 'mint' | 'list' | 'sale' | 'cancel';
  tokenId: number;
  projectId: number;
  amount: number;
  sellerAddress: string;
  buyerAddress?: string;
  priceFormatted?: string;
  transactionHash: string;
  blockTimestamp: Date;
}

interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  carbonCredits: number;
  price: number;
  images: readonly string[];
  type: string;
  certification: string;
  startDate: string;
  endDate: string;
}

export default function ProjectPage() {
  const { id } = useParams();
  const [isConnected, setIsConnected] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [projectTokens, setProjectTokens] = useState<TokenData[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityEvent[]>([]);
  const [buyAmount, setBuyAmount] = useState<number>(0);
  const [selectedTokenId, setSelectedTokenId] = useState<number | 'all'>('all');
  const [selectedBuyToken, setSelectedBuyToken] = useState<string>('');
  const [combinedPriceData, setCombinedPriceData] = useState<{[key: string]: number}[]>([]);
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [selectedTradeToken, setSelectedTradeToken] = useState<string>('');
  const [userTokenBalances, setUserTokenBalances] = useState<{[key: number]: number}>({});

  useEffect(() => {
    // Find project from mock data
    const projectId = Number(id);
    const foundProject = projects.find(p => p.id === projectId);
    if (foundProject) {
      setProject({
        ...foundProject,
        images: [...foundProject.images]
      });
    }

    // Filter tokens for this project
    const projectTokens = tokens.filter(t => t.projectId === projectId);
    setProjectTokens(projectTokens);

    // Combine price history for all tokens
    const tokenIds = projectTokens.map(t => t.id);
    const dates = tokenPriceHistory[tokenIds[0]].map(d => d.date);
    const combined = dates.map((date, i) => {
      const dataPoint: {[key: string]: number} = { date: new Date(date).getTime() };
      tokenIds.forEach(tokenId => {
        dataPoint[`token${tokenId}`] = tokenPriceHistory[tokenId as keyof typeof tokenPriceHistory][i].price;
      });
      return dataPoint;
    });
    setCombinedPriceData(combined);

    // Filter activities for this project
    const projectActivities = activities
      .filter(a => a.projectId === projectId)
      .sort((a, b) => b.blockTimestamp.getTime() - a.blockTimestamp.getTime());
    setRecentActivity(projectActivities);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const eventType = Math.random() > 0.5 ? 'list' as const : 'sale' as const;
      const newActivity: ActivityEvent = {
        id: Date.now().toString(),
        eventType,
        tokenId: projectTokens[0]?.id || 1,
        projectId: projectId,
        amount: Math.floor(Math.random() * 100) + 1,
        sellerAddress: "0x1234...5678",
        buyerAddress: eventType === 'sale' ? "0x9876...4321" : undefined,
        priceFormatted: `${projectTokens[0]?.price.toFixed(2) || "25.00"} THB`,
        transactionHash: "0x" + Math.random().toString(16).slice(2),
        blockTimestamp: new Date()
      };

      setRecentActivity(prev => [newActivity, ...prev]);
    }, 10000); // New activity every 10 seconds

    // Mock user token balances
    const mockBalances: {[key: number]: number} = {};
    projectTokens.forEach(token => {
      mockBalances[token.id] = Math.floor(Math.random() * 50); // Random balance between 0-50
    });
    setUserTokenBalances(mockBalances);

    return () => clearInterval(interval);
  }, [id]);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        toast.success('Successfully connected to MetaMask');
      } else {
        toast.error('Please install MetaMask to use this feature');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect to MetaMask');
    }
  };

  const handleBuy = async (tokenId: number, amount: number) => {
    if (!isConnected) {
      await connectWallet();
      return;
    }
    toast.success(`Buying ${amount} tokens of ID ${tokenId}`);
  };

  const getTokenColor = (index: number) => {
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];
    return colors[index % colors.length];
  };

  const handleTabChange = (value: string) => {
    setSelectedTokenId(value === 'all' ? 'all' : Number(value));
  };

  const renderTradingView = () => {
    if (selectedTokenId === 'all') {
      return (
        <LineChart data={combinedPriceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tickFormatter={(value) => `${value} THB`}
            tick={{ fontSize: 12 }}
            width={80}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(2)} THB`, 'Price']}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
            contentStyle={{ fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {projectTokens.map((token, index) => (
            <Line
              key={token.id}
              type="monotone"
              dataKey={`token${token.id}`}
              name={`Token ${token.id} (${token.year})`}
              stroke={getTokenColor(index)}
              dot={false}
            />
          ))}
        </LineChart>
      );
    }

    const tokenData = tokenPriceHistory[selectedTokenId as keyof typeof tokenPriceHistory];
    return (
      <AreaChart data={tokenData}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(value) => value.slice(5)}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          domain={['auto', 'auto']}
          tickFormatter={(value) => `${value} THB`}
          tick={{ fontSize: 12 }}
          width={80}
        />
        <Tooltip 
          formatter={(value: number) => [`${value.toFixed(2)} THB`, 'Price']}
          labelFormatter={(label) => `Date: ${label}`}
          contentStyle={{ fontSize: '12px' }}
        />
        <Area 
          type="monotone" 
          dataKey="price" 
          stroke="#22c55e" 
          fillOpacity={1}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    );
  };

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    const tokenId = parseInt(selectedTradeToken);
    
    toast.success(
      type === 'buy' 
        ? `Buying ${buyAmount} tokens of ID ${tokenId}` 
        : `Listed ${buyAmount} tokens of ID ${tokenId} for ${sellPrice} THB each`
    );
    
    if (type === 'buy') {
      setIsBuyDialogOpen(false);
      setBuyAmount(0);
    } else {
      setIsSellDialogOpen(false);
      setSellPrice(0);
    }
    setSelectedTradeToken('');
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="container py-10 mx-auto">
      <div className="flex flex-col space-y-8">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{project.type}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {project.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="mr-1 h-4 w-4" />
                  {project.certification}
                </div>
              </div>
            </div>
            <Button onClick={connectWallet} variant="outline">
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ProjectGallery images={project.images} />

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold flex items-center">
                      <Leaf className="mr-2 h-4 w-4 text-primary" />
                      Carbon Credits
                    </h3>
                    <p>{project.carbonCredits.toLocaleString()} tons</p>
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-primary" />
                      Location
                    </h3>
                    <p>{project.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      Project Timeline
                    </h3>
                    <p>{project.startDate} - {project.endDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Trading View</CardTitle>
                <CardDescription>Historical price and volume data</CardDescription>
                <div className="mt-4">
                  <Tabs defaultValue="all" onValueChange={handleTabChange}>
                    <TabsList className="w-full">
                      <TabsTrigger value="all" onClick={() => handleTabChange('all')}>
                        All Tokens
                      </TabsTrigger>
                      {projectTokens.map((token) => (
                        <TabsTrigger 
                          key={token.id} 
                          value={token.id.toString()}
                          onClick={() => handleTabChange(token.id.toString())}
                        >
                          Token {token.id} ({token.year})
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    {renderTradingView()}
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  {selectedTokenId !== 'all' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">24h Volume</p>
                          <p className="text-lg font-medium">
                            {tokenPriceHistory[selectedTokenId as keyof typeof tokenPriceHistory][30].volume.toLocaleString()} tokens
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Current Price</p>
                          <p className="text-lg font-medium">
                            {tokenPriceHistory[selectedTokenId as keyof typeof tokenPriceHistory][30].price.toFixed(2)} THB
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Your Balance</p>
                          <p className="text-lg font-medium">
                            {userTokenBalances[selectedTokenId as number] || 0} tokens
                          </p>
                        </div>
                      </div>
                     
                    </div>
                  )}
         
                </div>
                <div className="flex gap-4 mt-8">
                  <Dialog open={isBuyDialogOpen} onOpenChange={setIsBuyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex-1 h-20 font-bold text-2xl">Buy</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Buy Carbon Credits</DialogTitle>
                        <DialogDescription>
                          Purchase carbon credits directly from the marketplace.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Select Token</Label>
                          <Select value={selectedTradeToken} onValueChange={setSelectedTradeToken}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a token" />
                            </SelectTrigger>
                            <SelectContent>
                              {projectTokens.map((token) => (
                                <SelectItem key={token.id} value={token.id.toString()}>
                                  Token {token.id} ({token.year}) - {token.price.toLocaleString()} THB
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedTradeToken && (
                          <div className="space-y-2">
                            <Label>Amount to Buy</Label>
                            <Input
                              type="number"
                              placeholder="Amount"
                              min={1}
                              step={1}
                              max={projectTokens.find(t => t.id.toString() === selectedTradeToken)?.amount || 0}
                              onChange={(e) => setBuyAmount(parseInt(e.target.value) || 0)}
                            />
                            <p className="text-sm text-muted-foreground">
                              Available: {projectTokens.find(t => t.id.toString() === selectedTradeToken)?.amount || 0} tokens
                            </p>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBuyDialogOpen(false)}>Cancel</Button>
                        <Button 
                          onClick={() => handleTrade('buy')}
                          disabled={!selectedTradeToken || !buyAmount || !isConnected}
                        >
                          {isConnected ? 'Buy Now' : 'Connect Wallet to Buy'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isSellDialogOpen} onOpenChange={setIsSellDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex-1 h-20 font-bold text-xl" variant="outline">Sell</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Sell Carbon Credits</DialogTitle>
                        <DialogDescription>
                          List your carbon credits on the marketplace.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Select Token</Label>
                          <Select value={selectedTradeToken} onValueChange={setSelectedTradeToken}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a token" />
                            </SelectTrigger>
                            <SelectContent>
                              {projectTokens.map((token) => (
                                <SelectItem 
                                  key={token.id} 
                                  value={token.id.toString()}
                                  disabled={!userTokenBalances[token.id]}
                                >
                                  Token {token.id} ({token.year}) - Balance: {userTokenBalances[token.id] || 0}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedTradeToken && (
                          <>
                            <div className="space-y-2">
                              <Label>Amount to Sell</Label>
                              <Input
                                type="number"
                                placeholder="Amount"
                                min={1}
                                step={1}
                                max={userTokenBalances[parseInt(selectedTradeToken)] || 0}
                                onChange={(e) => setBuyAmount(parseInt(e.target.value) || 0)}
                              />
                              <p className="text-sm text-muted-foreground">
                                Your Balance: {userTokenBalances[parseInt(selectedTradeToken)] || 0} tokens
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label>Price per Token (THB)</Label>
                              <Input
                                type="number"
                                placeholder="Price"
                                min={0}
                                step={0.01}
                                onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSellDialogOpen(false)}>Cancel</Button>
                        <Button 
                          onClick={() => handleTrade('sell')}
                          disabled={!selectedTradeToken || !buyAmount || !sellPrice || !isConnected}
                        >
                          {isConnected ? 'List for Sale' : 'Connect Wallet to Sell'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.slice(0, 5).map((event) => (
                  <ActivityItem key={event.id} event={event} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Buy Carbon Credits</CardTitle>
                <CardDescription>Purchase directly from the developer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select value={selectedBuyToken} onValueChange={setSelectedBuyToken}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a token" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTokens.map((token) => (
                        <SelectItem key={token.id} value={token.id.toString()}>
                          Token {token.id} ({token.year}) - {token.price.toLocaleString()} THB
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedBuyToken && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Available {projectTokens.find(t => t.id.toString() === selectedBuyToken)?.amount || 0} tokens</p>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Amount to buy"
                          min={1}
                          max={projectTokens.find(t => t.id.toString() === selectedBuyToken)?.amount || 0}
                          onChange={(e) => setBuyAmount(parseInt(e.target.value) || 0)}
                          className="w-full"
                          step={1}
                        />
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleBuy(parseInt(selectedBuyToken), buyAmount)}
                        disabled={!buyAmount || buyAmount > (projectTokens.find(t => t.id.toString() === selectedBuyToken)?.amount || 0) || !isConnected}
                      >
                        {isConnected ? 'Buy Now' : 'Connect Wallet to Buy'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Project Developer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={'' || "/placeholder.svg"}
                    alt={''}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{'Jonh Doe'}</h3>
                    <p className="text-sm text-muted-foreground">Member since {'2023-01-01'}</p>
                  </div>
                </div>
                <p className="text-sm">{'John Doe is a farmer with 10 years of experience in agriculture.'}</p>
                <Button variant="outline" className="w-full">
                  Contact Developer
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Token Details</CardTitle>
                  </div>
                  <CardDescription>Detailed information about available tokens</CardDescription>
                </CardHeader>
                <CardContent>
                      <div className="">
                        {projectTokens.map((token, index) => (
                         
                         <div key={token.id} tabIndex={index} className={`collapse collapse-plus`}>
                          <div className="collapse-title font-semibold">Token ID {token.id}</div>
                                <div className="collapse-content text-sm" >
                                  <p className="text-sm text-muted-foreground">Year: {token.year}</p>
                                  <p className="text-sm">Available: {token.amount} tokens</p>
                                  <p className="text-sm font-medium">Price: {token.price.toLocaleString()} THB</p>
                                </div>
                              </div>
                        ))}
                      </div>
                  </CardContent>
                </Card>

          </div>
        </div>
      </div>
    </div>
  );
}