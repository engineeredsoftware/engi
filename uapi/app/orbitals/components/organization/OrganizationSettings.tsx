'use client'

import React, { useState } from 'react'
import { Button } from "@/components/base/shadcn/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/base/shadcn/card"
import { Input } from "@/components/base/shadcn/input"
import { Label } from "@/components/base/shadcn/label"
import { Badge } from "@/components/base/shadcn/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/shadcn/avatar"
import { Switch } from "@/components/base/shadcn/switch"
import { Textarea } from "@/components/base/shadcn/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/shadcn/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/base/shadcn/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/base/shadcn/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/shadcn/select"
import { toast } from "sonner"
import { 
  Building2, 
  Settings, 
  CreditCard, 
  Shield, 
  Globe, 
  Mail, 
  Users, 
  Trash2, 
  Upload, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Download,
  BarChart3,
  Calendar,
  Clock
} from 'lucide-react'

interface Organization {
  id: string
  name: string
  slug: string
  emailDomain: string
  logoUrl?: string
  settings: {
    allowPublicSignup?: boolean
    requireApproval?: boolean
    defaultRole?: 'dev' | 'lead'
    maxMembers?: number
    billingEmail?: string
    webhookUrl?: string
  }
  subscriptionTier: 'free' | 'pro' | 'enterprise'
  creditBalance: number
  memberCount: number
  createdAt: string
  updatedAt: string
}

interface OrganizationSettingsProps {
  organization: Organization
  userRole: 'owner' | 'admin' | 'lead' | 'dev'
  onUpdate: (updates: Partial<Organization>) => Promise<void>
  onDelete?: () => Promise<void>
}

const subscriptionTiers = {
  free: {
    label: 'Free',
    description: 'Basic features for small teams',
    maxMembers: 5,
    credits: 10000,
    features: ['Basic team management', 'Email invitations', 'Standard support'],
    color: 'bg-gray-100 text-gray-800'
  },
  pro: {
    label: 'Pro',
    description: 'Advanced features for growing teams',
    maxMembers: 50,
    credits: 100000,
    features: ['Advanced analytics', 'Custom integrations', 'Priority support', 'SSO integration'],
    color: 'bg-blue-100 text-blue-800'
  },
  enterprise: {
    label: 'Enterprise',
    description: 'Full features for large organizations',
    maxMembers: -1, // unlimited
    credits: -1, // unlimited
    features: ['Unlimited everything', 'Dedicated support', 'Custom contracts', 'Advanced security'],
    color: 'bg-purple-100 text-purple-800'
  }
}

