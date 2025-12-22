import React from 'react'
import { Pagination as VPagination } from 'ventileco-ui'
import { cn } from '@utils/cn'

type PaginationProps = React.ComponentProps<typeof VPagination>

export default function Pagination({
  page,
  totalItemCount,
  listItemCount,
  numberingCount,
  onNavigate,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItemCount / listItemCount)

  const isFirstPage = page === 1

  const isLastPage = page === totalPages

  return (
    <VPagination
      page={page}
      totalItemCount={totalItemCount}
      listItemCount={listItemCount}
      numberingCount={numberingCount}
      onNavigate={onNavigate}
      className="flex items-center gap-2"
    >
      <VPagination.PrevButton>
        <span
          className={cn(
            'flex size-9 items-center justify-center rounded-full',
            'border border-slate-200 bg-white text-slate-600',
            'transition-all duration-200',
            isFirstPage
              ? 'cursor-not-allowed opacity-40'
              : 'hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 active:scale-95',
          )}
        >
          ‹
        </span>
      </VPagination.PrevButton>

      <VPagination.PrevBoundary
        prevBoundary={2}
        className={cn(
          'flex size-9 items-center justify-center rounded-full',
          'text-slate-500 transition-colors duration-200',
          'hover:text-cyan-600',
        )}
      />

      <VPagination.Numbering>
        {({ active, numbering }) => (
          <span
            className={cn(
              'flex size-9 items-center justify-center rounded-full',
              'font-medium transition-all duration-200',
              active
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-white text-slate-600 hover:bg-cyan-50 hover:text-cyan-600',
            )}
          >
            {numbering}
          </span>
        )}
      </VPagination.Numbering>

      <VPagination.NextBoundary
        nextBoundary={2}
        className={cn(
          'flex size-9 items-center justify-center rounded-full',
          'text-slate-500 transition-colors duration-200',
          'hover:text-cyan-600',
        )}
      />

      <VPagination.NextButton>
        <span
          className={cn(
            'flex size-9 items-center justify-center rounded-full',
            'border border-slate-200 bg-white text-slate-600',
            'transition-all duration-200',
            isLastPage
              ? 'cursor-not-allowed opacity-40'
              : 'hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 active:scale-95',
          )}
        >
          ›
        </span>
      </VPagination.NextButton>
    </VPagination>
  )
}
