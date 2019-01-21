# frozen_string_literal: true

class AuthenticationChecksController < ApplicationController
  skip_before_action :authenticate_user!

  def index; end
end
