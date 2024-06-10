import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import MyHeader from '@/components/MyHeader';
import { useEffect, useRef } from 'react';

export default function MyLayout() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    console.log('useState 렌더링 횟수 측정 부모 컴포넌트', renderCount.current);
  }, []);
  return (
    <Layout>
      <MyHeader />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
