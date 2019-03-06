# frozen_string_literal: true

class StaticsController < ApplicationController
  def index
    respond_to do |format|
      format.html { render body: Rails.root.join('public', 'index.html').read }
    end
  end
end
