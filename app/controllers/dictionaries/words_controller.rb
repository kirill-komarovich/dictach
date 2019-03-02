# frozen_string_literal: true

module Dictionaries
  class WordsController < ApplicationController
    load_and_authorize_resource :dictionary
    load_and_authorize_resource :word, through: :dictionary

    before_action :validate_letter_param, only: :index, if: :by_letter?

    def index
      @words = @words.starts_with(by_letter_param) if by_letter?
      @words = @words.order(:title)
    end

    def create
      if @word.save
        render :create, status: :created
      else
        render 'shared/errors', locals: { model: @word }, status: :unprocessable_entity
      end
    end

    def show; end

    def update
      if @word.update(word_params)
        render :update, status: :ok
      else
        render 'shared/errors', locals: { model: @word }, status: :unprocessable_entity
      end
    end

    def destroy
      @word.destroy
      render json: @word, status: :ok
    end

    private

    def word_params
      params.require(:word).permit(:title, :dictionary_id)
    end

    def by_letter_param
      params.permit(:letter)[:letter]
    end

    def by_letter?
      by_letter_param.present?
    end

    def validate_letter_param
      return if by_letter_param.length == 1

      render json: {
        errors: [
          I18n.t('controllers.words.params.letter.error')
        ]
      }, status: :bad_request
    end
  end
end
