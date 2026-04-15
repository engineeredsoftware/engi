/**
 * SMS Phone Preview Component
 * Shows an interactive phone mockup demonstrating SMS commands
 */

import React from 'react';

export function SmsPhonePreview() {
  return (
    <div className="relative max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl border-8 border-gray-800">
        {/* Screen */}
        <div className="bg-gray-100 rounded-[2rem] overflow-hidden h-[600px] w-[300px]">
          {/* Status Bar */}
          <div className="bg-white px-6 py-2 flex justify-between items-center text-xs">
            <span className="font-medium">9:41 AM</span>
            <div className="flex gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1v0a1 1 0 110 2v0a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
              </svg>
            </div>
          </div>
          
          {/* Messages App Header */}
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex items-center">
              <span className="text-blue-500 text-sm">{"<"}</span>
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">BITCODE</p>
                    <p className="text-xs text-gray-500">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="bg-white p-4 space-y-3 h-[440px] overflow-y-auto">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-2xl px-4 py-2 max-w-[80%]">
                <p className="text-sm">deliver auth system with JWT</p>
              </div>
            </div>
            
            {/* Bitcode Response 1 */}
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-2xl px-4 py-2 max-w-[80%]">
                <p className="text-sm">✅ deliverable started!</p>
                <p className="text-sm">Run: a1b2c3d4</p>
                <p className="text-sm text-blue-500 underline">app.bitcode.ai/executions/a1b2c3d4</p>
              </div>
            </div>
            
            {/* Bitcode Response 2 */}
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-2xl px-4 py-2 max-w-[80%]">
                <p className="text-sm">✅ Complete!</p>
                <p className="text-sm">📁 5 files created</p>
                <p className="text-sm">📊 45 credits • 92% confidence</p>
                <p className="text-sm">⏱️ 32 seconds</p>
              </div>
            </div>
            
            {/* User Message 2 */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-2xl px-4 py-2 max-w-[80%]">
                <p className="text-sm">analyze security</p>
              </div>
            </div>
            
            {/* Bitcode Response 3 */}
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-2xl px-4 py-2 max-w-[80%]">
                <p className="text-sm">🔍 Analyzing security...</p>
                <p className="text-sm">Found 2 areas to review:</p>
                <p className="text-sm">• JWT expiration: Set to 24h</p>
                <p className="text-sm">• Add rate limiting</p>
                <p className="text-sm text-blue-500 underline">View full report →</p>
              </div>
            </div>
          </div>
          
          {/* Input Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t p-2">
            <div className="flex items-center gap-2">
              <button className="p-2">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className="flex-1 bg-white rounded-full px-4 py-2 border">
                <span className="text-gray-400 text-sm">Text Message</span>
              </div>
              <button className="p-2">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Phone Notch */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full"></div>
    </div>
  );
}
