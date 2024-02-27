import { Form } from '@ant-design/compatible';
import { Alert, Button, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import { JsonEditor } from '@/components/JsonEditor';
import { SettingProvider } from '@/providers/setting';
import { safeJsonParse } from '@/utils/json';

export const UPYUNSetting = ({ setting }) => {
  const [upyun, setUpyun] = useState({});

  useEffect(() => {
    setUpyun(safeJsonParse(setting.upyun));
  }, [setting.oss]);

  const onChange = useCallback((value) => {
    setUpyun(value);
  }, []);

  const save = useCallback(() => {
    const data = {
      upyun: JSON.stringify(upyun),
    };
    SettingProvider.updateSetting(data).then(() => {
      message.success('保存成功');
    });
  }, [upyun]);

  return (
    <Form layout="vertical">
      <Alert
        message="说明"
        description={`请在编辑器中输入您的 又拍云 配置，\r\n {"bucketname":"bucketname","operator":"operator","password":"password"}`}
        type="info"
        showIcon={true}
        style={{ marginBottom: '1rem' }}
      />
      <JsonEditor
        value={upyun}
        onChange={onChange}
        style={{
          height: '400px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          marginBottom: 24,
        }}
      />
      <Button type="primary" onClick={save}>
        保存
      </Button>
    </Form>
  );
};
