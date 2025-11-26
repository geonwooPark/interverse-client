import Button from '@components/Button'
import ModalBody from '@components/Modal/ModalBody'
import ModalDim from '@components/Modal/ModalDim'
import ModalTitle from '@components/Modal/ModalTitle'
import ModalContainer from '@components/Modal/ModalContainer'

interface PrivacyModalProps {
  hasDim?: boolean
  onClose: () => void
}

export default function PrivacyModal({
  hasDim = true,
  onClose,
}: PrivacyModalProps) {
  return (
    <div className="fixed inset-0 z-overlay flex h-screen w-screen items-center justify-center">
      {/* Dim */}
      {hasDim && <ModalDim onClose={onClose} />}

      {/* Modal */}
      <ModalContainer className="flex h-screen w-full flex-col overflow-hidden rounded-none tablet:h-fit tablet:max-h-[80vh] tablet:w-[600px] tablet:max-w-[600px] tablet:rounded-md">
        <ModalTitle title="개인정보처리방침" onClose={onClose} />

        <ModalBody>
          {`제1조 (개인정보의 처리목적)
INTERVERSE(이하 "회사"라 함)는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

1. 회원 가입 및 관리
   - 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리
   - 서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적

2. 재화 또는 서비스 제공
   - 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증

제2조 (개인정보의 처리 및 보유기간)
1. 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
   - 회원 가입 및 관리: 회원 탈퇴 시까지 (단, 관련 법령에 따라 일정 기간 보관)

제3조 (처리하는 개인정보의 항목)
회사는 다음의 개인정보 항목을 처리하고 있습니다:
1. 회원 가입 및 관리
   - 필수항목: 이메일, 비밀번호, 닉네임
   - 선택항목: 프로필 사진

제4조 (개인정보의 제3자 제공)
회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

제5조 (개인정보처리의 위탁)
회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

제6조 (정보주체의 권리·의무 및 그 행사방법)
1. 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
   - 개인정보 처리정지 요구
   - 개인정보 열람요구
   - 개인정보 정정·삭제요구
   - 개인정보 처리정지 요구

제7조 (개인정보의 파기)
회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.

제8조 (개인정보 보호책임자)
회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.`}
        </ModalBody>

        <div className="flex items-center justify-end border-t border-gray-200 p-4">
          <Button size="md" variant="contained" onClick={onClose}>
            확인
          </Button>
        </div>
      </ModalContainer>
    </div>
  )
}
