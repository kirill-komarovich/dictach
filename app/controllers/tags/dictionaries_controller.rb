# frozen_string_literal: true

module Tags
  class DictionariesController < ApplicationController
    load_and_authorize_resource :tag
    load_and_authorize_resource :dictionary, through: :tag

    def index; end

    def create
      Dictionary.transaction do
        if @dictionary.save
          @dictionary.tags << @tag
          render :create, status: :created
        else
          render 'shared/errors', locals: { model: @dictionary }, status: :unprocessable_entity
        end
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
end
