module Devise
  class ApiFailureApp < Devise::FailureApp
    def http_auth_body
      {
        message: i18n_message
      }.to_json
    end

    def respond
      http_auth
    end
  end
end
