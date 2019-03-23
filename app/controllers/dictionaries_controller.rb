# frozen_string_literal: true

class DictionariesController < ApplicationController
  load_and_authorize_resource :dictionary
  helper_method :page_count, :records_count

  def index
    @dictionaries = @dictionaries.order(order_direction).page(page).per(per_page).includes(:tags)
  end

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

  def records_count
    @records_count ||= current_user.dictionaries.count
  end

  def page_count
    @page_count ||= (records_count / per_page.to_f).ceil
  end

  def per_page
    [params[:per_page].to_i, 5].max
  end

  def page
    [params[:page].to_i, 1].max && [params[:page].to_i, page_count].min
  end

  def order_direction
    property = Dictionary.column_names.include?(params[:order]) ? params[:order] : 'id'
    direction = %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
    { property => direction }
  end

  def dictionary_params
    params.require(:dictionary).permit(:title, :language)
  end
end
