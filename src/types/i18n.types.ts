export enum ErrorTypes {
  default = 'errors.default',

  //accommodation
  accommodation_failed_to_get_single = 'errors.accommodation_failed_to_get_single',
  accommodation_failed_to_get_list = 'errors.accommodation_failed_to_get_list',

  //input
  field_is_required = 'errors.field_is_required',
  enter_valid_email = 'errors.enter_valid_email',
  enter_valid_phone_number = 'errors.enter_valid_phone_number',
  password_must_contain = 'errors.password_must_contain',
  password_invalid_length = 'errors.password_invalid_length',
  password_not_matching = 'errors.password_not_matching',
}
