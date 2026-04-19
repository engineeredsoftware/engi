
import { useState, useEffect, useMemo } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import MarketingButtonShimmer from '@/components/base/engi/effects/button-shimmer';
import MarketingTextShimmer from './MarketingTextShimmer'
import { ChevronRight } from 'lucide-react'
import { createClient } from '@bitcode/supabase/ssr/client'
import Steps from './MarketingSteps'

export default function MarketingHero() {
  // Supabase client and user state for authentication CTA
  const supabase = useMemo(() => createClient(), [])
  const [user, setUser] = useState<import('@supabase/supabase-js').User | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [supabase])
  const text = user ? 'Subscribe' : 'Use'

  return (
    <div className="mx-auto w-full max-w-5xl px-4 tablet:px-6 laptop:px-8 desktop:px-12">
      <div className="mb-6 tablet:mb-8 tablet:flex tablet:justify-center">
        <div className="relative px-3 py-1 text-sm leading-6">
          <MarketingTextShimmer className='mx-auto text-center w-fit' >
            <span className="[filter:drop-shadow(0_0_3px_rgba(101,254,183,0.33))_drop-shadow(0_0_9px_rgba(101,254,183,0.33))]" style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🐉</span> Watch the demo video!{' '}
          </MarketingTextShimmer>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-4xl phone:text-5xl tablet:text-6xl laptop:text-7xl font-bold tracking-tighter ">
          Accelerate your Engineering Productivity with AI
        </h1>
        <p className="mt-8 text-base phone:text-lg tablet:text-xl max-w-72 phone:max-w-80 tablet:max-w-3xl inline-block leading-6 phone:leading-7 tablet:leading-8 text-gray-600 dark:text-gray-200 font-light">
          State-of-the-Art technical AIs that integrate seamlessly into your workflow and excel at <span className='font-medium'>producing and analyzing</span> code, documentation, and designs
        </p>
        <div className="mt-10 desktop:mt-12 flex flex-col items-center w-full">
          <MarketingButtonShimmer large={true} className="relative w-fit border-green-primary pr-4" innerClassName='flex items-center'>
            {/* Overlay button to open authentication orbital */}
            <button
              onClick={() => document.dispatchEvent(new Event('open-auxillaries'))}
              onMouseEnter={() => {
                // Prefetch Orbital on hover
                import('@/app/auxillaries/components/AuxillariesProvider').then(mod => (mod as any).prefetchAuxillaries?.());
              }}
              className="inset-0 z-10 absolute text-transparent"
            >{text}</button>
            <span className='flex items-center'>
              {text}
              <ChevronRight className="ml-1.5 size-7 transition-all duration-300 ease-out group-hover:translate-x-1" />
            </span>
          </MarketingButtonShimmer>
        </div>
      </div>
    </div>
  )
}
