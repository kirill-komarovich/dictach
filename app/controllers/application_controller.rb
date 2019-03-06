# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::Cookies

  before_action :authenticate_user!
  respond_to :json
end
