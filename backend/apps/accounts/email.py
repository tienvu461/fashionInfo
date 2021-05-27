from djoser import email


class ActivationEmail(email.ActivationEmail):
    template_name = 'templates/accounts/ActivationEmail.html'