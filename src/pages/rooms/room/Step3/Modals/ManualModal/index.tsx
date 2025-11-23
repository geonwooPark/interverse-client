import Image from '@components/Image'

interface ManualModalProps {
  hasDim?: boolean
}

function ManualModal({ hasDim = false }: ManualModalProps) {
  return (
    <div className="fixed inset-0 z-popover h-screen w-screen">
      {/* Dim */}
      {hasDim && <div className="size-full bg-black/30" />}

      {/* Modal */}
      <div className="absolute left-[50%] top-[50%] mx-auto flex w-[85%] max-w-[2000px] translate-x-[-50%] translate-y-[-50%] items-center justify-between ">
        <Image src="/images/manual.png" />
      </div>
    </div>
  )
}

export default ManualModal
