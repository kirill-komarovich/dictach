# frozen_string_literal: true

class TagsController < ApplicationController
  load_and_authorize_resource

  def index; end

  def create
    @tag.user = current_user
    if @tag.save
      render :create, status: :created
    else
      render 'shared/errors', locals: { model: @tag }, status: :unprocessable_entity
    end
  end

  def update
    if @tag.update(tag_params)
      render :update, status: :ok
    else
      render 'shared/errors', locals: { model: @tag }, status: :unprocessable_entity
    end
  end

  def destroy
    @tag.destroy
    render json: @tag, status: :ok
  end

  private

  def tag_params
    params.require(:tag).permit(:title)
  end
end