export default function OrganizationSettings({
  organization,
  userRole,
  onUpdate,
  onDelete
}: OrganizationSettingsProps) {
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [logoUploading, setLogoUploading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: organization.name,
    slug: organization.slug,
    emailDomain: organization.emailDomain,
    logoUrl: organization.logoUrl || '',
    allowPublicSignup: organization.settings.allowPublicSignup || false,
    requireApproval: organization.settings.requireApproval || false,
    defaultRole: organization.settings.defaultRole || 'dev',
    maxMembers: organization.settings.maxMembers || 10,
    billingEmail: organization.settings.billingEmail || '',
    webhookUrl: organization.settings.webhookUrl || ''
  })

  const [creditPurchase, setCreditPurchase] = useState({
    amount: 50000,
    paymentMethod: 'stripe'
  })

  const canManageOrganization = ['owner', 'admin'].includes(userRole)
  const canDeleteOrganization = userRole === 'owner'
  const canManageBilling = ['owner', 'admin'].includes(userRole)

  const currentTier = subscriptionTiers[organization.subscriptionTier]

  const handleUpdateOrganization = async () => {
    if (!canManageOrganization) return

    setLoading(true)
    try {
      await onUpdate({
        name: formData.name,
        slug: formData.slug,
        logoUrl: formData.logoUrl,
        settings: {
          ...organization.settings,
          allowPublicSignup: formData.allowPublicSignup,
          requireApproval: formData.requireApproval,
          defaultRole: formData.defaultRole,
          maxMembers: formData.maxMembers,
          billingEmail: formData.billingEmail,
          webhookUrl: formData.webhookUrl
        }
      })
      toast.success('Organization settings updated successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update organization')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadLogo = async (file: File) => {
    if (!canManageOrganization) return

    setLogoUploading(true)
    try {
      // TODO: Implement file upload to storage
      // const logoUrl = await uploadFile(file)
      // setFormData(prev => ({ ...prev, logoUrl }))
      toast.success('Logo uploaded successfully')
    } catch (error: any) {
      toast.error('Failed to upload logo')
    } finally {
      setLogoUploading(false)
    }
  }

  const handlePurchaseCredits = async () => {
    if (!canManageBilling) return

    setLoading(true)
    try {
      // TODO: Implement credit purchase flow
      toast.success(`Successfully purchased ${creditPurchase.amount.toLocaleString()} credits`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to purchase credits')
    } finally {
      setLoading(false)
    }
  }

  const generateApiKey = () => {
    // TODO: Implement API key generation
    const apiKey = `bitcode_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    navigator.clipboard.writeText(apiKey)
    toast.success('API key copied to clipboard')
  }

  const handleDeleteOrganization = async () => {
    if (!canDeleteOrganization || !onDelete) return

    try {
      await onDelete()
      toast.success('Organization deleted successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete organization')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={organization.logoUrl} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
              {organization.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{organization.name}</h1>
            <div className="flex items-center space-x-4 mt-1">
              <Badge variant="secondary">@{organization.emailDomain}</Badge>
              <Badge className={currentTier.color}>{currentTier.label}</Badge>
              <span className="text-sm text-slate-600">
                {organization.memberCount} member{organization.memberCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
        {canManageOrganization && (
          <Button onClick={handleUpdateOrganization} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Organization Details</span>
              </CardTitle>
              <CardDescription>
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!canManageOrganization}
                  />
                </div>
                <div>
                  <Label htmlFor="org-slug">URL Slug</Label>
                  <Input
                    id="org-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    disabled={!canManageOrganization}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    app.bitcode.ai/{formData.slug}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="email-domain">Email Domain</Label>
                <Input
                  id="email-domain"
                  value={formData.emailDomain}
                  disabled
                  className="bg-slate-50"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Contact support to change your email domain
                </p>
              </div>

              <div>
                <Label>Organization Logo</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={formData.logoUrl} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {formData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {canManageOrganization && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleUploadLogo(file)
                        }}
                        style={{ display: 'none' }}
                        id="logo-upload"
                      />
                      <label htmlFor="logo-upload">
                        <Button variant="outline" size="sm" disabled={logoUploading} asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            {logoUploading ? 'Uploading...' : 'Upload Logo'}
                          </span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Team Settings</span>
              </CardTitle>
              <CardDescription>
                Configure how new members join your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow public signup</Label>
                  <p className="text-sm text-slate-600">
                    Let anyone with your email domain join automatically
                  </p>
                </div>
                <Switch
                  checked={formData.allowPublicSignup}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allowPublicSignup: checked }))}
                  disabled={!canManageOrganization}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Require approval</Label>
                  <p className="text-sm text-slate-600">
                    New members need admin approval before joining
                  </p>
                </div>
                <Switch
                  checked={formData.requireApproval}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, requireApproval: checked }))}
                  disabled={!canManageOrganization}
                />
              </div>

              <div>
                <Label htmlFor="default-role">Default Role</Label>
                <Select
                  value={formData.defaultRole}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, defaultRole: value }))}
                  disabled={!canManageOrganization}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Developer</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                  Role assigned to new members by default
                </p>
              </div>

              <div>
                <Label htmlFor="max-members">Maximum Members</Label>
                <Input
                  id="max-members"
                  type="number"
                  min="1"
                  max={currentTier.maxMembers === -1 ? 1000 : currentTier.maxMembers}
                  value={formData.maxMembers}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxMembers: Number(e.target.value) }))}
                  disabled={!canManageOrganization}
                />
                <p className="text-xs text-slate-500 mt-1">
                  {currentTier.maxMembers === -1 
                    ? 'Unlimited members on Enterprise plan'
                    : `Maximum ${currentTier.maxMembers} members on ${currentTier.label} plan`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Current Plan</span>
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{currentTier.label} Plan</h3>
                    <p className="text-slate-600">{currentTier.description}</p>
                  </div>
                  <Badge className={currentTier.color}>{currentTier.label}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Credit Balance</p>
                    <p className="text-2xl font-bold text-green-600">
                      {organization.creditBalance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Members</p>
                    <p className="text-2xl font-bold">
                      {organization.memberCount}
                      {currentTier.maxMembers !== -1 && ` / ${currentTier.maxMembers}`}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Features included:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {currentTier.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {canManageBilling && (
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline">AI Document Plan</Button>
                  <Button variant="outline">View Billing History</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {canManageBilling && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Purchase Credits</span>
                </CardTitle>
                <CardDescription>
                  Add credits to your organization's balance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="credit-amount">Credit Amount</Label>
                  <Select
                    value={creditPurchase.amount.toString()}
                    onValueChange={(value) => setCreditPurchase(prev => ({ ...prev, amount: Number(value) }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25000">25,000 credits - $25</SelectItem>
                      <SelectItem value="50000">50,000 credits - $45</SelectItem>
                      <SelectItem value="100000">100,000 credits - $80</SelectItem>
                      <SelectItem value="250000">250,000 credits - $180</SelectItem>
                      <SelectItem value="500000">500,000 credits - $320</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="billing-email">Billing Email</Label>
                  <Input
                    id="billing-email"
                    type="email"
                    value={formData.billingEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, billingEmail: e.target.value }))}
                    placeholder="billing@example.com"
                  />
                </div>

                <Button onClick={handlePurchaseCredits} disabled={loading} className="w-full">
                  {loading ? 'Processing...' : `Purchase ${creditPurchase.amount.toLocaleString()} Credits`}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>API Access</span>
              </CardTitle>
              <CardDescription>
                Manage API keys and integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>API Key</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type={showApiKey ? 'text' : 'password'}
                    value="bitcode_1234567890abcdef"
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText('bitcode_1234567890abcdef')}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={generateApiKey}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Keep your API key secure. It provides full access to your organization.
                </p>
              </div>

              <div>
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  type="url"
                  value={formData.webhookUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                  placeholder="https://your-app.com/webhooks/bitcode"
                  disabled={!canManageOrganization}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Receive notifications about team events and credit usage
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics & Reports</span>
              </CardTitle>
              <CardDescription>
                Export data and generate reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Download className="w-6 h-6 mb-2" />
                  <span>Export Members</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  <span>Usage Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Calendar className="w-6 h-6 mb-2" />
                  <span>Activity Log</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Clock className="w-6 h-6 mb-2" />
                  <span>Audit Trail</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {canDeleteOrganization && onDelete && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Danger Zone</span>
                </CardTitle>
                <CardDescription className="text-red-600">
                  Irreversible actions that will permanently affect your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Organization
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the{' '}
                        <strong>{organization.name}</strong> organization and remove all associated data.
                        All team members will lose access immediately.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteOrganization} className="bg-red-600 hover:bg-red-700">
                        Delete Organization
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
