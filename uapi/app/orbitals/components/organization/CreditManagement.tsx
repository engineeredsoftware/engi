'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/base/shadcn/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/base/shadcn/card"
import { Input } from "@/components/base/shadcn/input"
import { Label } from "@/components/base/shadcn/label"
import { Badge } from "@/components/base/shadcn/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/shadcn/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/shadcn/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/base/shadcn/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/shadcn/tabs"
import { Progress } from "@/components/base/shadcn/progress"
import { Checkbox } from "@/components/base/shadcn/checkbox"
import { toast } from "sonner"
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Wallet, 
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'

interface CreditSummary {
  totalBalance: number
  totalAllocated: number
  totalUsed: number
  totalAvailable: number
}

interface MemberAllocation {
  memberId: string
  memberName: string
  allocated: number
  used: number
  remaining: number
}

interface CreditTransaction {
  id: string
  type: 'purchase' | 'allocation' | 'usage' | 'refund' | 'adjustment'
  amount: number
  description: string
  createdAt: string
  user: {
    username: string
    displayName: string
  }
}

interface CreditManagementProps {
  organizationId: string
  organizationName: string
  userRole: 'owner' | 'admin' | 'lead' | 'dev'
  summary: CreditSummary
  allocations: MemberAllocation[]
  transactions: CreditTransaction[]
  onRefresh: () => void
}

