from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
import re

class NumberSpecialCharValidator:

    def validate(self, password, user=None):
        string_check= re.compile('[@_!#$%^&*()<>?/\|}{~:]')

        if not any(map(str.isdigit, password)) or not string_check.search(password):
            raise ValidationError(
                _("This password must contain number and special characters."),
                code='password_is_not_secure',
            )

    def get_help_text(self):
        return _(
            "Your password must contain number and special characters."
        )

class UpperCaseValidator:
    def validate(self, password, user=None):
        
        if password.islower():
            raise ValidationError(
                _("This password must contain at least one uppercase character. "),
                code='password_need_upper_case_character'
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least one uppercase character."
        )