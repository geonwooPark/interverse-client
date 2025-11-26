import Button from '@components/Button'
import ModalDim from '@components/Modal/ModalDim'
import ModalTitle from '@components/Modal/ModalTitle'

interface TermsModalProps {
  hasDim?: boolean
  onClose: () => void
}

export default function TermsModal({
  hasDim = true,
  onClose,
}: TermsModalProps) {
  return (
    <div className="fixed inset-0 z-overlay h-screen w-screen">
      {/* Dim */}
      {hasDim && <ModalDim onClose={onClose} />}

      {/* Modal */}
      <div className="absolute left-1/2 top-1/2 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden bg-white tablet:h-fit tablet:max-h-[80vh] tablet:w-[600px] tablet:max-w-[600px] tablet:rounded-md">
        <ModalTitle title="이용약관" onClose={onClose} />

        <div className="h-full overflow-y-auto p-6 tablet:max-h-[60vh]">
          <div className="whitespace-pre-line text-body2 leading-relaxed text-gray-700">
            {`제1조 (목적)
이 약관은 INTERVERSE(이하 "회사"라 함)가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "서비스"란 회사가 제공하는 모든 온라인 서비스를 의미합니다.
2. "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 의미합니다.
3. "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.

제3조 (약관의 게시와 개정)
1. 회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 서비스 초기 화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.

제4조 (이용계약의 체결)
1. 이용계약은 이용자가 약관의 내용에 동의를 하고 회사가 정한 소정의 절차에 따라 가입을 완료한 시점에 체결됩니다.

제5조 (서비스의 제공 및 변경)
1. 회사는 다음과 같은 서비스를 제공합니다:
   - 온라인 화상 회의 서비스
   - 가상 공간 제공 서비스
   - 기타 회사가 추가 개발하거나 제휴계약 등을 통해 제공하는 일체의 서비스

제6조 (서비스의 중단)
1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.

제7조 (회원의 의무)
1. 회원은 다음 행위를 하여서는 안 됩니다:
   - 신청 또는 변경 시 허위내용의 등록
   - 타인의 정보 도용
   - 회사가 게시한 정보의 변경
   - 회사가 정한 정보 이외의 정보 등의 송신 또는 게시
   - 회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해

제8조 (개인정보보호)
1. 회사는 이용자의 개인정보 보호를 위하여 노력합니다. 회사가 이용자의 개인정보를 보호하기 위하여 기울이는 노력이나 기타 상세한 사항은 개인정보처리방침에서 확인하실 수 있습니다.`}
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-gray-200 p-4">
          <Button size="md" variant="contained" onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}
