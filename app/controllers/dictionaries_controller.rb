# frozen_string_literal: true

class DictionariesController < ApplicationController
  load_and_authorize_resource :dictionary

  def index; end

  def create
    @dictionary.user = current_user
    if @dictionary.save
      render :create, status: :created
    else
      render 'shared/errors', locals: { model: @dictionary }, status: :unprocessable_entity
    end
  end

  def show; end

  def update
    if @dictionary.update(dictionary_params)
      render :update, status: :ok
    else
      render 'shared/errors', locals: { model: @dictionary }, status: :unprocessable_entity
    end
  end

  def destroy
    @dictionary.destroy
    render json: @dictionary, status: :ok
  end

  private

  def dictionary_params
    params.require(:dictionary).permit(:title, :language)
  end
end
