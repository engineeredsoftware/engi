"use client";

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import MetalPlate from '@/components/base/bitcode/metal-plate';
import { ScrollContainer } from '@/components/base/bitcode/panels/ScrollContainer';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });
const CodeBlock = dynamic(() => import('@/components/base/bitcode/media/syntax-highlighter'), { ssr: false });

type Shippable = {
  url?: string;
  number?: number;
  title?: string;
  description?: string;
};

export interface ShippablesCardsPanelProps {
  shippables: {
    pullRequest?: Shippable | null;
    pullRequestReviews?: Shippable[] | null;
    comments?: Shippable[] | null;
    issues?: Shippable[] | null;
  };
}

const childVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
} as const;

const scaledTextFadeVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1], staggerChildren: 0.08 },
  },
} as const;

export default function ShippablesCardsPanel({ shippables }: ShippablesCardsPanelProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const pr = shippables.pullRequest;
  const reviews = shippables.pullRequestReviews || [];
  const issues = shippables.issues || [];
  const comments = shippables.comments || [];

  const hasAny = !!(pr || reviews.length || issues.length || comments.length);
  if (!hasAny) return null;

  return (
    <motion.div
      variants={scaledTextFadeVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 gap-6"
      ref={sectionRef}
      onAnimationStart={() => scrollToSection(sectionRef)}
    >
      {pr && (
        <motion.div variants={childVariants} initial="initial" animate="animate">
          <MetalPlate
            headline="Pull Request"
            mainColor="#34d399"
            glowColor="#6ee7b7"
            intense
            icon={
              <svg className="w-5 h-5 text-emerald-300 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4 4 4m6 0v12m0 0 4-4m-4 4-4-4" />
              </svg>
            }
            linkUrl={pr.url}
            linkTitle="View Pull Request"
            className="flex flex-col"
          >
            <div className="mt-3 flex flex-col space-y-3 text-gray-200">
              {pr.title && <div className="text-lg font-semibold text-white/90">{pr.title}</div>}
              {pr.description && (
                <ScrollContainer className="text-gray-400 text-sm mt-2 max-h-[100px] pr-2 bg-black/20 p-3 rounded-md mb-3">
                  <ReactMarkdown
                    className="prose prose-invert max-w-none prose-base prose-headings:mb-3 prose-headings:mt-5 prose-headings:font-semibold prose-headings:text-emerald-300 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-purple-300 prose-a:no-underline hover:prose-a:text-purple-200 hover:prose-a:underline prose-blockquote:border-l-emerald-300/50 prose-blockquote:bg-black/20 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-md prose-pre:bg-black/30 prose-pre:p-3 prose-pre:rounded-md prose-pre:border prose-pre:border-purple-500/10 prose-code:text-emerald-200 prose-code:bg-black/40 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-emerald-500/20 prose-strong:text-white prose-strong:font-semibold prose-em:text-purple-200 prose-li:marker:text-emerald-400 prose-ol:pl-6 prose-ol:my-4 prose-ul:pl-6 prose-ul:my-4 prose-li:my-1 prose-table:border-collapse prose-table:w-full prose-thead:bg-black/30 prose-th:p-2 prose-th:text-emerald-300 prose-th:font-medium prose-td:p-2 prose-td:border-t prose-td:border-purple-500/10 prose-img:rounded-md prose-img:max-w-full prose-img:shadow-lg"
                    components={{
                      code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <CodeBlock language={match[1]} className={className} style={{ fontSize: '0.75rem' }}>
                            {children as string}
                          </CodeBlock>
                        ) : (
                          <code {...props} className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {pr.description}
                  </ReactMarkdown>
                </ScrollContainer>
              )}
            </div>
          </MetalPlate>
        </motion.div>
      )}

      {reviews.length > 0 && (
        <div className="flex flex-col space-y-2 max-h-[340px] pr-1">
          {reviews.map((review, idx) => (
            <motion.div key={`review-${idx}`} variants={childVariants} initial="initial" animate="animate">
              <MetalPlate
                headline={`PR Review #${review.number}`}
                icon={
                  <svg className="w-5 h-5 text-emerald-300 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                linkUrl={review.url}
                linkTitle="View Review"
                className="flex flex-col"
                mainColor="#34d399"
                glowColor="#6ee7b7"
              >
                <div className="mt-1 text-gray-200">
                  {review.title && <div className="text-sm font-medium text-white/90">{review.title}</div>}
                  {review.description && (
                    <ScrollContainer className="text-gray-400 text-xs mt-1 max-h-[60px] pr-2 bg-black/20 p-2 rounded-md flex-grow">
                      <ReactMarkdown
                        className="prose prose-invert max-w-none prose-sm"
                        components={{
                          code: ({ node, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                              <CodeBlock language={match[1]} className={className} style={{ fontSize: '0.7rem' }}>
                                {children as string}
                              </CodeBlock>
                            ) : (
                              <code {...props} className={className}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {review.description}
                      </ReactMarkdown>
                    </ScrollContainer>
                  )}
                </div>
              </MetalPlate>
            </motion.div>
          ))}
        </div>
      )}

      {issues.length > 0 && (
        <>
          {issues.map((issue, idx) => (
            <motion.div key={`issue-${idx}`} variants={childVariants} initial="initial" animate="animate">
              <MetalPlate
                headline={`Issue #${issue.number}`}
                icon={
                  <svg className="w-5 h-5 text-sky-300 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                linkUrl={issue.url}
                linkTitle="View Issue"
                className="flex flex-col"
                mainColor="#38bdf8" /* sky-400 */
                glowColor="#7dd3fc" /* sky-300 */
              >
                <div className="mt-1 text-gray-200 flex flex-col h-full">
                  {issue.title && <div className="text-sm font-medium text-white/90">{issue.title}</div>}
                  {issue.description && (
                    <ScrollContainer className="mt-1 max-h-[60px] pr-2 bg-black/20 p-2 rounded-md flex-grow">
                      <ReactMarkdown
                        className="prose prose-invert max-w-none prose-sm"
                        components={{
                          code: ({ node, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                              <CodeBlock language={match[1]} className={className} style={{ fontSize: '0.7rem' }}>
                                {children as string}
                              </CodeBlock>
                            ) : (
                              <code {...props} className={className}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {issue.description}
                      </ReactMarkdown>
                    </ScrollContainer>
                  )}
                  <div className="flex items-center justify-end space-x-2 mt-3">
                    <span className="text-xs px-2 py-1 bg-sky-500/5 text-sky-300/80 rounded-md border border-sky-500/10">
                      {issue.number && issue.number > 40 ? 'Enhancement' : 'Bug'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-sky-500/5 text-sky-300/80 rounded-md border border-sky-500/10">
                      {issue.number && issue.number % 2 === 0 ? 'Frontend' : 'Backend'}
                    </span>
                  </div>
                </div>
              </MetalPlate>
            </motion.div>
          ))}
        </>
      )}

      {comments.length > 0 && (
        <ScrollContainer className="flex flex-col space-y-2 max-h-[340px] pr-1">
          {comments.map((comment, idx) => {
            const issueMatch = comment.url?.match(/issues\/(\d+)/);
            const referencedIssue = issueMatch ? issueMatch[1] : null;
            return (
              <motion.div key={`comment-${idx}`} variants={childVariants} initial="initial" animate="animate">
                <MetalPlate
                  headline={`Comment on #${comment.number}`}
                  icon={
                    <svg className="w-5 h-5 text-yellow-300 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  }
                  linkUrl={comment.url}
                  linkTitle="View Comment"
                  className="flex flex-col h-full"
                  mainColor="#60a5fa" /* blue-400 */
                  glowColor="#fde047" /* yellow */
                >
                  <div className="mt-1 text-gray-200 flex flex-col h-full">
                    {referencedIssue && (
                      <div className="mb-1 text-xs font-medium text-sky-300/80 flex items-center space-x-1">
                        <svg className="w-3 h-3 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Issue #{referencedIssue}</span>
                      </div>
                    )}
                    {comment.title && <div className="text-sm font-medium text-white/90">{comment.title}</div>}
                    {comment.description && (
                      <ScrollContainer className="text-gray-400 text-xs mt-1 max-h-[120px] pr-2 bg-black/20 p-2 rounded-md flex-grow">
                        <ReactMarkdown
                          className="prose prose-invert max-w-none prose-sm"
                          components={{
                            code: ({ node, className, children, ...props }) => {
                              const match = /language-(\w+)/.exec(className || '');
                              return match ? (
                                <CodeBlock language={match[1]} className={className} style={{ fontSize: '0.7rem' }}>
                                  {children as string}
                                </CodeBlock>
                              ) : (
                                <code {...props} className={className}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {comment.description}
                        </ReactMarkdown>
                      </ScrollContainer>
                    )}
                  </div>
                </MetalPlate>
              </motion.div>
            );
          })}
        </ScrollContainer>
      )}
    </motion.div>
  );
}
