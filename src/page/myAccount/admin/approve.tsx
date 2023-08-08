import {
  approveRejectPending,
  getVacationRequests,
} from '@/api/myAccount/admin';
import RequesTag from '@/components/RequesTag';
import { DUTY_ANNUAL, POSITIONS } from '@/data/constants';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { Badge, Button, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface VacationRequestType {
  key: number;
  id: number;
  userName: string;
  position: 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4';
  type: 'ANNUAL' | 'DUTY';
  startDate: string;
  endDate: string;
  state: 'PENDING' | 'APPROVE' | 'REJECT';
}

export default function Approve() {
  // antd message(화면 상단에 뜨는 메세지)기능
  const [messageApi, contextHolder] = message.useMessage();

  const [vacationRequests, setVacationRequests] = useState<
    VacationRequestType[]
  >([]);

  const [isvacationRequestsLoading, setIsvacationRequestsLoading] =
    useState(false);
  const [isAppoving, setIsApproving] = useState(false);

  const accessToken = useRecoilValue(AccessTokenAtom);

  useEffect(() => {
    setIsvacationRequestsLoading(true);
    const getData = async () => {
      if (!accessToken) {
        return;
      }
      try {
        const response = await getVacationRequests();
        if (response.status === 200) {
          const vacationRequestsData = response.data
            .response as VacationRequestType[];
          // 성공했을때
          setVacationRequests(
            vacationRequestsData.map((el) => {
              return { ...el, key: el.id };
            }),
          );
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(
          error.response.data.error.message ||
            '연가/당직 데이터를 불러오지 못했습니다.',
        );
      } finally {
        setIsvacationRequestsLoading(false);
      }
    };
    getData();
  }, [accessToken]);

  // 승인
  const handleRequest = async (
    id: number,
    type: 'APPROVE' | 'REJECT' | 'PENDING',
  ) => {
    setIsApproving(true);
    try {
      const response = await approveRejectPending(id, type);
      if (response.status === 200) {
        setVacationRequests(
          vacationRequests.map((request) =>
            request.id === id ? { ...request, state: type } : request,
          ),
        );
        console.log(response);
        messageApi.open({
          type: 'success',
          content: response.data.response, // 취소시에 왜 메세지 null임!!
        });
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: '요청 실패', //수정
      });
    } finally {
      setIsApproving(false);
    }
  };

  const columns: ColumnsType<VacationRequestType> = [
    {
      title: '사원',
      dataIndex: 'userName',
      key: 'userName',
      render: (_, { userName, position }) => (
        <>
          <Badge
            color={POSITIONS[position]?.color}
            count={position}
            style={{ marginRight: 5 }}
          />
          {userName}
        </>
      ),
    },

    {
      title: '연차/당직',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      render: (_, { type }) => <>{DUTY_ANNUAL[type].label}</>,
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      sorter: (a, b) =>
        Number(a.startDate.replaceAll('-', '')) -
        Number(b.startDate.replaceAll('-', '')),
    },

    {
      title: '종료일',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      sorter: (a, b) =>
        Number(a.endDate.replaceAll('-', '')) -
        Number(b.endDate.replaceAll('-', '')),
    },

    {
      title: '승인여부',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center',
      render: (_, { state }) => <RequesTag state={state} />,
      filters: [
        {
          text: '심사중',
          value: 'PENDING',
        },
        {
          text: '승인',
          value: 'RESOLVE',
        },
        {
          text: '거절',
          value: 'REJECT',
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.state.includes(value as string),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, { id, state }) => (
        <Space size="small">
          {state === 'PENDING' ? (
            <>
              <Button
                size="small"
                type="primary"
                onClick={() => handleRequest(id, 'APPROVE')}
                disabled={isAppoving}
              >
                승인
              </Button>
              <Button
                type="primary"
                size="small"
                danger
                disabled={isAppoving}
                onClick={() => handleRequest(id, 'REJECT')}
              >
                거절
              </Button>
            </>
          ) : (
            <Button
              size="small"
              disabled={isAppoving}
              danger
              onClick={() => handleRequest(id, 'PENDING')}
            >
              취소
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        size="small"
        columns={columns}
        dataSource={vacationRequests}
        loading={isvacationRequestsLoading}
      />
    </>
  );
}