const transactionTypeConfig = {
  purchase: {
    label: 'Purchase',
    icon: CreditCard,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  allocation: {
    label: 'Allocation',
    icon: ArrowUpRight,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  usage: {
    label: 'Usage',
    icon: ArrowDownRight,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  refund: {
    label: 'Refund',
    icon: RefreshCw,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  adjustment: {
    label: 'Adjustment',
    icon: Plus,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  }
}

export default function CreditManagement({
  organizationId,
  organizationName,
  userRole,
  summary,
  allocations,
  transactions,
  onRefresh
}: CreditManagementProps) {
  const [loading, setLoading] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showAllocateModal, setShowAllocateModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Purchase form state
  const [purchaseForm, setPurchaseForm] = useState({
    amount: 50000,
    paymentMethod: 'stripe',
    billingEmail: ''
  })

  // Allocation form state
  const [allocationForm, setAllocationForm] = useState({
    amount: 10000,
    reason: '',
    isBulk: false
  })

  const canManageCredits = ['owner', 'admin'].includes(userRole)

  const handlePurchaseCredits = async () => {
    if (!canManageCredits) return

    setLoading(true)
    try {
      const response = await fetch(`/api/organizations/${organizationId}/credits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'purchase',
          ...purchaseForm
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to purchase credits')
      }

      toast.success(`Successfully purchased ${purchaseForm.amount.toLocaleString()} credits`)
      setShowPurchaseModal(false)
      setPurchaseForm({
        amount: 50000,
        paymentMethod: 'stripe',
        billingEmail: ''
      })
      onRefresh()

    } catch (error: any) {
      toast.error(error.message || 'Failed to purchase credits')
    } finally {
      setLoading(false)
    }
  }

  const handleAllocateCredits = async () => {
    if (!canManageCredits) return

    setLoading(true)
    try {
      const isBulkAllocation = selectedMembers.length > 1
      const endpoint = `/api/organizations/${organizationId}/credits`
      
      const payload = isBulkAllocation
        ? {
            action: 'bulk_allocate',
            memberIds: selectedMembers,
            amount: allocationForm.amount,
            reason: allocationForm.reason
          }
        : {
            action: 'allocate',
            memberId: selectedMembers[0],
            amount: allocationForm.amount,
            reason: allocationForm.reason
          }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to allocate credits')
      }

      const memberCount = isBulkAllocation ? selectedMembers.length : 1
      toast.success(`Successfully allocated ${allocationForm.amount.toLocaleString()} credits to ${memberCount} member${memberCount > 1 ? 's' : ''}`)
      
      setShowAllocateModal(false)
      setSelectedMembers([])
      setAllocationForm({
        amount: 10000,
        reason: '',
        isBulk: false
      })
      onRefresh()

    } catch (error: any) {
      toast.error(error.message || 'Failed to allocate credits')
    } finally {
      setLoading(false)
    }
  }

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  const usagePercentage = summary.totalBalance > 0 
    ? (summary.totalUsed / summary.totalBalance) * 100 
    : 0

  const allocationPercentage = summary.totalBalance > 0 
    ? (summary.totalAllocated / summary.totalBalance) * 100 
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Credit Management</h2>
          <p className="text-slate-600">
            Manage credit purchases and allocation for {organizationName}
          </p>
        </div>
        {canManageCredits && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => setShowPurchaseModal(true)} className="bg-green-600 hover:bg-green-700">
              <CreditCard className="w-4 h-4 mr-2" />
              Purchase Credits
            </Button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 laptop:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Balance</p>
                <p className="text-2xl font-bold text-slate-900">
                  {summary.totalBalance.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Allocated</p>
                <p className="text-2xl font-bold text-slate-900">
                  {summary.totalAllocated.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <Progress value={allocationPercentage} className="w-16 h-2 mr-2" />
                  <span className="text-xs text-slate-500">
                    {allocationPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <ArrowUpRight className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Used</p>
                <p className="text-2xl font-bold text-slate-900">
                  {summary.totalUsed.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <Progress value={usagePercentage} className="w-16 h-2 mr-2" />
                  <span className="text-xs text-slate-500">
                    {usagePercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {summary.totalAvailable.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Member Allocations</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Transaction History</span>
          </TabsTrigger>
        </TabsList>

        {/* Member Allocations */}
        <TabsContent value="overview" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Team Credit Allocations</h3>
            {canManageCredits && selectedMembers.length > 0 && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  {selectedMembers.length} selected
                </Badge>
                <Button size="sm" onClick={() => setShowAllocateModal(true)}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Allocate Credits
                </Button>
              </div>
            )}
          </div>

          {allocations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No team members</h3>
                <p className="text-slate-600 text-center">
                  Invite team members to start allocating credits.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {allocations.map(allocation => {
                const usagePercentage = allocation.allocated > 0 
                  ? (allocation.used / allocation.allocated) * 100 
                  : 0

                return (
                  <Card key={allocation.memberId} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {canManageCredits && (
                            <Checkbox
                              checked={selectedMembers.includes(allocation.memberId)}
                              onCheckedChange={() => toggleMemberSelection(allocation.memberId)}
                            />
                          )}
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {allocation.memberName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900">
                              {allocation.memberName}
                            </h4>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="text-sm text-slate-600">
                                <DollarSign className="w-3 h-3 inline mr-1" />
                                {allocation.used.toLocaleString()} / {allocation.allocated.toLocaleString()}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Progress value={usagePercentage} className="w-24 h-2" />
                                <span className="text-xs text-slate-500">
                                  {usagePercentage.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">
                            {allocation.remaining.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500">remaining</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Transaction History */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Transaction History</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {transactions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No transactions</h3>
                <p className="text-slate-600 text-center">
                  Credit transactions will appear here once you start using the system.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {transactions.map(transaction => {
                    const config = transactionTypeConfig[transaction.type]
                    const Icon = config.icon
                    const isPositive = transaction.amount > 0

                    return (
                      <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${config.bgColor}`}>
                            <Icon className={`w-4 h-4 ${config.color}`} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {transaction.description}
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <span>{config.label}</span>
                              <span>•</span>
                              <span>by {transaction.user.displayName || transaction.user.username}</span>
                              <span>•</span>
                              <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? '+' : ''}{transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500">credits</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Purchase Credits Modal */}
      <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
        <DialogContent className="tablet:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Credits</DialogTitle>
            <DialogDescription>
              Add credits to your organization's balance
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="credit-amount">Credit Package</Label>
              <Select
                value={purchaseForm.amount.toString()}
                onValueChange={(value) => setPurchaseForm(prev => ({ ...prev, amount: Number(value) }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25000">25,000 credits - $25</SelectItem>
                  <SelectItem value="50000">50,000 credits - $45 (10% off)</SelectItem>
                  <SelectItem value="100000">100,000 credits - $80 (20% off)</SelectItem>
                  <SelectItem value="250000">250,000 credits - $180 (28% off)</SelectItem>
                  <SelectItem value="500000">500,000 credits - $320 (36% off)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select
                value={purchaseForm.paymentMethod}
                onValueChange={(value) => setPurchaseForm(prev => ({ ...prev, paymentMethod: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Credit Card (Stripe)</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="billing-email">Billing Email</Label>
              <Input
                id="billing-email"
                type="email"
                value={purchaseForm.billingEmail}
                onChange={(e) => setPurchaseForm(prev => ({ ...prev, billingEmail: e.target.value }))}
                placeholder="billing@company.com"
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPurchaseModal(false)}>
              Cancel
            </Button>
            <Button onClick={handlePurchaseCredits} disabled={loading}>
              {loading ? 'Processing...' : 'Purchase Credits'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Allocate Credits Modal */}
      <Dialog open={showAllocateModal} onOpenChange={setShowAllocateModal}>
        <DialogContent className="tablet:max-w-md">
          <DialogHeader>
            <DialogTitle>Allocate Credits</DialogTitle>
            <DialogDescription>
              Allocate credits to {selectedMembers.length} selected member{selectedMembers.length > 1 ? 's' : ''}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="allocation-amount">Credit Amount</Label>
              <Input
                id="allocation-amount"
                type="number"
                min="0"
                step="1000"
                value={allocationForm.amount}
                onChange={(e) => setAllocationForm(prev => ({ ...prev, amount: Number(e.target.value) }))}
                className="mt-1"
              />
              <p className="text-xs text-slate-500 mt-1">
                Available balance: {summary.totalAvailable.toLocaleString()} credits
              </p>
            </div>

            <div>
              <Label htmlFor="allocation-reason">Reason (Optional)</Label>
              <Input
                id="allocation-reason"
                value={allocationForm.reason}
                onChange={(e) => setAllocationForm(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="e.g., Monthly allocation, Project budget"
                className="mt-1"
              />
            </div>

            {allocationForm.amount > summary.totalAvailable && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-700">
                  Insufficient balance. Purchase more credits first.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllocateModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAllocateCredits} 
              disabled={loading || allocationForm.amount > summary.totalAvailable}
            >
              {loading ? 'Allocating...' : 'Allocate Credits'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
