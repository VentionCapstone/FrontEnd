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

export enum Amenities {
  create_success = 'amenities.create_success',
  edit_success = 'amenities.edit_success',
  already_exists = 'amenities.already_exists',
  cannot_contain_comma = 'amenities.cannot_contain_comma',
  no_amenities_selected = 'amenities.no_amenities_selected',
}

export enum HomeUIInfo {
  user_home_btn_account = 'home_ui.user_home_btn.account',
  user_home_btn_mylistings = 'home_ui.user_home_btn.mylistings',
  user_home_btn_logout = 'home_ui.user_home_btn.logout',

  sign_in_sing_in_btn = 'home_ui.register.sign_in.sing_in_btn',
  sign_in_sing_title = 'home_ui.register.sign_in.sing_title',
  sign_in_title = 'home_ui.register.sign_in.title',
  sign_in_forgot_password = 'home_ui.register.sign_in.forgot_password',
  forgot_password_modal = 'home_ui.register.sign_in.forgot_password_modal',
  send_resend_link = 'home_ui.register.sign_in.send_resend_link',
  sign_in_forgot_password_desc = 'home_ui.register.sign_in.forgot_password_desc',
  sing_out_sing_up_btn = 'home_ui.register.sing_out.sing_up_btn',
  sing_out_sing_title = 'home_ui.register.sing_out.sing_title',
  sing_out_passport_placeholder = 'home_ui.register.sing_out.passport_placeholder',
  sing_out_desc = 'home_ui.register.sing_out.desc',
  sing_in_link = 'home_ui.register.sign_in.sing_in_link',
  sing_up_link = 'home_ui.register.sing_out.sing_up_link',

  filters_button_filter = 'home_ui.filters_button.filter',
  filters_button_price_price_range = 'home_ui.filters_button.price.price_range',
  filters_button_price_price_description = 'home_ui.filters_button.price.price_description',
  filters_button_price_price_min = 'home_ui.filters_button.price.min',
  filters_button_price_price_max = 'home_ui.filters_button.price.max',
  filters_button_rooms_any = 'home_ui.filters_button.rooms.any',
  filters_button_rooms_title = 'home_ui.filters_button.rooms.title',
  filters_button_people_any = 'home_ui.filters_button.people.any',
  filters_button_people_title = 'home_ui.filters_button.people.title',
  filters_button_sort_price = 'home_ui.filters_button.sort.price',
  filters_button_sort_title = 'home_ui.filters_button.sort.title',
  filters_button_sort_room = 'home_ui.filters_button.sort.room',
  filters_button_sort_price_title = 'home_ui.filters_button.sort.price-title',
  filters_button_sort_room_title = 'home_ui.filters_button.sort.room-title',
  filters_button_sort_people_title = 'home_ui.filters_button.sort.people-title',
  filters_button_sort_people = 'home_ui.filters_button.sort.people',
  filters_button_clear_btn = 'home_ui.filters_button.clear_btn',
  filters_button_filter_btn = 'home_ui.filters_button.filter_btn',
  card_night = 'home_ui.card.night',
  footer_info_terms = 'home_ui.footer_info.terms',
  footer_info_sitemap = 'home_ui.footer_info.sitemap',
  footer_info_privacy = 'home_ui.footer_info.privacy',
  footer_info_your_privacy_choices = 'home_ui.footer_info.your_privacy_choices',
  footer_info_copyright = 'home_ui.footer_info.copyright',
}

export enum AccountEditPageInfo {
  personal_info = 'account_edit_page.personal_info',
  personal_desc = 'account_edit_page.personal_desc',
  login_secure = 'account_edit_page.login_secure',
  login_secure_desc = 'account_edit_page.login_secure_desc',
  setting = 'account_edit_page.setting',
  setting_desc = 'account_edit_page.setting_desc',
  male = '',
  airbnb_your_place = 'account_edit_page.airbnb_your_place',
  airbnb_your_place_desc = 'account_edit_page.airbnb_your_place_desc',
}

export enum AccountEditPersonalInfo {
  name = 'account_edit_personal-info.name',
  legal_name = 'account_edit_personal-info.name.legal_name',
  legal_name_desc = 'account_edit_personal-info.name.legal_name_desc',
  edit_name = 'account_edit_personal-info.name.edit',
  save_name = 'account_edit_personal-info.name.save',
  first_name = 'account_edit_personal-info.name.first_name',
  last_name = 'account_edit_personal-info.name.last_name',

  gender = 'account_edit_personal-info.gender.gender',
  your_gender = 'account_edit_personal-info.gender.your_gender',
  male = 'account_edit_personal-info.gender.male',
  female = 'account_edit_personal-info.gender.female',
  edit_gender = 'account_edit_personal-info.gender.edit',
  save_gender = 'account_edit_personal-info.gender.save',
  select_gender = 'account_edit_personal-info.gender.select',

