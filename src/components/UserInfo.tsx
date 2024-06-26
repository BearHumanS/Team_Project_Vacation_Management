import { Badge, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { POSITIONS } from '@/data/constants';
import { useRecoilValue } from 'recoil';
import { UserHeaderInfoAtom } from '@/recoil/UserHeaderInfoAtom';
import { useEffect, useRef } from 'react';

const { Text } = Typography;

export default function UserInfo(/* {
  userHeaderInfo,
}: {
  userHeaderInfo: {
    userName: string;
    profileThumbNail: string;
    position: string;
    usedVacation: string;
  };
} */) {
  const userHeaderInfo = useRecoilValue(UserHeaderInfoAtom);

  const renderCount = useRef(0);
  const startTime = useRef(0);

  renderCount.current += 1;

  useEffect(() => {
    if (startTime.current > 0) {
      const endTime = performance.now();
      console.log(
        `UserInfo recoil 렌더링 ${renderCount.current}회가 ${
          endTime - startTime.current
        } ms 걸림`,
      );
    }
    startTime.current = performance.now();
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Avatar src={userHeaderInfo.profileThumbNail} />
      <Link to="/myaccount">{userHeaderInfo.userName}</Link>
      <Badge
        count={userHeaderInfo.position}
        // antd에서 지정된 색들이 있음 몇개 가져와서 constants 직책별로 넣어둠
        color={POSITIONS[userHeaderInfo?.position]?.color}
      />
      <Text>
        남은연차{' '}
        {POSITIONS[userHeaderInfo?.position]?.total_vacation -
          Number(userHeaderInfo.usedVacation)}
        일
      </Text>
    </div>
  );
}
