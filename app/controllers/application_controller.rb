# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  before_action :authenticate_user!

  respond_to :json

  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public', 'index.html').read }
    end
  end
end
