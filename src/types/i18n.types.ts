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

export enum HomeUIInfo {
  user_home_btn_account = 'home_ui.user_home_btn.account',
  user_home_btn_mylistings = 'home_ui.user_home_btn.mylistings',
  user_home_btn_logout = 'home_ui.user_home_btn.logout',

  sign_in_sing_in_btn = 'home_ui.register.sign_in.sing_in_btn',
  sign_in_sing_title = 'home_ui.register.sign_in.sing_title',
  sign_in_title = 'home_ui.register.sign_in.title',
  sign_in_forgot_password = 'home_ui.register.sign_in.forgot_password',
  sign_in_forgot_password_desc = 'home_ui.register.sign_in.forgot_password_desc',
  sing_out_sing_up_btn = 'home_ui.register.sing_out.sing_up_btn',
  sing_out_sing_title = 'home_ui.register.sing_out.sing_title',
  sing_out_desc = 'home_ui.register.sing_out.desc',

  filters_button_filter = 'home_ui.filters_button.filter',
  filters_button_price_price_range = 'home_ui.filters_button.price.price_range',
  filters_button_price_price_description = 'home_ui.filters_button.price.price_description',
  filters_button_rooms_any = 'home_ui.filters_button.rooms.any',
  filters_button_people_any = 'home_ui.filters_button.people.any',
  filters_button_sort_price = 'home_ui.filters_button.sort.price',
  filters_button_sort_room = 'home_ui.filters_button.sort.room',
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
  male = 'male',
}

export enum AccountEditPersonalInfo {
  name = 'account_edit_personal-info.name',
  legal_name = 'account_edit_personal-info.name.legal_name',
  legal_name_desc = 'account_edit_personal-info.name.legal_name_desc',
  edit_name = 'account_edit_personal-info.name.edit',
  save_name = 'account_edit_personal-info.name.save',
  first_name = 'account_edit_personal-info.name.first_name',
  last_name = 'account_edit_personal-info.name.last_name',

  gender = 'account_edit_personal-info.gender',
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
  kazak = 'setting.kazak',
  german = 'setting.german',
  currency = 'setting.currency',
  dollar = 'setting.dollar',
}
