# frozen_string_literal: true

class NamespacesController < ApplicationController
  helper_method :with_dictionaries?

  load_and_authorize_resource

  def index; end

  def create
    @namespace.user = current_user
    if @namespace.save
      render :create, status: :created
    else
      render 'shared/errors', locals: { model: @namespace }, status: :unprocessable_entity
    end
  end

  def show; end

  def update
    if @namespace.update(namespace_params)
      render :update, status: :ok
    else
      render 'shared/errors', locals: { model: @namespace }, status: :unprocessable_entity
    end
  end

  def destroy
    @namespace.destroy
    render json: @namespace, status: :ok
  end

  private

  def with_dictionaries?
    with_dictionaries_param == '1'
  end

  def with_dictionaries_param
    params.permit(:with_dictionaries)[:with_dictionaries]
  end

  def namespace_params
    params.require(:namespace).permit(:title, :user_id)
  end
end
