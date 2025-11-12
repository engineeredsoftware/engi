"use client"

import React, { useEffect, useState } from 'react'
import { createClient } from '@engi/supabase/ssr/client'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import ChatGPTIcon from '@/components/base/engi/icons/social/ChatGPTIcon'
import MetamaskIcon from '@/components/base/engi/icons/social/MetamaskIcon'
import { toast } from '@/components/base/shadcn/sonner'
import dynamic from 'next/dynamic'

// Lazy load ConfirmModal to avoid adding framer-motion earlier than needed
const ConfirmModal = dynamic(() => import('../ui/ConfirmModal'))

interface SocialAccountLinkerProps {
  provider: 'github' | 'google' | 'chatgpt' | 'metamask'
  /** Compact renders just icon + status */
  compact?: boolean
}

export default function SocialAccountLinker({ provider, compact = false }: SocialAccountLinkerProps) {
  const supabase = createClient()
  const [linked, setLinked] = useState<boolean | null>(null) // null = loading
  const [identityId, setIdentityId] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Fetch current identities once
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser()
      const identities = data.user?.identities || []
      const match = identities.find((i: any) => i.provider === provider)
      setLinked(Boolean(match))
      setIdentityId(match?.id ?? null)
    })()
  }, [provider, supabase])

  // Refresh identities when auth session changes (e.g., after linking)
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, _session) => {
      supabase.auth.getUser().then(({ data }) => {
        const identities = data.user?.identities || []
        const match = identities.find((i: any) => i.provider === provider)
        setLinked(Boolean(match))
        setIdentityId(match?.id ?? null)
      })
    })
    return () => sub.subscription.unsubscribe()
  }, [provider, supabase])

  const handleLink = async () => {
    setLoading(true)
    try {
      const authAny = supabase.auth as any
      const redirectTo = `${window.location.origin}/tps/supabase/callback?next=${encodeURIComponent(window.location.pathname)}`
      // Build OAuth options; include offline/consent for Google to get refresh tokens
      const oauthOptions: any = { redirectTo };
      if (provider === 'google') {
        oauthOptions.queryParams = { access_type: 'offline', prompt: 'consent' };
      }
      if (typeof authAny.linkWithOAuth === 'function') {
        await authAny.linkWithOAuth({ provider, options: oauthOptions })
      } else {
        await supabase.auth.signInWithOAuth({ provider, options: oauthOptions })
      }
      // UI will refresh after callback; optimistically mark as linked
      setLinked(true)
    } catch (err: any) {
      toast.error(err?.message || 'Unable to link account')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlink = async () => {
    if (!identityId) return
    setLoading(true)
    try {
      const authAny = supabase.auth as any
      if (typeof authAny.unlinkIdentity === 'function') {
        await authAny.unlinkIdentity(identityId)
      } else {
        // Fallback: call REST endpoint directly
        await fetch('/api/auth/unlink', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identityId }),
        })
      }
      toast('Account disconnected')
      setLinked(false)
      setIdentityId(null)
    } catch (err: any) {
      toast.error(err?.message || 'Failed to disconnect')
    } finally {
      setLoading(false)
    }
  }
  const openConfirm = () => setShowConfirm(true)
  const closeConfirm = () => setShowConfirm(false)

  const icons = {
    github: <FaGithub className="h-5 w-5" />,
    google: <FcGoogle className="h-5 w-5" />,
    chatgpt: <ChatGPTIcon className="h-5 w-5" />,
    metamask: <MetamaskIcon className="h-5 w-5" />,
  }

  const statusBadge = linked ? (
    <span className="text-green-500 text-xs">Connected</span>
  ) : (
    <span className="text-muted-foreground text-xs">Not connected</span>
  )

  if (linked === null) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icons[provider]}
        Checking…
      </div>
    )
  }

  const confirmModal = (
    <ConfirmModal
      open={showConfirm}
      onCancel={closeConfirm}
      onConfirm={() => {
        closeConfirm()
        handleUnlink()
      }}
      title={`Disconnect ${
        provider === 'github'
          ? 'GitHub'
          : provider === 'google'
          ? 'Google'
          : provider === 'chatgpt'
          ? 'ChatGPT'
          : 'MetaMask'
      }?`}
      description="You’ll no longer be able to sign in with this provider until you connect it again."
      confirmLabel="Disconnect"
      variant="danger"
    />
  )

  if (compact) {
    return (
      <>
        <div className="flex items-center gap-2">
          {icons[provider]}
          {statusBadge}
          {linked ? (
            <button
              type="button"
              onClick={openConfirm}
              className="text-xs text-destructive hover:underline"
            >
              Disconnect
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLink}
              disabled={loading}
              className="text-xs text-primary hover:underline disabled:opacity-50"
            >
              {loading ? '…' : 'Connect'}
            </button>
          )}
        </div>
        {confirmModal}
      </>
    )
  }

  return (
    <>
    <div className="setting-item">
      <span className="setting-label capitalize">{provider}</span>
      <div className="flex items-center gap-2">
        {linked ? (
          <button
            type="button"
            onClick={openConfirm}
            disabled={loading}
            className="rounded-md border px-3 py-1 text-sm hover:bg-destructive/10 text-destructive disabled:opacity-50"
          >
            {loading ? 'Removing…' : 'Disconnect'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleLink}
            disabled={loading}
            className="rounded-md border px-3 py-1 text-sm hover:bg-secondary disabled:opacity-50"
          >
            {loading ? 'Connecting…' : 'Connect'}
          </button>
        )}
      </div>
    </div>
    {confirmModal}
    </>
  )
}
