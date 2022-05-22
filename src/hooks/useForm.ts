import { Params } from '@goldfishcode/kingmakerdata-api-sdk/libs/http/client';
import { FormInstance } from 'antd';
import { forEach } from 'lodash';
import { useState } from 'react';

export const useAppForm = <T>(form: FormInstance) => {
  const [fieldBlur, setFieldBlur] = useState<Params>({});

  const handleSubmit = async (callback: (data: T) => void) => {
    const fieldsValue = form.getFieldsValue();
    const keyTrigger: Array<string> = [];
    forEach(fieldsValue, (item, key) => {
      if (!item) {
        keyTrigger.push(key);
        setFieldBlur((e) => ({ ...e, [key]: true }));
      } else if (form.isFieldValidating(key) || !form.isFieldTouched(key)) {
        keyTrigger.push(key);
      }
    });
    try {
      await form.validateFields(keyTrigger);
      const fieldError = form.getFieldsError();
      const isFieldError = fieldError.find((f) => f.errors.length !== 0);
      if (isFieldError) {
        throw 'Field exists error';
      }
      const data = form.getFieldsValue();
      callback(data);
    } catch (error) {
      // Error when exist error fields
    }
  };

  const onBlurField = (fieldName: string) => {
    setFieldBlur((e) => ({ ...e, [fieldName]: true }));
  };

  const resetField = () => {
    setFieldBlur({});
    form.resetFields();
  };

  return {
    handleSubmit,
    onBlurField,
    resetField,
    fieldBlur,
  };
};
