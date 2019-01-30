class NamespacesController < ApplicationController
  helper_method :with_dictionaries?

  load_and_authorize_resource

  def index; end

  def create

  end

  def show; end

  def update

  end

  def destroy

  end

  private

  def with_dictionaries?
    params[:with_dictionaries] == '1'
  end
end
