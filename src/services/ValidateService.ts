import ValidateException from '../exceptions/ValidateException';
import ValidateUtil from '../utils/ValidateUtil';
import { ErrorCode } from '../consts/ErrorCode';

export class ValidateService {
  // eslint-disable-next-line
  private data: any;
  private field: string;
  private replyField: string;

  // eslint-disable-next-line
  constructor(data?: any, field?: string, replyField?: string) {
    this.data = data;
    this.field = field;
    this.replyField = replyField ? replyField : field;
  }

  // eslint-disable-next-line
  private getValue(data: any, field: string): any {
    if (!data) return null;
    if (typeof data === 'object') return data[field];
    return data;
  }

  // eslint-disable-next-line
  public init(data: any, field: string, replyField?: string): ValidateService {
    this.data = data;
    this.field = field;
    this.replyField = replyField ? replyField : field;
    return this;
  }

  public isNotEmpty(): ValidateService {
    // eslint-disable-next-line
    const value: any = this.getValue(this.data, this.field);
    if (ValidateUtil.isEmpty(value)) throw new ValidateException(ErrorCode.ERROR_INPUT, ValidateUtil.createResData(this.replyField, 'not_empty'));

    return this;
  }

  public isEmail(): ValidateService {
    const value: string = this.getValue(this.data, this.field);
    if (ValidateUtil.isEmail(value) === false)
      throw new ValidateException(ErrorCode.INVALID_DATA, ValidateUtil.createResData(this.replyField, 'is_email'));

    return this;
  }

  public minLength(minLength: number, trim?: boolean): ValidateService {
    const value: string = this.getValue(this.data, this.field);
    if (ValidateUtil.minLength(value, minLength, trim) === false)
      throw new ValidateException(ErrorCode.INVALID_DATA, ValidateUtil.createResData(this.replyField, 'min_length'));

    return this;
  }

  public maxLength(maxLength: number, trim?: boolean): ValidateService {
    const value: string = this.getValue(this.data, this.field);
    if (ValidateUtil.maxLength(value, maxLength, trim) === false)
      throw new ValidateException(ErrorCode.INVALID_DATA, ValidateUtil.createResData(this.replyField, 'max_length'));

    return this;
  }

  public minMaxLength(minLength: number, maxLength: number, trim?: boolean): ValidateService {
    const value: string = this.getValue(this.data, this.field);
    if (ValidateUtil.minMaxLength(value, minLength, maxLength, trim) === false)
      throw new ValidateException(ErrorCode.INVALID_DATA, ValidateUtil.createResData(this.replyField, 'min_max_length'));

    return this;
  }

  public isExist(isNotValid: boolean, customField?: string): ValidateService {
    if (isNotValid)
      throw new ValidateException(ErrorCode.INVALID_DATA, ValidateUtil.createResData(customField ? customField : this.replyField, 'exist'));
    return this;
  }

  public custom(isNotValid: boolean, errorCode: ErrorCode, customField?: string): ValidateService {
    if (isNotValid) throw new ValidateException(errorCode, ValidateUtil.createResData(customField ? customField : this.replyField));
    return this;
  }

  public minValue(min: number): ValidateService {
    const value: number = this.getValue(this.data, this.field);
    if (value === undefined || value === null) return this;
    if (ValidateUtil.minValue(value, min) === false)
      throw new ValidateException(ErrorCode.INVALID_DATA, ValidateUtil.createResData(this.replyField, 'min_value'));

    return this;
  }

  public maxValue(max: number): ValidateService {
    const value: number = this.getValue(this.data, this.field);
    if (value === undefined || value === null) return this;
    if (ValidateUtil.maxValue(value, max) === false)
      throw new ValidateException(ErrorCode.INVALID_DATA, ValidateUtil.createResData(this.replyField, 'max_value'));

    return this;
  }

  public minMaxValue(min: number, max: number): ValidateService {
    const value: number = this.getValue(this.data, this.field);
    if (value === undefined || value === null) return this;
    if (ValidateUtil.minMaxValue(value, min, max) === false)
      throw new ValidateException(ErrorCode.INVALID_DATA, ValidateUtil.createResData(this.replyField, 'min_max_value'));

    return this;
  }

  // eslint-disable-next-line
  public inList(list: any[]): ValidateService {
    // eslint-disable-next-line
    const value: any = this.getValue(this.data, this.field);
    if (value === undefined || value === null) return this;
    if (ValidateUtil.inList(value, list) === false)
      throw new ValidateException(ErrorCode.INVALID_DATA, ValidateUtil.createResData(this.replyField, 'in_list'));

    return this;
  }
}
