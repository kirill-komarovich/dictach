class NamespacesController < ApplicationController
  helper_method :with_dictionaries?

  load_and_authorize_resource

  def index
    byebug
  end

  private

  def with_dictionaries?
    params[:with_dictionaries] == '1'
  end
end
