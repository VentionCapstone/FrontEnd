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

  //profile
  profile_error_creating = 'errors.profile_error_creating',
}

export enum SearchTexts {
  input_date_label_checkin = 'searchTexts.input_date_label_checkin',
  input_date_label_checkout = 'searchTexts.input_date_label_checkout',
  input_location_label_default = 'searchTexts.input_location_label_default',
  input_location_label_anywhere = 'searchTexts.input_location_label_anywhere',
  search_button = 'searchTexts.search_button',
  input_location_no_options = 'searchTexts.input_location_no_options',
}

export enum PaymentInfo {
  title = 'payment.title',
  option_name = 'payment.option_name',
  option_type_card = 'payment.option_type.card',
  option_type_cash = 'payment.option_type.cash',
  dates = 'payment.dates',
  price_per_night = 'payment.price_per_night',
  total_price = 'payment.total_price',
  button_type_card = 'payment.button_type.card',
  button_type_cash = 'payment.button_type.cash',
}

export enum ProfileActions {
  profile_image_change = 'profileActions.profile_image_change',
  profile_create = 'profileActions.profile_create',
}
