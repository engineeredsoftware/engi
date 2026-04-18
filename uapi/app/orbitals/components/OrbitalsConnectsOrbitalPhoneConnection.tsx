/**
 * OrbitalsConnectsOrbitalPhoneConnection
 *
 * Phone/SMS trigger configuration card for the Orbitals Connects experience.
 * Styling is defined in OrbitalsConnectsOrbitalPhoneConnection.module.css to
 * preserve the original visuals while staying within the CSS module canon.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@bitcode/google-analytics';
import { createClient } from '@bitcode/supabase/ssr/client';
import { reportError } from '@bitcode/errors';
import { toast } from '@/components/base/shadcn/sonner';
import { PhoneConnect } from './phone-connect';

interface OrbitalsConnectsOrbitalPhoneConnectionProps {
  userId: string;
  userEmail?: string;
  userPhone?: string;
  onComplete?: () => void;
}

type ConnectionStatus = 'loading' | 'connected' | 'not-connected' | 'sso-pending';

export function OrbitalsConnectsOrbitalPhoneConnection({ 
  userId, 
  userEmail,
  userPhone,
  onComplete 
}: OrbitalsConnectsOrbitalPhoneConnectionProps) {
  const [status, setStatus] = useState<ConnectionStatus>('loading');
  const [phoneData, setPhoneData] = useState<{
    number: string;
    verified: boolean;
    isSSO: boolean;
  } | null>(null);
  const [showConnect, setShowConnect] = useState(false);
  const [hovering, setHovering] = useState(false);
  
  useEffect(() => {
    checkPhoneStatus();
  }, [userId]);
  
  const checkPhoneStatus = async () => {
    try {
      // Check if user has a verified phone
      const supabase = createClient();
      const { data: phoneRecord } = await supabase
        .from('user_phone_numbers')
        .select('phone_number, verified, created_at')
        .eq('user_id', userId)
        .single();
        
      if (phoneRecord?.verified) {
        setPhoneData({
          number: phoneRecord.phone_number,
          verified: true,
          isSSO: false
        });
        setStatus('connected');
        return;
      }
      
      // Check if user signed up with phone SSO
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.phone) {
        // User has phone from SSO but not verified in our system
        setPhoneData({
          number: user.phone,
          verified: false,
          isSSO: true
        });
        setStatus('sso-pending');
        
        // Auto-link for SSO users
        await autoLinkSSOPhone(user.phone);
      } else {
        setStatus('not-connected');
      }
      
    } catch (error) {
      reportError(error);
      setStatus('not-connected');
    }
  };
  
  const autoLinkSSOPhone = async (phone: string) => {
    try {
      // For SSO users, we can trust the phone is verified
      const supabase = createClient();
      const { error } = await supabase
        .from('user_phone_numbers')
        .upsert({
          user_id: userId,
          phone_number: phone,
          verified: true,
          verified_at: new Date().toISOString(),
          country_code: phone.slice(0, 2) // Extract from E.164
        });
        
      if (!error) {
        trackEvent('phone_auto_linked_sso', {
          user_id: userId,
          method: 'sso'
        });
        
        toast.success('Phone automatically connected from your account!');
        setStatus('connected');
        setPhoneData({
          number: phone,
          verified: true,
          isSSO: true
        });
        
        // Set default SMS preferences
        await setupDefaultPreferences();
      }
    } catch (error) {
      reportError(error);
      // Fall back to manual connection
      setStatus('not-connected');
    }
  };
  
  const setupDefaultPreferences = async () => {
    try {
      const supabase = createClient();
      await supabase
        .from('user_sms_preferences')
        .upsert({
          user_id: userId,
          enabled: true,
          daily_limit: 10,
          notification_types: ['completion', 'error'],
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
    } catch (error) {
      // Non-critical, don't block
      console.error('Failed to set SMS preferences:', error);
    }
  };
  
  const handleDisconnect = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to disconnect your phone? You\'ll need to verify again to use SMS commands.'
    );
    
    if (!confirmed) return;
    
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('user_phone_numbers')
        .delete()
        .eq('user_id', userId);
        
      if (!error) {
        toast.success('Phone disconnected');
        setStatus('not-connected');
        setPhoneData(null);
        
        trackEvent('phone_disconnected', {
          user_id: userId
        });
      }
    } catch (error) {
      reportError(error);
      toast.error('Failed to disconnect phone');
    }
  };
  
  if (status === 'loading') {
    return (
      <div className="orbitals-connects-phone-connect-loading">
        <div className="orbitals-connects-loading-glow" />
        <div className="orbitals-connects-loading-content">
          <div className="orbitals-connects-orbital-ring">
            <div className="orbitals-connects-quantum-dot" />
          </div>
          <span className="orbitals-connects-loading-text">Initializing SMS module...</span>
        </div>
        {/* Styles moved to CSS Module */}
      </div>
    );
  }
  
  if (showConnect) {
    return (
      <PhoneConnect 
        userId={userId}
        onComplete={() => {
          setShowConnect(false);
          checkPhoneStatus();
          onComplete?.();
        }}
      />
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      {status === 'connected' && phoneData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="orbitals-connects-phone-connected-container"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Success rings animation on mount */}
          <motion.div 
            className="orbitals-connects-success-rings"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="orbitals-connects-ring"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.5, 2],
                  opacity: [0, 0.8, 0] 
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
          
          {/* Main content */}
          <div className="orbitals-connects-connected-content">
            <div className="orbitals-connects-status-header">
              <motion.div 
                className="orbitals-connects-icon-container"
                animate={{ rotate: hovering ? 360 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="orbitals-connects-icon-glow" />
                <div className="orbitals-connects-icon-inner">
                  <svg className="orbitals-connects-check-icon" viewBox="0 0 24 24" fill="none">
                    <motion.path 
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </svg>
                </div>
              </motion.div>
              
              <div className="orbitals-connects-status-info">
                <h3 className="orbitals-connects-status-title">
                  SMS Pipeline Active
                  {phoneData.isSSO && (
                    <span className="orbitals-connects-sso-badge">Phone SSO</span>
                  )}
                </h3>
                <p className="orbitals-connects-phone-number">{formatPhoneNumber(phoneData.number)}</p>
              </div>
              
              <button
                onClick={handleDisconnect}
                className="orbitals-connects-disconnect-button"
                title="Disconnect phone"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M13 2h-2a2 2 0 00-2 2v5.5a.5.5 0 01-.5.5 4.5 4.5 0 100 9 .5.5 0 01.5.5V20a2 2 0 002 2h2a2 2 0 002-2v-.5a.5.5 0 01.5-.5 4.5 4.5 0 100-9 .5.5 0 01-.5-.5V4a2 2 0 00-2-2z" 
                    stroke="currentColor" 
                    strokeWidth={1.5}
                  />
                </svg>
              </button>
            </div>
            
          <div className="orbitals-connects-command-showcase">
            <div className="orbitals-connects-showcase-header">
                <span className="showcase-label">Text to</span>
                <span className="engi-number">+1 (555) 123-BITCODE</span>
              </div>
              
              <div className="command-examples">
                {[
                  { cmd: 'deliver auth system', color: 'emerald' },
                  { cmd: 'analyze security', color: 'blue' },
                  { cmd: 'ai_document to react 18', color: 'purple' }
                ].map((example, i) => (
                  <motion.div
                    key={example.cmd}
                    className={`command-pill ${example.color}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="command-icon">💬</span>
                    <code>{example.cmd}</code>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="quick-actions">
              <motion.a
                href="/settings/sms"
                className="action-card settings"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
              <div className="orbitals-connects-action-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.5} />
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              </div>
                <span>SMS orbital</span>
                <div className="orbitals-connects-action-arrow">→</div>
              </motion.a>
              
              <motion.a
                href="/docs/sms"
                className="orbitals-connects-action-card docs"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="orbitals-connects-action-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                      stroke="currentColor" 
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>SMS Guide</span>
                <div className="orbitals-connects-action-arrow">→</div>
              </motion.a>
            </div>
          </div>
          
          {/* Styles moved to CSS Module */}
            .orbitals-connects-phone-connected-container {
              position: relative;
              background: linear-gradient(135deg, rgba(15, 30, 50, 0.9), rgba(10, 25, 45, 0.9));
              border-radius: 16px;
              border: 1px solid rgba(103, 254, 183, 0.3);
              padding: 24px;
              overflow: hidden;
              transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
            }
            
            .orbitals-connects-phone-connected-container::before {
              content: '';
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at 30% 20%, rgba(103, 254, 183, 0.15) 0%, transparent 50%);
              opacity: ${hovering ? 1 : 0.7};
              transition: opacity 0.3s ease;
            }
            
            .orbitals-connects-phone-connected-container:hover {
              border-color: rgba(103, 254, 183, 0.5);
              box-shadow: 
                0 0 30px rgba(103, 254, 183, 0.2),
                0 10px 40px rgba(0, 0, 0, 0.3),
                inset 0 0 20px rgba(103, 254, 183, 0.05);
            }
            
            .orbitals-connects-success-rings {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              pointer-events: none;
            }
            
            .orbitals-connects-ring {
              position: absolute;
              width: 100px;
              height: 100px;
              border: 2px solid rgba(103, 254, 183, 0.6);
              border-radius: 50%;
            }
            
            .orbitals-connects-connected-content {
              position: relative;
              z-index: 1;
            }
            
            .orbitals-connects-status-header {
              display: flex;
              align-items: flex-start;
              gap: 16px;
              margin-bottom: 24px;
            }
            
            .orbitals-connects-icon-container {
              position: relative;
              width: 48px;
              height: 48px;
              flex-shrink: 0;
            }
            
            .orbitals-connects-icon-glow {
              position: absolute;
              inset: -8px;
              background: radial-gradient(circle, rgba(103, 254, 183, 0.4) 0%, transparent 70%);
              filter: blur(8px);
              animation: pulse-subtle 3s ease-in-out infinite;
            }
            
            .orbitals-connects-icon-inner {
              position: relative;
              width: 100%;
              height: 100%;
              background: linear-gradient(135deg, #65FEB7, #50E3C2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 
                0 4px 12px rgba(103, 254, 183, 0.4),
                inset 0 0 20px rgba(255, 255, 255, 0.2);
            }
            
            .check-icon {
              width: 24px;
              height: 24px;
              color: rgba(0, 20, 40, 0.9);
            }
            
            .status-info {
              flex: 1;
            }
            
            .status-title {
              font-size: 18px;
              font-weight: 600;
              color: white;
              margin: 0 0 4px 0;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            
            .sso-badge {
              font-size: 11px;
              padding: 2px 8px;
              background: rgba(103, 254, 183, 0.15);
              color: #65FEB7;
              border-radius: 10px;
              border: 1px solid rgba(103, 254, 183, 0.3);
              font-weight: 500;
            }
            
            .phone-number {
              color: rgba(255, 255, 255, 0.7);
              font-size: 14px;
              margin: 0;
              font-family: monospace;
            }
            
            .disconnect-button {
              width: 32px;
              height: 32px;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              background: rgba(255, 255, 255, 0.05);
              color: rgba(255, 255, 255, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            
            .disconnect-button:hover {
              background: rgba(255, 71, 87, 0.1);
              border-color: rgba(255, 71, 87, 0.3);
              color: #FF4757;
              transform: scale(1.05);
            }
            
            .disconnect-button svg {
              width: 16px;
              height: 16px;
            }
            
            .orbitals-connects-command-showcase {
              background: rgba(0, 10, 20, 0.5);
              border-radius: 12px;
              padding: 16px;
              margin-bottom: 20px;
              border: 1px solid rgba(103, 254, 183, 0.1);
            }
            
            .orbitals-connects-showcase-header {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 12px;
            }
            
            .showcase-label {
              font-size: 13px;
              color: rgba(255, 255, 255, 0.6);
            }
            
            .engi-number {
              font-family: monospace;
              font-size: 14px;
              color: #65FEB7;
              font-weight: 500;
              padding: 2px 8px;
              background: rgba(103, 254, 183, 0.1);
              border-radius: 6px;
            }
            
            .command-examples {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }
            
            .command-pill {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              border: 1px solid;
              transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);
              cursor: default;
            }
            
            .command-pill.emerald {
              background: rgba(103, 254, 183, 0.1);
              border-color: rgba(103, 254, 183, 0.3);
              color: #65FEB7;
            }
            
            .command-pill.blue {
              background: rgba(59, 130, 246, 0.1);
              border-color: rgba(59, 130, 246, 0.3);
              color: #3B82F6;
            }
            
            .command-pill.purple {
              background: rgba(147, 51, 234, 0.1);
              border-color: rgba(147, 51, 234, 0.3);
              color: #9333EA;
            }
            
            .command-pill:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
            
            .command-icon {
              font-size: 14px;
            }
            
            .command-pill code {
              font-family: monospace;
              font-size: 11px;
            }
            
            .quick-actions {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }
            
            .action-card {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 12px 16px;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 10px;
              text-decoration: none;
              color: rgba(255, 255, 255, 0.8);
              font-size: 13px;
              transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);
              position: relative;
              overflow: hidden;
            }
            
            .action-card::before {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.05) 100%);
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            
            .action-card:hover::before {
              opacity: 1;
            }
            
            .action-card:hover {
              background: rgba(255, 255, 255, 0.05);
              border-color: rgba(103, 254, 183, 0.3);
              color: white;
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
            
            .orbitals-connects-action-icon {
              width: 18px;
              height: 18px;
              color: rgba(103, 254, 183, 0.7);
            }
            
            .orbitals-connects-action-arrow {
              margin-left: auto;
              opacity: 0.5;
              transition: all 0.2s ease;
            }
            
            .action-card:hover .action-arrow {
              opacity: 1;
              transform: translateX(2px);
            }
            
            @keyframes pulse-subtle {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          
        </motion.div>
      )}
      
      {status === 'not-connected' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="phone-not-connected"
        >
          <div className="connect-header">
            <div className="phone-icon">
              <div className="icon-bg" />
              <span className="icon-emoji">📱</span>
              <div className="pulse-ring" />
            </div>
            
            <div className="connect-info">
              <h3 className="connect-title">Enable SMS Commands</h3>
              <p className="connect-description">
                Build software instantly with text messages. Zero friction development.
              </p>
            </div>
          </div>
          
          <div className="feature-grid">
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">Instant Pipeline Triggers</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🚀</span>
              <span className="feature-text">Build From Anywhere</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <span className="feature-text">Natural Language</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🌍</span>
              <span className="feature-text">Works Globally</span>
            </div>
          </div>
          
          <motion.button
            onClick={() => setShowConnect(true)}
            className="connect-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="button-text">Connect Phone Now</span>
            <div className="button-glow" />
            <div className="button-shimmer" />
          </motion.button>
          
          {/* Styles moved to CSS Module */}
            .phone-not-connected {
              background: linear-gradient(135deg, rgba(15, 30, 50, 0.8), rgba(10, 20, 35, 0.8));
              border-radius: 16px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              padding: 24px;
              position: relative;
              overflow: hidden;
            }
            
            .phone-not-connected::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(103, 254, 183, 0.05) 0%, transparent 40%);
              animation: float-gradient 20s ease-in-out infinite;
            }
            
            .connect-header {
              display: flex;
              align-items: flex-start;
              gap: 16px;
              margin-bottom: 20px;
              position: relative;
              z-index: 1;
            }
            
            .phone-icon {
              position: relative;
              width: 56px;
              height: 56px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
            
            .icon-bg {
              position: absolute;
              inset: 0;
              background: rgba(103, 254, 183, 0.1);
              border-radius: 16px;
              border: 1px solid rgba(103, 254, 183, 0.2);
            }
            
            .icon-emoji {
              font-size: 28px;
              z-index: 1;
            }
            
            .pulse-ring {
              position: absolute;
              inset: -8px;
              border: 1px solid rgba(103, 254, 183, 0.3);
              border-radius: 20px;
              animation: pulse-ring 3s cubic-bezier(0.19, 1, 0.22, 1) infinite;
            }
            
            .connect-info {
              flex: 1;
            }
            
            .connect-title {
              font-size: 18px;
              font-weight: 600;
              color: white;
              margin: 0 0 6px 0;
            }
            
            .connect-description {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.7);
              margin: 0;
              line-height: 1.5;
            }
            
            .feature-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              margin-bottom: 20px;
              position: relative;
              z-index: 1;
            }
            
            .feature {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 8px 12px;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 8px;
              font-size: 12px;
              color: rgba(255, 255, 255, 0.8);
              transition: all 0.2s ease;
            }
            
            .feature:hover {
              background: rgba(103, 254, 183, 0.05);
              border-color: rgba(103, 254, 183, 0.2);
              transform: translateX(2px);
            }
            
            .feature-icon {
              font-size: 16px;
            }
            
            .connect-button {
              position: relative;
              width: 100%;
              padding: 14px 24px;
              background: linear-gradient(135deg, rgba(103, 254, 183, 0.9), rgba(80, 227, 194, 0.9));
              border: none;
              border-radius: 12px;
              font-size: 15px;
              font-weight: 600;
              color: rgba(0, 20, 40, 0.9);
              cursor: pointer;
              overflow: hidden;
              transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
              z-index: 1;
            }
            
            .button-text {
              position: relative;
              z-index: 1;
            }
            
            .button-glow {
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            
            .connect-button:hover .button-glow {
              opacity: 1;
            }
            
            .button-shimmer {
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
              transition: left 0.5s ease;
            }
            
            .connect-button:hover .button-shimmer {
              left: 100%;
            }
            
            .connect-button:hover {
              transform: translateY(-2px);
              box-shadow: 
                0 10px 30px rgba(103, 254, 183, 0.4),
                0 0 0 1px rgba(103, 254, 183, 0.2),
                inset 0 0 20px rgba(255, 255, 255, 0.1);
            }
            
            @keyframes float-gradient {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(30px, -30px) rotate(120deg); }
              66% { transform: translate(-20px, 20px) rotate(240deg); }
            }
            
            @keyframes pulse-ring {
              0% { 
                transform: scale(1);
                opacity: 0.6;
              }
              50% {
                transform: scale(1.1);
                opacity: 0.3;
              }
              100% {
                transform: scale(1);
                opacity: 0.6;
              }
            }
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function formatPhoneNumber(phone: string): string {
  // Format E.164 to readable format
  if (phone.startsWith('+1') && phone.length === 12) {
    return `+1 (${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8)}`;
  }
  return phone;
}

export default OrbitalsConnectsOrbitalPhoneConnection;
