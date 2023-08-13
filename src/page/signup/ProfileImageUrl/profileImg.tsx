import { Button, Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function ProfileImg() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Form.Item
        style={{ width: '50%' }}
        label="프로필"
        name="profileThumbUrl"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload beforeUpload={() => false}>
          <Button>
            <PlusOutlined /> Click to Upload
          </Button>
        </Upload>
      </Form.Item>
    </>
  );
}
