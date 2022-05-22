import styled from '@emotion/styled';
import {
  AsYouType,
  CountryCode,
  getCountryCallingCode,
  getExampleNumber,
  isValidPhoneNumber,
  format,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';
import React, { useMemo } from 'react';
import countryList from 'react-select-country-list';
import { apiIns } from 'src/config/apiClient';
import { useAppSelector } from 'src/reducers/model';
import { getFlag } from 'src/utils/flag';
import validation from 'src/utils/validation';
import { CustomFormItem, CustomInput, CustomOption, CustomSelect } from '.';
import { IoMdArrowDropdown } from 'react-icons/io';

const CustomPhoneNumberStyle = styled.section`
  .ant-select-selection-search-input {
    padding-left: 49px !important;
  }
  .ant-select-selection-item {
    .label {
      display: none;
    }
    .dropdown-icon {
      display: block;
    }
  }
`;

interface ValueLabel {
  value: string;
  label: string;
}

interface DropDownList extends ValueLabel {
  flagUrl: string;
  callingCode: string;
}

interface CustomPhoneNumberProps {
  hasFeedback: boolean;
  onBlur(): void;
  className?: string;
}

export const CustomPhoneNumber: React.FC<CustomPhoneNumberProps> = React.memo((props) => {
  const { hasFeedback, onBlur, className = '' } = props;
  const dropdowns: Array<DropDownList> = useMemo(() => {
    const oprions: Array<ValueLabel> = countryList().getData();
    return oprions.reduce((prev, current) => {
      const result = prev;
      try {
        const callingCode = getCountryCallingCode(current.value as CountryCode) as string;
        result.push({
          ...current,
          flagUrl: getFlag(current.value),
          callingCode: callingCode,
        });
      } catch (error) {
        // Do nothing
      }
      return result;
    }, [] as Array<DropDownList>);
  }, []);

  const myProfile = useAppSelector((state) => state.auth.myProfile);
  const isExistPhone = (phone: string) => {
    if (myProfile && myProfile.phone === phone) return false;
    return apiIns.user.existsPhone(phone);
  };
  return (
    <CustomPhoneNumberStyle className={`flex gap-x-14 flex-1 ${className}`}>
      <CustomFormItem name="country" hasFeedback={false} className="w-125">
        <CustomSelect
          dropdownMatchSelectWidth={false}
          showArrow={false}
          showSearch
          filterOption={(input, optionFilter) => {
            if (optionFilter) {
              const find = dropdowns.find((f) => f.value === optionFilter.value);
              if (
                find &&
                (('+' + find.callingCode).includes(input) ||
                  find.label.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
              ) {
                return true;
              }
            }
            return false;
          }}
        >
          {dropdowns.map((option) => (
            <CustomOption value={option.value} key={option.value}>
              <div className="flex gap-x-6 items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
                  <img src={option.flagUrl} className="object-cover h-full w-full" />
                </div>
                <div className="dropdown-icon hidden">
                  <IoMdArrowDropdown />
                </div>
                <span className="label">{option.label}</span>
                <span>+{option.callingCode}</span>
              </div>
            </CustomOption>
          ))}
        </CustomSelect>
      </CustomFormItem>
      <CustomFormItem noStyle shouldUpdate={(prev, next) => prev.country !== next.country}>
        {({ getFieldValue }) => {
          const country = getFieldValue('country') || 'US';
          const exp = getExampleNumber(country, examples);
          let mask = '';
          if (exp?.nationalNumber && typeof exp?.nationalNumber === 'string') {
            mask = new AsYouType(country).input(exp.nationalNumber);
            mask = mask.replace(/\d/g, 'X');
          }
          return (
            <CustomFormItem
              name="phone"
              className="flex-1"
              validateTrigger="onBlur"
              dependencies={['country']}
              hasFeedback={hasFeedback}
              rules={[
                {
                  required: true,
                  message: validation.phoneNumber.required,
                },
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (!value) return Promise.resolve();
                    const country = getFieldValue('country');
                    const foundCountry = dropdowns.find((f) => f.value === country);
                    const isValid = isValidPhoneNumber(value, {
                      defaultCountry: country,
                      defaultCallingCode: foundCountry?.callingCode || '1',
                    });
                    if (isValid) {
                      const phoneFormat = format(value, country as CountryCode, 'E.164');
                      const isExist = await isExistPhone(phoneFormat);
                      if (isExist) return Promise.reject(new Error(validation.phoneNumber.existing));
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(validation.phoneNumber.invalid));
                  },
                }),
              ]}
            >
              <CustomInput onBlur={onBlur} type="text" placeholder={mask} />
            </CustomFormItem>
          );
        }}
      </CustomFormItem>
    </CustomPhoneNumberStyle>
  );
});