  location = 'account_edit_personal-info.location',
  where_do_live = 'account_edit_personal-info.location.where_do_live',
  edit_location = 'account_edit_personal-info.location.edit',
  save_location = 'account_edit_personal-info.location.save',
  select_country = 'account_edit_personal-info.location.select',
  uzbekistan = 'account_edit_personal-info.location.uzbekistan',
  kazakhstan = 'account_edit_personal-info.location.kazakhstan',
  russia = 'account_edit_personal-info.location.russian',
  country = 'account_edit_personal-info.location.country',

  number = 'account_edit_personal-info.number',
  phone_number = 'account_edit_personal-info.number.phone_number',
  phone_number_desc = 'account_edit_personal-info.number.phone_number_desc',
  edit_number = 'account_edit_personal-info.number.edit',
  save_number = 'account_edit_personal-info.number.save',

  about = 'account_edit_personal-info.about',
  about_title = 'account_edit_personal-info.about.about',
  about_desc = 'account_edit_personal-info.about.about_desc',
  about_textarea = 'account_edit_personal-info.about.about_textarea',
  edit_about = 'account_edit_personal-info.about.edit',
  save_about = 'account_edit_personal-info.about.save',
}

export enum LoginAndSecurityInfo {
  login_title = 'login_and_security.login_title',
  email_edit = 'login_and_security.email.edit',
  email = 'login_and_security.email.email',
  email_desc = 'login_and_security.email.email_desc',
  email_change_btn = 'login_and_security.email.change_btn',
  email_cancel = 'login_and_security.email.cancel',
  password_change_your_password = 'login_and_security.password.change_your_password',
  password_edit = 'login_and_security.password.edit',
  password_change_btn = 'login_and_security.password.change_btn',
  password_cancel = 'login_and_security.password.cancel',
  password_current = 'login_and_security.password.current',
  password_new_password = 'login_and_security.password.new_password',
  password_confirm = 'login_and_security.password.confirm',
  password_input = 'login_and_security.password.passport_placeholder',
}

export enum SettingsInfo {
  title = 'setting.title',
  theme = 'setting.theme',
  light = 'setting.light',
  dark = 'setting.dark',
  language = 'setting.language',
  uzbek = 'setting.uzbek',
  russian = 'setting.russian',
  english = 'setting.english',
  kazakh = 'setting.kazak',
  german = 'setting.german',
  currency = 'setting.currency',
  dollar = 'setting.dollar',
  lang_desc = 'setting.lang_desc',
  currency_desc = 'setting.currency_desc',
  can_dollar = 'setting.can_dollar',
}

export enum AminitiesList {
  title = 'aminities_list.title',
}

export enum ReviewList {
  title = 'review_list.title',
  show_all = 'review_list.show_all',
  reviews = 'review_list.reviews',
}

export enum BookingForms {
  error_message = 'booking_form.error_message',
  night = 'booking_form.night',
  you_will_not_charged_yet = 'booking_form.you_will_not_charged_yet',
  total = 'booking_form.total',
  login = 'booking_form.login',
  login_req = 'booking_form.login_required',
  reserve = 'booking_form.reserve',
  check_in = 'booking_form.check_in',
  check_out = 'booking_form.check_out',
}

export enum ForgotPasswordReset {
  title = 'forgot_password_reset.title',
  description = 'forgot_password_reset.description',
  password = 'forgot_password_reset.password',
  re_enter = 'forgot_password_reset.re_enter',
  update = 'forgot_password_reset.update',
}

export enum VerifyEmails {
  title = 'verify_email.title',
}

export enum CreateProfileForm {
  title = 'create_profile.title',
  legal_name = 'create_profile.legal_name',
  first_name = 'create_profile.first_name',
  last_name = 'create_profile.last_name',
  select_country = 'create_profile.select_country',
  uzbekistan = 'create_profile.uzbekistan',
  russian = 'create_profile.russian',
  kazakhstan = 'create_profile.kazakhstan',
  gender = 'create_profile.gender',
  male = 'create_profile.male',
  female = 'create_profile.female',
  phone_number = 'create_profile.phone_number',
  description = 'create_profile.description',
  description_desc = 'create_profile.description_desc',
  create_btn = 'create_profile.create_btn',
  country = 'create_profile.country',
}

export enum HostInfo {
  host_card_subtitle = 'host.profile.subtitle',
  host_card_reviews = 'host.profile.reviews',
  host_card_rating = 'host.profile.rating',
  host_card_listings = 'host.profile.listings',
  host_verified_title = 'host.verified.title',
  host_verified_identity = 'host.verified.identity',
  host_verified_email = 'host.verified.email',
  host_verified_phone = 'host.verified.phone',
  host_about_title = 'host.about.title',
  host_about_joined = 'host.about.joined',
  host_about_language = 'host.about.language',
  host_about_lives_in = 'host.about.lives_in',
  host_reviews_title = 'host.reviews.title',
  host_reviews_empty = 'host.reviews.empty',
  host_listings_title = 'host.listings.title',
  host_listings_empty = 'host.listings.empty',
}

export enum OwnerCardInfo {
  title = 'owner_card.title',
  joined = 'owner_card.joined_in',
}
