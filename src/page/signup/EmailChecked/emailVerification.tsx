import { Button } from 'antd';
import { useRecoilValue } from 'recoil';
import { IsLoadingAtom } from '@/recoil/EmailRecoil';
import { EmailVerificationProps } from './email';

export default function EmailVerification({
  handleVerificationEmail,
}: EmailVerificationProps) {
  const isLoading = useRecoilValue(IsLoadingAtom);

  return (
    <>
      {/* 인증 번호 전송 버튼 */}
      <Button
        type="primary"
        onClick={handleVerificationEmail}
        disabled={isLoading}
        loading={isLoading}
      >
        인증번호 전송
      </Button>
    </>
  );
}
